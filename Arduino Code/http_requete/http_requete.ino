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
}

void loop()
{
  
}

void wifi_connexion()
{
  // We start by connecting to a WiFi network

    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    requete_deverouiller();
}


void requete_deverouiller()
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
}
