import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ZellePayment from "@/models/ZellePayment";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) return false;
  const decoded = Buffer.from(auth.slice(6), "base64").toString("utf-8");
  const [user, pass] = decoded.split(":");
  return user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    // Exclude large base64 screenshot from list view
    const payments = await ZellePayment.find(
      {},
      { screenshotBase64: 0 }
    ).sort({ createdAt: -1 });

    return NextResponse.json({ payments });
  } catch (err) {
    console.error("[admin/payments GET]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
