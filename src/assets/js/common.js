import Vue from 'vue';
import Base64 from 'js-base64';
import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('1234567890123456'); // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('1234567890123456');
Vue.prototype.Decrypt = (word) => {
  let base64 = CryptoJS.enc.Base64.parse(word);
  let src = CryptoJS.enc.Base64.stringify(base64);
  let decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};
Vue.prototype.Encrypt = (word) => {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
};
