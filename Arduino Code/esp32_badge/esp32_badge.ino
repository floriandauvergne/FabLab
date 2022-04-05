#include <MFRC522.h>
#include <SPI.h>


//Constants
#define SS_PIN 16
#define RST_PIN 17

//Variables
byte nuidPICC[4] = {0, 0, 0, 0};
MFRC522::MIFARE_Key key;
MFRC522 rfid = MFRC522(SS_PIN, RST_PIN);


void setup() {
  //Init Serial USB
  Serial.begin(115200);
  Serial.println(F("Initialize System"));
  
  SPI.begin();
  rfid.PCD_Init();
}


void loop() {
  readRFID();
  delay(100);
}



void readRFID() {
  // Read RFID card
  for (byte i = 0; i < 6; i++) key.keyByte[i] = 0xFF;

  // Look for new 1 cards
  if (!rfid.PICC_IsNewCardPresent())
  { 
    //Serial.println("No Card");
    return;
  }
  else
  {
    Serial.println("New Card Present");
    // Verify if the NUID has been readed
    if (!rfid.PICC_ReadCardSerial())
    {
      //Serial.println("No Reading");
      return;
    }
    else
    {
      Serial.println("Reading Card on Serial Port");
    }
  }


  // Store NUID into nuidPICC array
  for (byte i = 0; i < 4; i++) {
    nuidPICC[i] = rfid.uid.uidByte[i];
  }

  Serial.print(F("RFID In dec: "));
  printDec(rfid.uid.uidByte, rfid.uid.size);
  Serial.println();
  // Halt PICC
  rfid.PICC_HaltA();
  // Stop encryption on PCD
  rfid.PCD_StopCrypto1();
}



void printHex(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
  }
}
void printDec(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], DEC);
  }
}
