#include <SPI.h>
#include <MFRC522.h>

#define SSpin   21  // pin SDA du RC522 -> 21
#define RSTpin  22   // pin RST du RC522 -> 22

#define uS_TO_S_FACTOR 1000000 /* Conversion factor for micro seconds to seconds */
#define TIME_TO_SLEEP 5 /* Time ESP32 will go to sleep (in seconds) */

RTC_DATA_ATTR int bootCount = 0;

MFRC522 rfid(SSpin, RSTpin); //Donner les pins 'SS' et 'RST' du capteur RFID

int GREEN_LED_PIN = 2;
int YELLOW_LED_PIN = 3;

void setup(){
  Serial.begin(115200);
 
  Serial.println("ESP32 - Test mode Veille");
  SPI.begin();
  rfid.PCD_Init();

  pinMode(2, OUTPUT);
  digitalWrite(2, HIGH);   //Allume la led
  delay(500);
  digitalWrite(2, LOW);    //Éteint la led
  delay(500);

  pinMode(3, OUTPUT);
  digitalWrite(3, HIGH);   //Allume la led
  delay(500);
  digitalWrite(3, LOW);    //Éteint la led
  delay(500);
 
 esp_sleep_enable_ext0_wakeup(GPIO_NUM_18,HIGH);
 esp_light_sleep_start();
}

void loop(){
 
}
