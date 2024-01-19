import CryptoJS from "react-native-crypto-js";
class CryptoService {
  // Function to encrypt a message with a secret key
  static async encryptMessage(message, secretKey) {
    try {
      let encrypted = CryptoJS.AES.encrypt(message, secretKey).toString();
      return encrypted;
    } catch (error) {
      console.log(error);
    }
  }

  // Function to decrypt a message with a secret key
  static async decryptMessage(ciphertext, secretKey) {
    try {
      let decrypted = CryptoJS.AES.decrypt(ciphertext, secretKey).toString(
        CryptoJS.enc.Utf8
      );
      return decrypted;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CryptoService;
