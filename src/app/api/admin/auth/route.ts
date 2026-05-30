import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import db from "@/lib/db";

// Helper to get client IP
function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "127.0.0.1";
}

// GET /api/admin/auth - Check if authenticated
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("admin_session")?.value;

    if (!sessionId) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const session = db
      .prepare("SELECT * FROM admin_sessions WHERE session_id = ?")
      .get(sessionId) as { session_id: string; username: string; expires_at: number } | undefined;

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    if (session.expires_at <= Date.now()) {
      // Session expired, clean up
      db.prepare("DELETE FROM admin_sessions WHERE session_id = ?").run(sessionId);
      cookieStore.delete("admin_session");
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, username: session.username });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/auth - Login
export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const now = Date.now();

    // Rate limiting check
    const rateLimit = db
      .prepare("SELECT * FROM login_attempts WHERE ip = ?")
      .get(ip) as { ip: string; attempts: number; last_attempt: number } | undefined;

    if (rateLimit && rateLimit.attempts >= 5 && now - rateLimit.last_attempt < 15 * 60 * 1000) {
      const minutesLeft = Math.ceil((15 * 60 * 1000 - (now - rateLimit.last_attempt)) / 60000);
      return NextResponse.json(
        { error: `Too many failed login attempts. Please try again in ${minutesLeft} minutes.` },
        { status: 429 }
      );
    }

    const { username, password } = await req.json();

    // Verify credentials
    if (username !== "admin" || password !== "Convo@2026") {
      let attempts = 1;
      if (rateLimit) {
        // If last attempt was > 15m ago, reset attempts
        attempts = now - rateLimit.last_attempt > 15 * 60 * 1000 ? 1 : rateLimit.attempts + 1;
        db.prepare(
          "INSERT OR REPLACE INTO login_attempts (ip, attempts, last_attempt) VALUES (?, ?, ?)"
        ).run(ip, attempts, now);
      } else {
        db.prepare(
          "INSERT INTO login_attempts (ip, attempts, last_attempt) VALUES (?, 1, ?)"
        ).run(ip, now);
      }

      const remaining = Math.max(0, 5 - attempts);
      return NextResponse.json(
        { error: `Invalid credentials. ${remaining} attempts remaining before temporary lockout.` },
        { status: 401 }
      );
    }

    // Success - Clear login attempts
    db.prepare("DELETE FROM login_attempts WHERE ip = ?").run(ip);

    // Create session
    const sessionId = crypto.randomUUID();
    const expiresAt = now + 24 * 60 * 60 * 1000; // 24 hours
    db.prepare(
      "INSERT INTO admin_sessions (session_id, username, expires_at) VALUES (?, ?, ?)"
    ).run(sessionId, "admin", expiresAt);

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400, // 24 hours
    });

    return NextResponse.json({ authenticated: true, username: "admin" });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/auth - Logout
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("admin_session")?.value;

    if (sessionId) {
      // Remove from DB
      db.prepare("DELETE FROM admin_sessions WHERE session_id = ?").run(sessionId);
    }

    // Clear cookie
    cookieStore.delete("admin_session");

    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
