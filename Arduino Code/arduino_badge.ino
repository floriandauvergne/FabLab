#include <Bridge.h>
#include <BridgeClient.h>
#include <b64.h>
#include <HttpClient.h>


#include "ArduinoJson.h"  //Librairie de gestion des JSON
#include "PN532_HSU.h"    //Librairie de lecture du capteur NFC
#include "PN532.h"        //Librairie de lecture du capteur NFC
#include "NfcAdapter.h"   //Librairie du capteur NFC


PN532_HSU interface(Serial1); //Connexion du module Grove NFC sur le serial 1
NfcAdapter nfc = NfcAdapter(interface);

String UID_scan;
int LED = 13;

void setup()
{
  Serial.begin(9600);
  nfc.begin(); //Initialisation du module
  Serial.println("NDEF Reader");
  
  DynamicJsonDocument doc(2048);

  Bridge.begin();

}

void loop()
{

  if (nfc.tagPresent())
  { 
//    NfcTag tag = nfc.read(); //Lecture de la carte NFC
//    UID_scan = tag.getUidString(); //Acquisition du code UID de la carte
//    UID_scan.replace(" ", "");
//    
//    Serial.println("ID Card : " + UID_scan); //Renvoi sur le moniteur du code UID

    String url = "https://a3b49ec7-c30d-4962-9bad-63b0c319f410.mock.pstmn.io/retour";
    //String url = "http://51.210.151.13/badge.php?type=open&idCarte=" + UID_scan + "&idCadenas=0";
    Serial.println(url);
    delay(1000);
    requete_deverouiller();
  }
}

void requete_deverouiller()
{
  HttpClient client;
  String url = "https://a3b49ec7-c30d-4962-9bad-63b0c319f410.mock.pstmn.io/retour";
  client.get(url);
  
  while(client.available())
  {
    char c = client.read();
    Serial.print(c);
  }
  delay(5000);
}
