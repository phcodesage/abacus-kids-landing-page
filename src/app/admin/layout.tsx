import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard — Abacus Program",
  description: "Manage Zelle payment submissions.",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
