import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Basic Validation
    if (!payload.email || !payload.name || !payload.institution) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields (email, name, institution)." },
        { status: 400 }
      );
    }

    // Resolve absolute path to the Python automation script
    const scriptPath = path.resolve(process.cwd(), "scripts", "send_quote_email.py");
    const jsonPayload = JSON.stringify(payload);

    // Spawn child process in a robust, cross-platform string array format
    return new Promise<NextResponse>((resolve) => {
      const pythonProcess = spawn("python", [scriptPath, jsonPayload]);

      let stdoutData = "";
      let stderrData = "";

      pythonProcess.stdout.on("data", (data) => {
        stdoutData += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        stderrData += data.toString();
      });

      pythonProcess.on("close", (code) => {
        if (code !== 0) {
          console.error("Python email script failed with exit code:", code, stderrData);
          resolve(
            NextResponse.json(
              { status: "error", message: "Failed to trigger email notification.", details: stderrData },
              { status: 500 }
            )
          );
          return;
        }

        try {
          const result = JSON.parse(stdoutData.trim());
          if (result.status === "success") {
            resolve(NextResponse.json({ status: "success", message: "Quote registered and email sent successfully." }));
          } else {
            resolve(
              NextResponse.json(
                { status: "error", message: result.message || "Failed to send email." },
                { status: 500 }
              )
            );
          }
        } catch (e) {
          console.error("Failed to parse Python script output:", stdoutData, e);
          resolve(
            NextResponse.json(
              { status: "success", message: "Quote registered. Email dispatch status unconfirmed." }
            )
          );
        }
      });
    });

  } catch (error: any) {
    console.error("Error in Quote request API:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error occurred.", details: error.message },
      { status: 500 }
    );
  }
}
