#define uS_TO_S_FACTOR 1000000 /* Conversion factor for micro seconds to seconds */
#define TIME_TO_SLEEP 5 /* Time ESP32 will go to sleep (in seconds) */

RTC_DATA_ATTR int bootCount = 0;

int GREEN_LED_PIN = 2;
int YELLOW_LED_PIN = 3;

void setup(){
 Serial.begin(115200);

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
 
 esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
 esp_deep_sleep_start();
}

void loop(){
 
}
