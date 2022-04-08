#include <SPI.h>
#include <MFRC522.h>

#define SSpin   5  // pin SDA du module RC522
#define RSTpin  27  // pin RST du module RC522

MFRC522 rfid(SSpin, RSTpin);

void setup()
{
  Serial.begin(115200);
  Serial.println("RFID-RC522 - Reader");

  SPI.begin();
  rfid.PCD_Init();
  Serial.println("SPI and RFID start");

}
void loop()
{
  cardPresent();
}


void cardPresent()
{
  digitalWrite(2, HIGH);
  if (rfid.PICC_IsNewCardPresent())  // on a détecté un tag
  {
    if (rfid.PICC_ReadCardSerial())  // on a lu avec succès son contenu
    {

      Serial.println("Voici l'UID de ce tag:");
      Serial.print("const byte bonUID[");
      Serial.print(rfid.uid.size);
      Serial.print("] = {");

      for (byte i = 0; i < rfid.uid.size; i++)
      {
        Serial.print(rfid.uid.uidByte[i]);
        if (i < rfid.uid.size - 1)
        {
          Serial.print(", ");
        }
        else
          Serial.println("};");
      }
      Serial.println();
      delay (2000);
    }
  }
  digitalWrite(2, LOW);
}
