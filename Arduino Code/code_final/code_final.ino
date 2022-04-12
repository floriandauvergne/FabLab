#include <SPI.h>
#include <MFRC522.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define SSpin   21   // pin SDA du module RC522
#define RSTpin  2  // pin RST du module RC522
const char* ssid = "Eleves";
const char* password = "ml$@0931584S";
String serverName = "https://b268076a-1104-466e-837a-a82b9ada121d.mock.pstmn.io/";

MFRC522 rfid(SSpin, RSTpin);

int ledpin = 0;

void setup()
{
  Serial.begin(115200);
  SPI.begin();
  rfid.PCD_Init();
  delay(500);
  wifi_connexion();
  
  Serial.println("\nRFID-RC522 - Reader");
}


void loop()
{
  cardPresent();
}



void wifi_connexion()
{
  Serial.print("Connexion WIFI à : ");
  Serial.print(ssid);
  //Connexion avec l'identifiant et le mdp
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
}



void cardPresent()
{
  if (rfid.PICC_IsNewCardPresent())  // on a détecté un tag
  {

    if (rfid.PICC_ReadCardSerial())  // on a lu avec succès son contenu
    {
      String uid = "";
      for (byte i = 0; i < rfid.uid.size; i++)
      {
        String str = String(rfid.uid.uidByte[i], HEX);
        uid = uid + str;
      }
      for (byte i = 0; i < uid.length(); i++)
      {
        if (uid[i] >= 'a' && uid[i] <= 'z')
        {
          uid[i] = uid[i] - 32;
        }
      }
      Serial.println("ID Carte : " + uid);
      requete_deverouiller(uid);
      delay (500);
    }
  }
}


void requete_deverouiller(String uid)
{
  //Check WiFi connection status
  if (WiFi.status() == WL_CONNECTED)
  {
    HTTPClient http;
    
    String serverPath = serverName + "cadenas/ouvrir?idCadenas=" + getStringMacAddress() + "&idCarte=" + uid;

    Serial.println(serverPath);
    http.begin(serverPath.c_str());

    // Envoi la requete HTTP au serveur
    int httpResponseCode = http.GET();

    if (httpResponseCode > 0)
    {
      String payload = http.getString();
      Serial.println(payload);

      StaticJsonBuffer<300> JSONBuffer;
      JsonObject& parsed = JSONBuffer.parseObject(payload); //Parse message
      String idCadenas = parsed["idCadenas"];
      String action = parsed["action"];
      Serial.println(action);

      if (action == "true")
      {
        light_led(2, 500);
      }
      else if (action == "false")
      {
        light_led(13, 500);
      }

    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
}


void light_led(int pin, int temps)
{
  pinMode(pin, OUTPUT);
  digitalWrite(pin, HIGH);   // turn the LED on
  delay(temps);
  digitalWrite(pin, LOW);    // turn the LED off
  delay(temps);
}



String getStringMacAddress()
{
  String idmacAddress = WiFi.macAddress();
  idmacAddress.remove(2, 1);
  idmacAddress.remove(4, 1);
  idmacAddress.remove(6, 1);
  idmacAddress.remove(8, 1);
  idmacAddress.remove(10, 1);

  return idmacAddress;
}
