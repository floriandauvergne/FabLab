#include <HTTP_Method.h>
#include <Uri.h>
#include <WebServer.h>

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "Eleves";  // Mettre votre SSID Wifi
const char* password = "ml$@0931584S";
String page;

WebServer server(80);

void handleRoot(){  // Page d'accueil La page HTML est mise dans le String page

//  Syntaxe d'écriture pour être compatible avec le C++ / Arduino

// String page = " xxxxxxxx ";

// page += " xxxxx ";

// etc ...
  page = "<!DOCTYPE html>";  // Début page HTML
    page += "<head>";
    page += "    <title>Serveur ESP32</title>";
    page += "    <meta http-equiv='refresh' content='60' name='viewport' content='width=device-width, initial-scale=1' charset='UTF-8'/>";
    page += "</head>";
    page += "<body lang='fr'>";
    page += "    <h1>Serveur</h1>";
    page += "    <p>Ce serveur est hébergé sur un ESP32</p>";
    page += "    <i>Créé par Tommy Desrochers</i>";
//    page += "    <?php echo($_POST)?>";
//    page += "</body>";
//    page += "</html>";  // Fin page HTML

    server.send(200, "text/html", page);  // Envoie de la page HTML
}

void handleNotFound(){  // Page Not found
  server.send(404, "text/plain","404: Not found");
}

void setup() 
{

  Serial.begin(115200);   // Initialisation du moniteur série à 115200
  delay(1000);
  Serial.println("\n");
  WiFi.begin(ssid,password);  // Initialisation avec WiFi.begin / ssid et password
  Serial.print("Attente de connexion ...");  // Message d'attente de connexion
  while(WiFi.status() != WL_CONNECTED){
  Serial.print(".");  // Affiche des points .... tant que connexion n'est pas OK
  delay(1000);
  }
 Serial.println("\n");
 Serial.println("Connexion etablie !");  // Affiche connexion établie
 Serial.print("Adresse IP: ");
 Serial.println(WiFi.localIP());  // Affiche l'adresse IP de l'ESP32 avec WiFi.localIP

  server.on("/", handleRoot);  // Chargement de la page d'accueil
  server.onNotFound(handleNotFound);  // Chargement de la page "Not found"
  server.begin();  // Initialisation du serveur web
  Serial.println("Serveur web actif");
//*******************************************************************************************************
  /*if(Distance < 10){//Capteur 1
    Serial.println("****Distribution du gel****");//action de distribuer gel
    delay(3500);// temps d'attente avant redistrubution
  }
  delay(1000);*/
//*******************************************************************************************************
/*
  if(Distance < 50){//Capteur 2  
    if(Distance < 2){
      Serial.print("**Rempli**");
      Serial.println(Distance);
    }
     if(Distance > 2 && Distance < 10){
      Serial.print("**Bien**");
      Serial.println(Distance);
    }
     if(Distance > 10 && Distance < 15){
      Serial.print("**Niveau Bas**");
      Serial.println(Distance);
    }
     if(Distance > 15){
      Serial.print("**Attention**");
      Serial.println(Distance);
    }
  delay(1000);
 }
 */
//*******************************************************************************************************
/*
  String MonJson;
  StaticJsonDocument<300> doc;
  doc["ESP"] = 1;
  doc["nivBatterie"] = 100;
  doc["nivGel"] = "Distance";
  serializeJson(doc, MonJson);

  WiFiClient c;
  HTTPClient http;
  http.begin(c, "MonLien");
  http.POST(MonJson);
  delay(1000);
  Serial.println(MonJson);
  Serial.print(http.getString());
  http.end();
*/
//*******************************************************************************************************
/*WiFiClient c;
HTTPClient http;
http.useHTTP10(true);
http.begin(c, "172.20.39.95");
http.GET();
DynamicJsonDocument doc(2048);
//deserializeJson(doc, http.getString());
  //Serial.println(doc);
  Serial.print(http.getString());*/
//*******************************************************************************************************
}
boolean t = true;
void loop() {
WiFiClient c;
HTTPClient http;
http.useHTTP10(true);
http.begin(c, "http://arduinojson.org/example.json");
http.GET();
DynamicJsonDocument doc(2048);
  Serial.println("**");
  delay(2000);
  Serial.print(http.getString());
  if(t=true){
    Serial.println(http.getString());
    page += "<script>

setInterval(function() {
  // Call a function repetatively with 2 Second interval
  getData();
}, 2000); //2000mSeconds update rate

function getData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("ADCValue").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "readADC", true);xhttp.send();}</script>";
    //page += http.getString();
    page += "</body>";
    page += "</html>";  // Fin page HTML

    server.send(200, "text/html", page);  // Envoie de la page HTML
    t=false;
  }
  server.handleClient();  // Attente de demande du client
  }
