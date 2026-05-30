
import CryptoJS from "crypto-js";

const SECRET_KEY =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "fallback-dev-key-change-in-production";

export const encryptText = (plainText: string): string => {
  if (!plainText) return plainText;
  return CryptoJS.AES.encrypt(plainText, SECRET_KEY).toString();
};

export const decryptText = (cipherText: string): string => {
  if (!cipherText) return cipherText;
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || cipherText;
  } catch {
    return cipherText;
  }
};

export const encryptNote = (note: { title: string; description: string }) => ({
  title: encryptText(note.title),
  description: encryptText(note.description),
});

export const decryptNote = <T extends { title: string; description: string }>(note: T): T => ({
  ...note,
  title: decryptText(note.title),
  description: decryptText(note.description),
});
