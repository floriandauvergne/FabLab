#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Eleves";  // Mettre votre SSID Wifi
const char* password = "ml$@0931584S";

//Your Domain name with URL path or IP address with path
String serverName = "https://a3b49ec7-c30d-4962-9bad-63b0c319f410.mock.pstmn.io/connexion.php?x-api-key=PMAK-6239917c06a0322ee60d301f-ec61c58157f39459a3ec18d49026c95814";

void setup() {
  Serial.begin(115200); 

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  //Check WiFi connection status
/*  if(WiFi.status()== WL_CONNECTED){
    HTTPClient http;

    String serverPath = serverName;
    
    // Your Domain name with URL path or IP address with path
    http.begin(serverPath.c_str());
    
    // Send HTTP GET request
    int httpResponseCode = http.GET();
    
    if (httpResponseCode>0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String payload = http.getString();
      Serial.println(payload);
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    // Free resources
    http.end();
  }
  else {
    Serial.println("WiFi Disconnected");
  }*/
}
