/*#include <HTTPClient.h>*/
#include <WiFi.h>
/*#include "ArduinoJson.h"  //Librairie de gestion des JSON
#include "PN532_HSU.h"    //Librairie de lecture du capteur NFC
#include "PN532.h"        //Librairie de lecture du capteur NFC
#include "NfcAdapter.h"   //Librairie du capteur NFC

PN532_HSU interface(Serial1); //Connexion du module Grove NFC sur le serial 1
NfcAdapter nfc = NfcAdapter(interface);

String UID_scan;*/
const char* ssid = "Eleves";
const char* password = "ml$@0931584S";
String serverName = "https://b268076a-1104-466e-837a-a82b9ada121d.mock.pstmn.io/";

void setup()
{

  Serial.begin(115200);

  //Connexion Wifi
  wifi_connexion();

  /*//Connexion NDEF Reader
  nfc.begin(); //Initialisation du module
  Serial.println("NDEF Reader");*/

}

void loop()
{

 /*if (nfc.tagPresent())
  {
    NfcTag tag = nfc.read(); //Lecture de la carte NFC
    UID_scan = tag.getUidString(); //Acquisition du code UID de la carte
    UID_scan.replace(" ", "");

    Serial.println("ID Card : " + UID_scan); //Renvoi sur le moniteur du code UID
    //requete_deverouiller();
    delay(200);
  }*/
}


void wifi_connexion()
{
  // We start by connecting to a WiFi network
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nWiFi connected : " + WiFi.localIP());
}



/*void requete_deverouiller()
{
  //Check WiFi connection status
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String serverPath = serverName + "cadenas/ouvrir";

    // Your Domain name with URL path or IP address with path
    http.begin(serverPath.c_str());

    // Send HTTP GET request
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0) {
      String payload = http.getString();
      Serial.println(payload);
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
}*/
