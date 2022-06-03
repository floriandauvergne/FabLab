#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>

#define SSpin   21  // pin SDA du RC522 -> 21
#define RSTpin  22   // pin RST du RC522 -> 22

#define uS_TO_S_FACTOR 1000000 /* Conversion factor for micro seconds to seconds */
#define TIME_TO_SLEEP 5 /* Time ESP32 will go to sleep (in seconds) */

RTC_DATA_ATTR int bootCount = 0;

const char* ssid = "Eleves";            //Nom du réseau wifi
const char* password = "ml$@0931584S";  //Mot de passe du réseau wifi

MFRC522 rfid(SSpin, RSTpin); //Donner les pins 'SS' et 'RST' du capteur RFID




void wifi_connexion()
{
  Serial.print("Connexion WIFI à : ");
  Serial.print(ssid);
  //Connexion avec l'identifiant et le mdp
  WiFi.begin(ssid, password); //Essaye de se connecter au wifi

  while (WiFi.status() != WL_CONNECTED) { //Tant que la connexion au wifi ne se fait pas
    light_led(2, 100); //Indication de lecture de la carte
    Serial.print(".");
  }
  Serial.println("WiFi connected"); //Quand la connexion au wifi est effectué
}

void light_led(int pin, int temps)
{
  pinMode(pin, OUTPUT);
  digitalWrite(pin, HIGH);   //Allume la led
  delay(temps);
  digitalWrite(pin, LOW);    //Éteint la led
  delay(temps);
}





void setup(){
  //Serial.begin(115200);

  wifi_connexion();

 
  SPI.begin();
  rfid.PCD_Init();
}

void loop(){
 
  if (WiFi.status() == WL_CONNECTED) //Tant que la connexion au wifi ne se fait pas
    light_led(3, 1000); //Indication de lecture de la carte
  else
    light_led(1, 1000); //Indication de lecture de la carte

    
  //esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  esp_sleep_enable_ext0_wakeup(GPIO_NUM_18,HIGH);
  esp_light_sleep_start();

  if (WiFi.status() == WL_CONNECTED) //Tant que la connexion au wifi ne se fait pas
    light_led(3, 1000); //Indication de lecture de la carte
  else
    light_led(1, 1000); //Indication de lecture de la carte
}
