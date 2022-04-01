#include <ArduinoJson.h>
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Eleves";
const char* password = "ml$@0931584S";
String serverName = "https://b268076a-1104-466e-837a-a82b9ada121d.mock.pstmn.io/";

void setup()
{
  Serial.begin(115200);
  //Connexion Wifi
  wifi_connexion();

  requete_deverouiller();

}

void loop()
{

}

void wifi_connexion()
{
  Serial.print("Connexion WIFI à : ");
  Serial.println(ssid);
  //Connexion avec l'identifiant et le mdp
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  Serial.print("ESP Board MAC Address: ");
  Serial.println(WiFi.macAddress());
}

void requete_deverouiller()
{
  //Check WiFi connection status
  if (WiFi.status() == WL_CONNECTED)
  {
    HTTPClient http;
    String serverPath = serverName + "cadenas/ouvrir";

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
  
      if(action == "true")
      {
        light_led(2,2000);
      }
      else if(action == "false")
      {
        light_led(13,2000);
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
