#include <SPI.h>
#include <MFRC522.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ESP32Servo.h>
#include <ESP32Tone.h>
#include <ESP32PWM.h>

#define SSpin   21  // pin SDA du RC522 -> 21
#define RSTpin  22   // pin RST du RC522 -> 22

//Initialisation du Timer
hw_timer_t * timer = NULL; 
volatile bool interruptbool1 = false;
int adc_read_counter = 0;
hw_timer_t * timerBegin(uint8_t , uint16_t divider, bool countUp);

String serverName = "http://51.210.151.13/btssnir/projets2022/fablab/api/";  //Adresse de l'API

MFRC522 rfid(SSpin, RSTpin); //Donner les pins 'SS' et 'RST' du capteur RFID
Servo monservo;

void setup()
{
  SPI.begin();      //Démarrage de la liaison série
  rfid.PCD_Init();  //Initialisation du capteur RFID

  //Placement du servo moteur à son emplacement initial
  monservo.attach(32);
  monservo.write(40);
  delay(1000);
  monservo.detach();
  
  wifi_connexion(); //Appel de la fonction de connexion wifi
  setTimer();       //Appel de la fonction d'activation du timer
}

void loop()
{
  cardPresent();  //Appel de la fonction de présence de carte

  checkTimer(15); //Appel de la fonction de vérification d'ouverture à distance (Android) avec une intervalle de 15 sec
}

//---------------/ Connexion au Wifi /---------------//
//  Permet de se connecter au wifi en indiquant le   //
//  nom du réseau et son mot de passe.               //

const char* ssid = "Eleves";            //Nom du réseau wifi
const char* password = "ml$@0931584S";  //Mot de passe   du réseau wifi

void wifi_connexion()
{
  //Connexion avec l'identifiant et le mdp
  WiFi.begin(ssid, password); //Commence la connection au wifi

  int x = 0;
  while (WiFi.status() != WL_CONNECTED) { //Tant que la connexion au wifi ne se fait pas
    light_led(1, 100); //Indication de connexion au wifi (LED Rouge)
    x++;
    if(x>50) //Si la connexion prend trop de temps
    {
      resetESP(); //Appel de la fonction de reset du wifi
    }
  }
}

//---------------/ Détecter et lire la carte /---------------//
//  Permet de détecter la présence d'un badge, de lire l'UID //
//  de la carte et d'appeler la fonction de requête.         //

void cardPresent()
{
  if (rfid.PICC_IsNewCardPresent())  // on a détecté un tag
  {
    if (rfid.PICC_ReadCardSerial())  // on a lu avec succès son contenu
    {
      light_led(1, 500); //Indication de lecture de la carte (LED Rouge)
      String uid = "";

      for (byte i = 0; i < rfid.uid.size; i++)
      {
        String str = String(rfid.uid.uidByte[i], HEX); //Récupère les bytes et les transforme en hexadécimal
        uid = uid + str;  //Ajoute la valeur à l'UID
      }

      //Transforme les lettres minuscule en lettre majuscule
      for (byte i = 0; i < uid.length(); i++)
      {
        if (uid[i] >= 'a' && uid[i] <= 'z')
        {
          uid[i] = uid[i] - 32;
        }
      }
      unlock_request("cadenas",uid); //Appel la requête d'ouverture du cadenas
      delay(1000);
    }
  }
}

//---------------/ Requête pour déverouiller /---------------//
// Prend en paramêtre le type de requête (android/cadenas)   //
// et un UID de carte (cadenas). Appel de la fonction pour   //
// effectuer la requête et traite la réponse en JSON pour    //
// activer le cadenas avec l'appel de la fonction d'acti-    //
// -vation du moteur.                                        //

void unlock_request(String type, String uid)
{
  StaticJsonBuffer<600> JSONBuffer;
  String request = "";
  if(type == "android") //Si c'est une requête pour l'ouverture Android
  {
       request = serverName +"cadenas/ouvrir.php?type=read&idCadenas=" + getStringMacAddress(); //Application des paramêtres pour la requête
  }
  else if(type == "cadenas") //Si c'est une requête pour l'ouverture depuis un badge
  {
        request = serverName +"cadenas/ouvrir.php?type=cadenas&idCadenas=" + getStringMacAddress() + "&idCarte=" + uid; //Application des paramêtres pour la requête
  }

  JsonObject& parsed = makeRequest(request);  //Rentre les données dans l'URL de requête de l'API);
  String idCadenas = parsed["idCadenas"];     //Récupère la clé "idCadenas"
  bool succes = parsed["succes"];             //Récupère la clé "action"
  parsed.printTo(Serial);

  if (idCadenas == getStringMacAddress()) //Si la réponse est celle pour le cadenas
  {
    if (succes == true) //Si la réponse d'ouverture est positive
    {
      pinMode(3,OUTPUT);
      digitalWrite(3, HIGH); //Allume la LED vert durant l'activation du moteur
      setMotor(); //Appel de la fonction de l'activation du moteur
      digitalWrite(3, LOW);
    }
    else if(succes == false) //Si la réponse d'ouverture est négative
    {
      pinMode(1,OUTPUT);
      digitalWrite(1, HIGH);  //Allume la LED rouge pour montrer le refus de la requête
      delay(2000);
      digitalWrite(1, LOW);
    }
  }
}


//---------------/ Faire la requête /---------------//
// Permet de faire la requête donné en paramêtre    //
// via une requête HTTP et renvoi le JSON récuperer.//

JsonObject& makeRequest(String serverPath)
{
  StaticJsonBuffer<600> JSONBuffer;

  if (WiFi.status() == WL_CONNECTED) // Vérifie si connecté au wifi
  {
    HTTPClient http;
    http.begin(serverPath.c_str());
    
    int httpResponseCode = http.GET(); // Envoi la requete HTTP au serveur
    if (httpResponseCode > 0) //Si il y a une réponse
    {
      String payload = http.getString(); //recupère les données de réponse de l'API
      JsonObject& json = JSONBuffer.parseObject(payload); //Met les données de réponse en JSON
      http.end();
      return json; //Renvoie le JSON
    }
  }
  resetESP(); //Si il n'est pas connecter au réseau, appel de la fonction de reset
}

//---------------/ MAC Address /---------------//
// Permet de renvoyer l'adresse MAC en y       //
// enlevant les ':'.                           //

String getStringMacAddress()
{
  String idmacAddress = WiFi.macAddress(); //Récupère l'adresse MAC de l'ESP
  //Enlève les ':' de l'adresse MAC
  idmacAddress.remove(2, 1);
  idmacAddress.remove(4, 1);
  idmacAddress.remove(6, 1);
  idmacAddress.remove(8, 1);
  idmacAddress.remove(10, 1);

  return idmacAddress; //Renvoi l'adresse MAC sans les ':'
}

//---------------/ Blink Led /---------------//
// Permet de faire clignoter une led donnée  //
// pendant un temps donné via les paramêtres.//

void light_led(int pin, int temps)
{
  pinMode(pin, OUTPUT);
  digitalWrite(pin, HIGH);   //Allume la led
  delay(temps);
  digitalWrite(pin, LOW);    //Éteint la led
  delay(temps);
}

//---------------/ Set Motor /---------------//
// Libération du câble du cadenas pendant    //
// 3sec puis se bloque avec le moteur.       //

void setMotor()
{
  monservo.attach(32); //Attache le moteur à la pin 32
  monservo.write(60); //Met un angle de 60°
  delay(3000);
  monservo.write(40); //Met un angle de 40°
  delay(1000);
  
  monservo.detach(); //Détache le moteur de la pin
}

//---------------/ Reset ESP32 /---------------//
// Fonction de reset de l'ESP32 via la pin 6.  //

void resetESP()
{
  pinMode(6, OUTPUT);
  digitalWrite(6, HIGH);
}

//---------------/ SetTimer /---------------//
// Création d'un timer.                     //

void setTimer()
{
  timer = timerBegin(0, 80, true);                //Créer un timer avec une fréquence de 1Mhz
  timerAttachInterrupt(timer, &onTimer, true);    //Met une raison d'interruption au timer
  timerAlarmWrite(timer, 1000, true);             //Intialise le timer
  timerAlarmEnable(timer);                        //Active le timer
}

//---------------/ checkTimer /---------------//
// Prend en paramêtre la durée du timer en    //
// secondes et lance la requête android.      //

void checkTimer(int duree)
{
  int temps = duree * 40; //temps en ms avec 1000 -> 25sec
  if(interruptbool1 == true){
      interruptbool1 = false; //Met la valeur en false pour arreter le timer
      if(adc_read_counter == temps){ //Si la valeur du compteur vaut le temps du timer
          unlock_request("android",""); //Fait la requête d'ouverture Android
          adc_read_counter = 0; //Reset la valeur du compteur
        }
      adc_read_counter++; //Incrémente la valeur du compteur
    }
}

//---------------/ onTimer /---------------//
// Permet de réinitialiser le timer si la  //
// valeur de 'interruptbooll' est 'true'   //
// et donc de le relancer afin de créer    //
// une boucle.                             //

void onTimer() {
   interruptbool1 = true; //Indique que le timer est fini
}
