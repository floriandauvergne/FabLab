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


hw_timer_t * timer = NULL; 
volatile bool interruptbool1 = false;
int adc_read_counter = 0;

const char* ssid = "Eleves";            //Nom du réseau wifi
const char* password = "ml$@0931584S";  //Mot de passe du réseau wifi

String serverName = "http://51.210.151.13/btssnir/projets2022/fablab/api/";  //Adresse de l'API

MFRC522 rfid(SSpin, RSTpin); //Donner les pins 'SS' et 'RST' du capteur RFID
Servo monservo;

hw_timer_t * timerBegin(uint8_t , uint16_t divider, bool countUp);


void setup()
{
  Serial.begin(9600);
  //Initialisation du capteur RFID
  SPI.begin();
  rfid.PCD_Init();
  
  monservo.attach(32);
  monservo.write(40);
  delay(1000);
  monservo.detach();
  
  wifi_connexion();
  setTimer();
  Serial.println("RFID-RC522 - Reader");

  
}

void loop()
{
  cardPresent();

  checkTimer(15);
}

//---------------/ Connexion au Wifi /---------------//

void wifi_connexion()
{
  Serial.print("Connexion WIFI à : ");
  Serial.print(ssid);
  //Connexion avec l'identifiant et le mdp
  WiFi.begin(ssid, password); //Essaye de se connecter au wifi

  int x = 0;
  while (WiFi.status() != WL_CONNECTED) { //Tant que la connexion au wifi ne se fait pas
    light_led(1, 100); //Indication de lecture de la carte
    Serial.print(".");
    x++;
    if(x>50)
    {
      resetESP();
    }
  }
  Serial.println("WiFi connected"); //Quand la connexion au wifi est effectué
}

//---------------/ Détecter et lire la carte /---------------//

void cardPresent()
{
  if (rfid.PICC_IsNewCardPresent())  // on a détecté un tag
  {
    if (rfid.PICC_ReadCardSerial())  // on a lu avec succès son contenu
    {
      light_led(1, 500); //Indication de lecture de la carte
      String uid = "";

      for (byte i = 0; i < rfid.uid.size; i++)
      {
        String str = String(rfid.uid.uidByte[i], HEX); //Récupère les bytes en décimal et les transforme en hexadécimal
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

      Serial.println("\nID Carte : " + uid);
      unlock_request("cadenas",uid);
      delay(1000);
    }
  }
}

//---------------/ Requête pour déverouiller /---------------//

void unlock_request(String type, String uid)
{
  StaticJsonBuffer<600> JSONBuffer;
  String request = "";
  if(type == "android")
  {
    Serial.println("Requête Ouverture Android");
    request = serverName +"cadenas/ouvrir.php?type=read&idCadenas=" + getStringMacAddress();
  }
  else if(type == "cadenas")
  {
    Serial.println("Requête Ouverture Badge");
    request = serverName +"cadenas/ouvrir.php?type=cadenas&idCadenas=" + getStringMacAddress() + "&idCarte=" + uid;
  }

  JsonObject& parsed = makeRequest(request); //Rentre les données dans l'URL de requête de l'API);
  String idCadenas = parsed["idCadenas"];   //Récupère la clé "idCadenas"
  bool succes = parsed["succes"];           //Récupère la clé "action"
  parsed.printTo(Serial);
  Serial.println();

  if (idCadenas == getStringMacAddress()) //Si la réponse est celle pour le cadenas
  {
    Serial.println("*Requête pour ce cadenas*");
    if (succes == true) //Si il demande d'ouvrir
    {
      //Faire ouvrir le cadenas - Activer le micro-moteur
      Serial.println("Accès Autorisé");

        pinMode(3,OUTPUT);
        digitalWrite(3, HIGH);   // turn the LED on (HIGH is the voltage level)
        setMotor();
        digitalWrite(3, LOW);
    }
    else
    {
      Serial.println("Accès Refusé");
      
      pinMode(1,OUTPUT);
      digitalWrite(1, HIGH);   // turn the LED on (HIGH is the voltage level)
      delay(3000);                       // wait for a second
      digitalWrite(1, LOW);
    }
  }
}


//---------------/ Faire la requête /---------------//  \("{}")/

JsonObject& makeRequest(String serverPath)
{
  StaticJsonBuffer<600> JSONBuffer;

  if (WiFi.status() == WL_CONNECTED) // Verifie si connecté au wifi
  {
    HTTPClient http;
    Serial.println(serverPath);
    http.begin(serverPath.c_str());

    //("{}")/\("{}")/\("{}")/\("{}")/\("{}")/\("{}")/\("{}")/\("{}")/\("{}")
    //\___________________________________________________________________/

    // Envoi la requete HTTP au serveur
    int httpResponseCode = http.GET();
    if (httpResponseCode > 0) //Si il y a une réponse
    {
      String payload = http.getString(); //recupère les données de réponse de l'API
      JsonObject& json = JSONBuffer.parseObject(payload); //Met les données de réponse en JSON
      http.end();
      return json;
    }
  }
  resetESP();
}

//---------------/ MAC Address /---------------//

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

void light_led(int pin, int temps)
{
  pinMode(pin, OUTPUT);
  digitalWrite(pin, HIGH);   //Allume la led
  delay(temps);
  digitalWrite(pin, LOW);    //Éteint la led
  delay(temps);
}

//---------------/ Set Motor /---------------//

void setMotor()
{
  Serial.println("*Actionnement du Moteur*");

  monservo.attach(32);
  monservo.write(60);
  delay(3000);
  monservo.write(40);
  delay(1000);
  
  monservo.detach();
}

//---------------/ Reset ESP32 /---------------//

void resetESP()
{
  pinMode(6, OUTPUT);
  digitalWrite(6, HIGH);
}

//---------------/ SetTimer /---------------//

void setTimer()
{
  timer = timerBegin(0, 80, true);                //Begin timer with 1 MHz frequency (80MHz/80)
  timerAttachInterrupt(timer, &onTimer, true);   //Attach the interrupt to Timer1
  timerAlarmWrite(timer, 1000, true);      //Initialize the timer
  timerAlarmEnable(timer);
}

//---------------/ checkTimer /---------------//

void checkTimer(int duree)
{
  //1000 -> 25sec
  int temps = duree * 40;
  if(interruptbool1 == true){
      interruptbool1 = false;
      if(adc_read_counter == temps){
          unlock_request("android","");
          adc_read_counter = 0;
        }
      adc_read_counter++;
    }
}

//---------------/ onTimer /---------------//

void onTimer() {
   interruptbool1 = true; //Indicates that the interrupt has been entered since the last time its value was changed to false 
}
