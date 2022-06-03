#include <SPI.h>
#include <MFRC522.h>
#include <ESP32Servo.h>
#include <ESP32Tone.h>
#include <ESP32PWM.h>

#define SSpin   21  // pin SDA du RC522 -> 21
#define RSTpin  22   // pin RST du RC522 -> 22

MFRC522 rfid(SSpin, RSTpin); //Donner les pins 'SS' et 'RST' du capteur RFID
Servo monservo;
  

void setup()
{
  //Serial.begin(115200);
 
  //Initialisation du capteur RFID
  SPI.begin();
  rfid.PCD_Init();
  Serial.println("RFID-RC522 - Reader");
  pinMode(1, OUTPUT);

}

void loop()
{
  
  cardPresent();
  digitalWrite(1, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
  digitalWrite(1, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
  
}

//---------------/ Détecter et lire la carte /---------------//

void cardPresent()
{
  if (rfid.PICC_IsNewCardPresent())  // on a détecté un tag
  {
    if (rfid.PICC_ReadCardSerial())  // on a lu avec succès son contenu
    {
      light_led(2,500);
      setMotor();
    }
  }
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
