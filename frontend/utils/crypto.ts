// ─────────────────────────────────────────────────────────────────────────────
// utils/crypto.ts — Client-side AES Encryption/Decryption
//
// WHY client-side encryption?
//   Even if someone breaches the database, the note content is unreadable
//   without the encryption key. The server never sees plain text notes.
//
// HOW it works:
//   1. Before sending a note → encrypt title + description → send ciphertext
//   2. After receiving notes ← decrypt title + description ← show plaintext
//
// Key source: NEXT_PUBLIC_ENCRYPTION_KEY env variable
//   → In production, use a strong random 256-bit key
//   → Example: openssl rand -hex 32
// ─────────────────────────────────────────────────────────────────────────────

import CryptoJS from "crypto-js";

// The secret key used for AES encryption/decryption.
// Must be the same value every time — changing it makes existing notes unreadable.
// NEXT_PUBLIC_ prefix makes it available in the browser bundle.
const SECRET_KEY =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "fallback-dev-key-change-in-production";

/**
 * Encrypts a plain text string using AES.
 * Returns a base64-encoded ciphertext string safe for JSON/DB storage.
 *
 * @param plainText - The raw string to encrypt (e.g. note title or description)
 * @returns Encrypted string (ciphertext)
 */
export const encryptText = (plainText: string): string => {
  if (!plainText) return plainText;
  return CryptoJS.AES.encrypt(plainText, SECRET_KEY).toString();
};

/**
 * Decrypts a previously encrypted ciphertext string back to plain text.
 * Returns the original string, or the ciphertext unchanged if decryption fails.
 *
 * @param cipherText - The encrypted string from the server
 * @returns Decrypted plain text string
 */
export const decryptText = (cipherText: string): string => {
  if (!cipherText) return cipherText;
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    // If decryption produces an empty string, the data was not encrypted
    // (e.g. old plain-text notes) — return as-is
    return decrypted || cipherText;
  } catch {
    // Decryption failed — return original value so the app doesn't crash
    return cipherText;
  }
};

/**
 * Encrypts both title and description of a note payload before sending to server.
 */
export const encryptNote = (note: { title: string; description: string }) => ({
  title: encryptText(note.title),
  description: encryptText(note.description),
});

/**
 * Decrypts both title and description of a note received from the server.
 * Works on a single note object.
 */
export const decryptNote = <T extends { title: string; description: string }>(note: T): T => ({
  ...note,
  title: decryptText(note.title),
  description: decryptText(note.description),
});
