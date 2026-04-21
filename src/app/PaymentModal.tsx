"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  CreditCard,
  Banknote,
  Send,
  CheckCircle2,
  Upload,
  ImageIcon,
} from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  cashPrice: string;
  cardPrice: string;
  stripeLink: string;
  // Optional: pass lenis instance from parent to stop/start smooth scroll
  lenisRef?: React.RefObject<{ stop: () => void; start: () => void } | null>;
}

export function calcCardPrice(priceStr: string): string {
  const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return priceStr;
  return "$" + (num * 1.04).toFixed(2);
}

export default function PaymentModal({
  isOpen,
  onClose,
  courseName,
  cashPrice,
  cardPrice,
  stripeLink,
  lenisRef,
}: PaymentModalProps) {
  const [step, setStep] = useState<"choose" | "zelle" | "done">("choose");
  const [form, setForm] = useState({ name: "", phone: "", reference: "" });
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll and stop Lenis when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenisRef?.current?.stop();
    } else {
      document.body.style.overflow = "";
      lenisRef?.current?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenisRef?.current?.start();
    };
  }, [isOpen, lenisRef]);

  if (!isOpen) return null;

  function handleClose() {
    setStep("choose");
    setForm({ name: "", phone: "", reference: "" });
    setScreenshot(null);
    setScreenshotPreview(null);
    setDragging(false);
    setLoading(false);
    setError(null);
    onClose();
  }

  function handleCardPay() {
    window.open(stripeLink, "_blank", "noopener,noreferrer");
    handleClose();
  }

  function handleFileSelect(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, etc.).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Screenshot must be smaller than 8MB.");
      return;
    }
    setError(null);
    setScreenshot(file);
    const reader = new FileReader();
    reader.onload = (e) => setScreenshotPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }

  async function handleZelleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("phone", form.phone);
      fd.append("reference", form.reference);
      fd.append("courseName", courseName);
      fd.append("amount", cashPrice);
      if (screenshot) fd.append("screenshot", screenshot);

      const res = await fetch("/api/zelle-payment", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setStep("done");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      style={{ animation: "fadeIn 0.2s ease" }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col"
        style={{ maxHeight: "90dvh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b bg-[#05264d] rounded-t-3xl flex-shrink-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Payment Options
            </p>
            <h2 className="text-lg font-bold text-white mt-0.5">{courseName}</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Price Note Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex flex-col gap-1 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-800">
            <Banknote className="w-4 h-4 shrink-0" />
            Cash (Zelle): <span className="text-green-700">{cashPrice}</span>
            <span className="text-amber-600 font-normal">— no extra fee</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-800">
            <CreditCard className="w-4 h-4 shrink-0" />
            Card: <span className="text-[#d53033]">{cardPrice}</span>
            <span className="text-amber-600 font-normal">— includes 4% processing fee</span>
          </div>
        </div>

        {/* Scrollable body — data-lenis-prevent tells Lenis to ignore scroll events here */}
        <div
          key={step}
          className="p-6 overflow-y-auto flex-1"
          data-lenis-prevent
          style={{ overscrollBehavior: "contain" }}
        >
          {/* STEP: Choose */}
          {step === "choose" && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Choose your preferred payment method below.
              </p>
              <button
                onClick={() => setStep("zelle")}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-green-200 bg-green-50 hover:border-green-400 hover:bg-green-100 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
                  <Banknote className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">Pay with Cash (Zelle)</p>
                  <p className="text-sm text-gray-600">
                    Send <strong className="text-green-700">{cashPrice}</strong> to{" "}
                    <span className="text-green-700 font-medium">payments@exceedlearningcenterny.com</span>
                  </p>
                </div>
              </button>

              <button
                onClick={handleCardPay}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-blue-200 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#05264d] flex items-center justify-center shrink-0">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900">Pay by Card (Stripe)</p>
                  <p className="text-sm text-gray-600">
                    <strong className="text-[#d53033]">{cardPrice}</strong>{" "}
                    <span className="text-gray-500">(includes 4% processing fee)</span>
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* STEP: Zelle form */}
          {step === "zelle" && (
            <div>
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-2xl text-sm text-green-800">
                <p className="font-bold mb-1">How to pay via Zelle:</p>
                <ol className="list-decimal list-inside space-y-1 text-green-700">
                  <li>Open your banking app and go to Zelle</li>
                  <li>
                    Send <strong>{cashPrice}</strong> to{" "}
                    <strong>payments@exceedlearningcenterny.com</strong>
                  </li>
                  <li>Take a screenshot of your payment confirmation</li>
                  <li>Fill in the form below to confirm your enrollment</li>
                </ol>
              </div>

              <form onSubmit={handleZelleSubmit} className="space-y-3">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#05264d] uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-[#05264d]"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#05264d] uppercase tracking-wider">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="(555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-[#05264d]"
                  />
                </div>

                {/* Reference */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#05264d] uppercase tracking-wider">
                    Zelle Reference / Confirmation Number *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.reference}
                    onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value }))}
                    placeholder="e.g. ZL123456789"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-[#05264d]"
                  />
                </div>

                {/* Screenshot Upload */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#05264d] uppercase tracking-wider">
                    Payment Screenshot <span className="text-gray-400 font-normal normal-case">(recommended)</span>
                  </label>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative w-full rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden ${
                      dragging
                        ? "border-green-400 bg-green-50"
                        : screenshotPreview
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 bg-gray-50 hover:border-green-300 hover:bg-green-50/50"
                    }`}
                  >
                    {screenshotPreview ? (
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={screenshotPreview}
                          alt="Payment screenshot preview"
                          className="w-full max-h-40 object-contain p-2"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 flex items-center justify-center transition-all opacity-0 hover:opacity-100">
                          <p className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-full">
                            Click to replace
                          </p>
                        </div>
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Added
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-6 px-4">
                        {dragging ? (
                          <Upload className="w-8 h-8 text-green-500" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-gray-300" />
                        )}
                        <div className="text-center">
                          <p className="text-sm font-semibold text-gray-600">
                            {dragging ? "Drop to upload" : "Upload screenshot"}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Drag & drop or click · JPG, PNG up to 8MB
                          </p>
                        </div>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileSelect(f);
                      }}
                    />
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                    {error}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep("choose")}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    disabled={loading}
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-green-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-700 transition-colors disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? "Submitting…" : "Confirm Zelle Payment"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP: Done */}
          {step === "done" && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Zelle Payment Confirmed!
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Thank you, <strong>{form.name}</strong>! We have received your Zelle payment
                confirmation. Our team will verify your payment and send you enrollment details
                shortly.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-3 rounded-xl bg-[#05264d] text-white font-bold text-sm hover:bg-[#05264d]/90 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
