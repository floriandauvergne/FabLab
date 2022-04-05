#include "PN532_HSU.h"    //Librairie de lecture du capteur NFC
#include "PN532.h"        //Librairie de lecture du capteur NFC
#include "NfcAdapter.h"   //Librairie du capteur NFC

PN532_HSU interface(Serial1); //Connexion du module Grove NFC sur le serial 1
NfcAdapter nfc = NfcAdapter(interface);

String UID_scan;

void setup()
{
  Serial.begin(115200);

  //Connexion NDEF Reader
  nfc.begin(); //Initialisation du module
  Serial.println("NDEF Reader Start");
}

void loop()
{
  if (nfc.tagPresent())
    { 
      NfcTag tag = nfc.read(); //Lecture de la carte NFC
      UID_scan = tag.getUidString(); //Acquisition du code UID de la carte
      UID_scan.replace(" ", "");
      
      Serial.println("ID Card : " + UID_scan); //Renvoi sur le moniteur du code UID
    }
}

#define RXD2 16   // ESP32 pin GIOP
#define TXD2 17   // ESP32 pin GIOP

MFRC522 rfid(RXD2, TXD2);
