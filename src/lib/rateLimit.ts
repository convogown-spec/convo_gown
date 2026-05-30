import { prisma } from "./prisma";

const MAX_ATTEMPTS = 5;
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes block duration (15 min)

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime?: Date;
}

/**
 * Validates whether the given IP address is allowed to make a login attempt.
 */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  try {
    const record = await prisma.loginAttempt.findUnique({
      where: { ip },
    });

    const now = new Date();

    if (!record) {
      return { allowed: true, remaining: MAX_ATTEMPTS };
    }

    const timePassed = now.getTime() - record.last_attempt.getTime();

    // If block window has expired, reset the attempt counter
    if (timePassed > BLOCK_DURATION_MS) {
      await prisma.loginAttempt.update({
        where: { ip },
        data: { attempts: 0, last_attempt: now },
      });
      return { allowed: true, remaining: MAX_ATTEMPTS };
    }

    if (record.attempts >= MAX_ATTEMPTS) {
      const resetTime = new Date(record.last_attempt.getTime() + BLOCK_DURATION_MS);
      return { allowed: false, remaining: 0, resetTime };
    }

    return { allowed: true, remaining: MAX_ATTEMPTS - record.attempts };
  } catch (error) {
    console.error("Rate limit check failed, passing through safely:", error);
    return { allowed: true, remaining: 1 };
  }
}

/**
 * Increments the login attempt count for a specific IP.
 */
export async function incrementLoginAttempts(ip: string): Promise<void> {
  try {
    const now = new Date();
    await prisma.loginAttempt.upsert({
      where: { ip },
      create: { ip, attempts: 1, last_attempt: now },
      update: {
        attempts: { increment: 1 },
        last_attempt: now,
      },
    });
  } catch (error) {
    console.error("Failed to increment login attempts:", error);
  }
}

/**
 * Resets the attempt logs for a specific IP upon successful validation.
 */
export async function resetLoginAttempts(ip: string): Promise<void> {
  try {
    await prisma.loginAttempt.delete({
      where: { ip },
    }).catch(() => {}); // Safely catch if record was already deleted or missing
  } catch (error) {
    console.error("Failed to reset login attempts:", error);
  }
}
