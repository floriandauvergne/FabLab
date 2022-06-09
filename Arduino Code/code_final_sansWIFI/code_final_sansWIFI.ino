#include <SPI.h>
#include <MFRC522.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#include <ESP32Tone.h>
#include <ESP32PWM.h>

#define SSpin   21  // pin SDA du RC522 -> 21
#define RSTpin  22   // pin RST du RC522 -> 22

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
}

void loop()
{
  cardPresent();  //Appel de la fonction de présence de carte
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
      setMotor();
      delay(1000);
    }
  }
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
  Serial.println("*Actionnement du Moteur*");

  monservo.attach(32); //Attache le moteur à la pin 32
  monservo.write(60); //Met un angle de 60°
  delay(3000);
  monservo.write(40); //Met un angle de 40°
  delay(1000);
  
  monservo.detach(); //Détache le moteur de la pin
}
