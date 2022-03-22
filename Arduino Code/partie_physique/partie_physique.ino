#include "PN532_HSU.h"    //Librairie de lecture du capteur NFC
#include "PN532.h"        //Librairie de lecture du capteur NFC
#include "NfcAdapter.h"   //Librairie du capteur NFC


PN532_HSU interface(Serial1); //Connexion du module Grove NFC sur le serial 1
NfcAdapter nfc = NfcAdapter(interface);

String UID_scan;

void setup()
{
  Serial.begin(9600);
  nfc.begin(); //Initialisation du module
  Serial.println("NDEF Reader - Physique");
}

void loop()
{
  if (nfc.tagPresent())
  { 
    NfcTag tag = nfc.read(); //Lecture de la carte NFC
    UID_scan = tag.getUidString();
    
    Serial.println("\n ID : " + UID_scan);
    delay(100);
  }
}
