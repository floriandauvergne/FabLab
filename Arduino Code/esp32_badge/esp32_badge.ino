#include <SPI.h>
#include <MFRC522.h>

#define SSpin   21   // pin SDA du module RC522
#define RSTpin  2  // pin RST du module RC522

MFRC522 rfid(SSpin, RSTpin);

int ledpin = 0;

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
  if (rfid.PICC_IsNewCardPresent())  // on a détecté un tag
  {

    if (rfid.PICC_ReadCardSerial())  // on a lu avec succès son contenu
    {
      digitalWrite(2, HIGH);
      Serial.println("UID : ");

      String uid = "";
      for (byte i = 0; i < rfid.uid.size; i++)
      {
        Serial.println(rfid.uid.uidByte[i]);
        String str = String(rfid.uid.uidByte[i], HEX);
        uid = uid + str;
      }
      for (byte i = 0; i < uid.length(); i++)
      {
        if (uid[i] >= 'a' && uid[i] <= 'z')
        {
          uid[i] = uid[i] - 32;
        }
      }
      Serial.println(uid);
      delay (1000);
      digitalWrite(2, LOW);
    }
  }

}

String decToHex(byte decValue, byte desiredStringLength) {

  String hexString = String(decValue, HEX);
  while (hexString.length() < desiredStringLength) hexString = "0" + hexString;

  return hexString;
}
