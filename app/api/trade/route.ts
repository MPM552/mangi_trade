import { NextRequest, NextResponse } from "next/server";

const MINT = "BkhqEefy6qC6FFQrc5AGbdNG94yNDAC8gAdjACK5pump";

export async function POST(req: NextRequest) {
  try {
    const { publicKey, action, amount, denominatedInSol } = await req.json();

    if (!publicKey || !action || amount === undefined || denominatedInSol === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (action !== "buy" && action !== "sell") {
      return NextResponse.json({ error: "action must be buy or sell" }, { status: 400 });
    }

    const response = await fetch("https://pumpportal.fun/api/trade-local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        publicKey,
        action,
        mint: MINT,
        amount,
        denominatedInSol,
        slippage: 10,
        priorityFee: 0.00001,
        pool: "pump",
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: `PumpPortal error: ${text}` },
        { status: response.status }
      );
    }

    // Return the raw transaction bytes to the client
    const buffer = await response.arrayBuffer();
    return new NextResponse(buffer, {
      status: 200,
      headers: { "Content-Type": "application/octet-stream" },
    });
  } catch (err) {
    console.error("trade route error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
