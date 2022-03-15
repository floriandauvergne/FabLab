
#include "PN532_HSU.h"
#include "PN532.h"
#include "NfcAdapter.h"

PN532_HSU interface(Serial1); //Connexion du module Grove NFC sur le serial 1
NfcAdapter nfc = NfcAdapter(interface);

String UID_scan;
int LED = 2;

/**************************************************************************************************/

void setup()
{
  Serial.begin(9600);
  Serial.println("NDEF Reader");
  nfc.begin(); //Initialisation du module
}

void loop()
{
  if (nfc.tagPresent())
  {
    NfcTag tag = nfc.read(); //Lecture de la carte NFC
    UID_scan = tag.getUidString(); //Acquisition du code UID de la carte
    Serial.println("ID Card : " + UID_scan); //Renvoi sur le moniteur du code UID
    
    blink_LED();
    verif_autorisation();

  }

}

void blink_LED()
{
    digitalWrite(LED, HIGH);
    delay(500);             
    digitalWrite(LED, LOW);    
    delay(500);  
}

void verif_autorisation()
{
  //Faire une requete pour l'API pour verifier l'horaire et si la personne à déjà badger
  //récupérer le JSON de la requete et le traiter

  //Si les informations correspondent : ouvrir le cadenas et (opt)emettre un son
  //Sinon : (opt)emettre un son
}
