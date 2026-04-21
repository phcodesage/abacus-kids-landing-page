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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  try {
    await connectDB();
    const payment = await ZellePayment.findById(id);
    if (!payment) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ payment });
  } catch (err) {
    console.error("[admin/payments/[id] GET]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const { status, adminNote } = body;

    if (!["pending", "verified", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    await connectDB();
    const payment = await ZellePayment.findByIdAndUpdate(
      id,
      { status, ...(adminNote !== undefined ? { adminNote } : {}) },
      { new: true, select: "-screenshotBase64" }
    );

    if (!payment) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    return NextResponse.json({ payment });
  } catch (err) {
    console.error("[admin/payments/[id] PATCH]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
