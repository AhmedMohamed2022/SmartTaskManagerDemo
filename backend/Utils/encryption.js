const CryptoJS = require("crypto-js");

const AES_SECRET = process.env.AES_SECRET;

/*
  Encrypt sensitive data before storing it in MongoDB.
*/
function encrypt(text) {
  if (!text) {
    return "";
  }

  return CryptoJS.AES.encrypt(text, AES_SECRET).toString();
}

/*
  Decrypt data when it needs to be displayed or compared.
*/
function decrypt(cipherText) {
  if (!cipherText) {
    return "";
  }

  const bytes = CryptoJS.AES.decrypt(cipherText, AES_SECRET);

  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  encrypt,
  decrypt,
};
