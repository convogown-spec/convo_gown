import { NextRequest, NextResponse } from "next/server";
import { signToken, getSession, setSessionCookie, clearSessionCookie } from "@/lib/auth";
import { checkRateLimit, incrementLoginAttempts, resetLoginAttempts } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/auth
 * Checks if the current admin session is valid.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, username: session.username });
}

/**
 * POST /api/admin/auth
 * Validates login credentials and initiates session.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

  try {
    // 1. Check rate limit
    const limit = await checkRateLimit(ip);
    if (!limit.allowed) {
      const resetInMins = limit.resetTime 
        ? Math.ceil((limit.resetTime.getTime() - Date.now()) / 60000) 
        : 15;
      return NextResponse.json(
        { error: `Too many login attempts. Please try again in ${resetInMins} minutes.` },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await req.json().catch(() => ({}));
    const username = body.username;
    const password = body.password || body.loginPassword; // support both new and cached payload formats

    const expectedUsername = process.env.ADMIN_USERNAME || "admin";
    const expectedPassword = process.env.ADMIN_PASSWORD || "Convo@2026";

    // 3. Validate credentials
    if (!username || !password || username !== expectedUsername || password !== expectedPassword) {
      await incrementLoginAttempts(ip);
      const remaining = limit.remaining - 1;
      return NextResponse.json(
        { 
          error: "Invalid username or password.",
          remainingAttempts: Math.max(0, remaining)
        },
        { status: 401 }
      );
    }

    // 4. Successful login: clear rate limits
    await resetLoginAttempts(ip);

    // 5. Generate secure JWT and set cookie
    const token = signToken({ username });
    await setSessionCookie(token);

    return NextResponse.json({ success: true, username });
  } catch (error: any) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/auth
 * Handles admin logout.
 */
export async function DELETE() {
  await clearSessionCookie();
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
