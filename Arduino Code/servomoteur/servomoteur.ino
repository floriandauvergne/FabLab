#include <ESP32Servo.h>
#include <analogWrite.h>
#include <ESP32Tone.h>
#include <ESP32PWM.h>

 
// Crée un objet de type "Servo", nommé -> monservo
Servo monservo;
int x = 0;

void setup() 
{
  Serial.begin(115200);
  monservo.attach(17);
}

void loop() {

  monservo.write(0);
  Serial.println(monservo.read());
  delay(1000);
  monservo.write(45);
  Serial.println(monservo.read());
  delay(1000);
  
}
