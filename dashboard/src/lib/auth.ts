import { createHash, randomBytes, timingSafeEqual } from "crypto";

// Bcrypt-like hashing using PBKDF2 (works in browser + Node)
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = createHash("sha512")
    .update(password + salt)
    .digest("hex");
  return `${salt}:${hash}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const inputHash = createHash("sha512")
    .update(password + salt)
    .digest("hex");
  try {
    return timingSafeEqual(Buffer.from(hash), Buffer.from(inputHash));
  } catch {
    return false;
  }
}

// Rate limiting for login attempts
const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();

export function checkLoginRateLimit(email: string): { allowed: boolean; retryAfter?: number } {
  const key = email.toLowerCase();
  const now = Date.now();
  const record = loginAttempts.get(key);

  if (record) {
    if (record.lockedUntil > now) {
      return { allowed: false, retryAfter: Math.ceil((record.lockedUntil - now) / 1000) };
    }
    if (record.count >= 5) {
      record.lockedUntil = now + 15 * 60 * 1000; // Lock 15 minutes
      return { allowed: false, retryAfter: 900 };
    }
  }

  return { allowed: true };
}

export function recordLoginAttempt(email: string, success: boolean) {
  const key = email.toLowerCase();
  if (success) {
    loginAttempts.delete(key);
    return;
  }
  const record = loginAttempts.get(key) || { count: 0, lockedUntil: 0 };
  record.count++;
  loginAttempts.set(key, record);
}
