"use client";
import { useState, useEffect, useCallback } from "react";
import {
  LogOut, RefreshCw, CheckCircle, XCircle, Clock,
  Eye, EyeOff, X, Download, ExternalLink, Shield, Search, ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface Payment {
  _id: string;
  name: string;
  phone: string;
  reference: string;
  courseName: string;
  amount: string;
  status: "pending" | "verified" | "rejected";
  adminNote?: string;
  createdAt: string;
}

interface PaymentWithScreenshot extends Payment {
  screenshotBase64?: string;
  screenshotMimeType?: string;
}

function makeAuthHeader(user: string, pass: string) {
  return "Basic " + btoa(`${user}:${pass}`);
}

const STATUS_CONFIG = {
  pending:  { label: "Pending",  bg: "bg-amber-500/20",  text: "text-amber-300",  icon: Clock },
  verified: { label: "Verified", bg: "bg-green-500/20",  text: "text-green-300",  icon: CheckCircle },
  rejected: { label: "Rejected", bg: "bg-red-500/20",    text: "text-red-300",    icon: XCircle },
};

// ── Login screen ──────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: (u: string, p: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        onLogin(username, password);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Back to Home Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-3xl inline-block shadow-xl border border-gray-100 mb-6">
            <img 
              src="/exceed-logo.png" 
              alt="Exceed Learning Center Logo" 
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Secure Management Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#080f1e] border border-gray-200/50 rounded-3xl p-8 space-y-5 shadow-2xl">
          <div>
            <label className="text-xs font-bold text-white/50 uppercase tracking-wider block mb-1.5">Username</label>
            <input
              required value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-[#ca3433]/60 focus:ring-2 focus:ring-[#ca3433]/20 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <label className="text-xs font-bold text-white/50 uppercase tracking-wider block mb-1.5">Password</label>
            <div className="relative">
              <input
                required 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:border-[#ca3433]/60 focus:ring-2 focus:ring-[#ca3433]/20 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-white/20 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">{error}</p>
          )}
          <button
            type="submit" disabled={loading}
            className="w-full py-3 rounded-xl bg-[#ca3433] hover:bg-[#a02828] text-white font-bold transition-all transform active:scale-[0.98] disabled:opacity-60 shadow-lg shadow-[#ca3433]/20"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Screenshot modal ──────────────────────────────────────────
function ScreenshotModal({
  payment, authHeader, onClose,
}: {
  payment: Payment;
  authHeader: string;
  onClose: () => void;
}) {
  const [data, setData] = useState<PaymentWithScreenshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/payments/${payment._id}`, {
      headers: { Authorization: authHeader },
    })
      .then((r) => r.json())
      .then((d) => setData(d.payment))
      .finally(() => setLoading(false));
  }, [payment._id, authHeader]);

  const imgSrc = data?.screenshotBase64
    ? `data:${data.screenshotMimeType || "image/jpeg"};base64,${data.screenshotBase64}`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#0d1829] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <div>
            <p className="font-bold text-white">{data?.name || payment.name}</p>
            <p className="text-xs text-white/40">{payment.courseName} · {payment.amount}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: "Phone", value: payment.phone },
              { label: "Reference", value: payment.reference },
              { label: "Status", value: payment.status },
              { label: "Submitted", value: new Date(payment.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" }) },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs mb-0.5">{label}</p>
                <p className="text-white font-semibold capitalize">{value}</p>
              </div>
            ))}
          </div>

          {/* Screenshot */}
          <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <div className="w-6 h-6 border-2 border-[#ca3433] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : imgSrc ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgSrc} alt="Payment screenshot" className="w-full object-contain max-h-96" />
                <div className="flex gap-2 p-3 border-t border-white/10">
                  <a
                    href={imgSrc} download="zelle-screenshot.jpg"
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                  <a
                    href={imgSrc} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Open Tab
                  </a>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-32 text-white/30 text-sm">No screenshot uploaded</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────
export default function AdminPage() {
  const [creds, setCreds] = useState<{ user: string; pass: string } | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selected, setSelected] = useState<Payment | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "verified" | "rejected">("all");

  const authHeader = creds ? makeAuthHeader(creds.user, creds.pass) : "";

  const fetchPayments = useCallback(async () => {
    if (!creds) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/payments", {
        headers: { Authorization: authHeader },
      });
      const data = await res.json();
      if (res.ok) setPayments(data.payments || []);
    } finally {
      setLoading(false);
    }
  }, [creds, authHeader]);

  useEffect(() => {
    if (creds) fetchPayments();
  }, [creds, fetchPayments]);

  async function updateStatus(id: string, status: "verified" | "rejected") {
    setActionLoading(id + status);
    try {
      const res = await fetch(`/api/admin/payments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: authHeader },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setPayments((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status } : p))
        );
      }
    } finally {
      setActionLoading(null);
    }
  }

  if (!creds) {
    return <LoginScreen onLogin={(u, p) => setCreds({ user: u, pass: p })} />;
  }

  const filtered = payments.filter((p) => {
    const matchFilter = filter === "all" || p.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.phone.includes(q) || p.reference.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const counts = {
    total: payments.length,
    pending: payments.filter((p) => p.status === "pending").length,
    verified: payments.filter((p) => p.status === "verified").length,
    rejected: payments.filter((p) => p.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-[#080f1e] text-white">
      {/* Screenshot modal */}
      {selected && (
        <ScreenshotModal
          payment={selected}
          authHeader={authHeader}
          onClose={() => setSelected(null)}
        />
      )}

      {/* Top bar */}
      <header className="border-b border-white/10 bg-[#0d1829]/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ca3433]/20 border border-[#ca3433]/30 flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#ca3433]" />
            </div>
            <div>
              <span className="font-black text-white text-sm">Admin Dashboard</span>
              <span className="text-white/30 text-xs ml-2 hidden sm:inline">Abacus Program</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchPayments}
              disabled={loading}
              className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all disabled:opacity-40"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={() => setCreds(null)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all text-sm"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total",    value: counts.total,    color: "text-white",        border: "border-white/10" },
            { label: "Pending",  value: counts.pending,  color: "text-amber-300",    border: "border-amber-500/20" },
            { label: "Verified", value: counts.verified, color: "text-green-300",    border: "border-green-500/20" },
            { label: "Rejected", value: counts.rejected, color: "text-red-300",      border: "border-red-500/20" },
          ].map(({ label, value, color, border }) => (
            <div key={label} className={`bg-white/5 border ${border} rounded-2xl p-4`}>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">{label}</p>
              <p className={`text-3xl font-black ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filters + search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, or reference…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 outline-none focus:border-[#ca3433]/60 transition-all text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["all", "pending", "verified", "rejected"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold border capitalize transition-all ${
                  filter === f
                    ? "bg-[#ca3433] border-[#ca3433] text-white"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table / cards */}
        {loading && payments.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-[#ca3433] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-white/30">
            <p className="text-lg font-semibold">No payments found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-3 font-semibold">Name</th>
                    <th className="text-left px-5 py-3 font-semibold">Course</th>
                    <th className="text-left px-5 py-3 font-semibold">Amount</th>
                    <th className="text-left px-5 py-3 font-semibold">Reference</th>
                    <th className="text-left px-5 py-3 font-semibold">Date</th>
                    <th className="text-left px-5 py-3 font-semibold">Status</th>
                    <th className="text-left px-5 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => {
                    const cfg = STATUS_CONFIG[p.status];
                    const Icon = cfg.icon;
                    return (
                      <tr
                        key={p._id}
                        className={`border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}
                        onClick={() => setSelected(p)}
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-white">{p.name}</p>
                          <p className="text-white/40 text-xs">{p.phone}</p>
                        </td>
                        <td className="px-5 py-4 text-white/70">{p.courseName}</td>
                        <td className="px-5 py-4 font-bold text-green-300">{p.amount}</td>
                        <td className="px-5 py-4 text-white/60 font-mono text-xs">{p.reference}</td>
                        <td className="px-5 py-4 text-white/40 text-xs">
                          {new Date(p.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.text}`}>
                            <Icon className="w-3 h-3" /> {cfg.label}
                          </span>
                        </td>
                        <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setSelected(p)}
                              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                              title="View screenshot"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {p.status !== "verified" && (
                              <button
                                disabled={actionLoading === p._id + "verified"}
                                onClick={() => updateStatus(p._id, "verified")}
                                className="px-2.5 py-1 rounded-lg bg-green-500/20 hover:bg-green-500/40 text-green-300 text-xs font-bold transition-all disabled:opacity-40"
                              >
                                {actionLoading === p._id + "verified" ? "…" : "Verify"}
                              </button>
                            )}
                            {p.status !== "rejected" && (
                              <button
                                disabled={actionLoading === p._id + "rejected"}
                                onClick={() => updateStatus(p._id, "rejected")}
                                className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs font-bold transition-all disabled:opacity-40"
                              >
                                {actionLoading === p._id + "rejected" ? "…" : "Reject"}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((p) => {
                const cfg = STATUS_CONFIG[p.status];
                const Icon = cfg.icon;
                return (
                  <div
                    key={p._id}
                    onClick={() => setSelected(p)}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 cursor-pointer hover:bg-white/[0.08] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-white">{p.name}</p>
                        <p className="text-white/40 text-xs">{p.phone}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.text}`}>
                        <Icon className="w-3 h-3" /> {cfg.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-white/50 mb-3">
                      <span>{p.courseName}</span>
                      <span className="text-green-300 font-bold">{p.amount}</span>
                      <span className="font-mono">{p.reference}</span>
                      <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelected(p)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white text-xs font-semibold transition-all"
                      >
                        <Eye className="w-3 h-3" /> View
                      </button>
                      {p.status !== "verified" && (
                        <button
                          disabled={actionLoading === p._id + "verified"}
                          onClick={() => updateStatus(p._id, "verified")}
                          className="flex-1 py-1.5 rounded-lg bg-green-500/20 hover:bg-green-500/40 text-green-300 text-xs font-bold transition-all disabled:opacity-40"
                        >
                          Verify
                        </button>
                      )}
                      {p.status !== "rejected" && (
                        <button
                          disabled={actionLoading === p._id + "rejected"}
                          onClick={() => updateStatus(p._id, "rejected")}
                          className="flex-1 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs font-bold transition-all disabled:opacity-40"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
