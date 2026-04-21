import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ZellePayment from "@/models/ZellePayment";

export const config = {
  api: { bodyParser: false },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const reference = formData.get("reference") as string;
    const courseName = formData.get("courseName") as string;
    const amount = formData.get("amount") as string;
    const file = formData.get("screenshot") as File | null;

    if (!name || !phone || !reference || !courseName || !amount) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    let screenshotBase64: string | undefined;
    let screenshotMimeType: string | undefined;

    if (file && file.size > 0) {
      // Limit to 8MB
      if (file.size > 8 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Screenshot must be smaller than 8MB." },
          { status: 400 }
        );
      }
      const buffer = await file.arrayBuffer();
      screenshotBase64 = Buffer.from(buffer).toString("base64");
      screenshotMimeType = file.type || "image/jpeg";
    }

    await connectDB();

    const payment = await ZellePayment.create({
      name,
      phone,
      reference,
      courseName,
      amount,
      screenshotBase64,
      screenshotMimeType,
      status: "pending",
    });

    return NextResponse.json({ success: true, id: payment._id });
  } catch (err) {
    console.error("[zelle-payment POST]", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
