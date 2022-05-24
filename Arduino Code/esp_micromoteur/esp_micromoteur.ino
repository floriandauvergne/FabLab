#include "DualMC33926MotorShield.h"

DualMC33926MotorShield md;

void setup() {
  // put your setup code here, to run once:

  Serial.begin(115200);
  
  Serial.println("RFID-RC522 - Reader");
  
  Serial.println("Dual MC33926 Motor Shield");
  md.init();

  md.setM1Speed(100);

}

void loop() {
  // put your main code here, to run repeatedly:

}
