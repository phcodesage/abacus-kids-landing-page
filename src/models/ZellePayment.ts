import mongoose, { Schema, Document, Model } from "mongoose";

export interface IZellePayment extends Document {
  name: string;
  phone: string;
  reference: string;
  courseName: string;
  amount: string;
  screenshotBase64?: string;
  screenshotMimeType?: string;
  status: "pending" | "verified" | "rejected";
  adminNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ZellePaymentSchema = new Schema<IZellePayment>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    reference: { type: String, required: true, trim: true },
    courseName: { type: String, required: true },
    amount: { type: String, required: true },
    screenshotBase64: { type: String },
    screenshotMimeType: { type: String },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    adminNote: { type: String },
  },
  { timestamps: true }
);

const ZellePayment: Model<IZellePayment> =
  mongoose.models.ZellePayment ||
  mongoose.model<IZellePayment>("ZellePayment", ZellePaymentSchema);

export default ZellePayment;
