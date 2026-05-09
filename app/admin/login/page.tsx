"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-shell min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="admin-display text-3xl">netbiz.ai</div>
          <div className="admin-marker-muted mt-1 text-[12px]">
            COMMAND CENTER
          </div>
        </div>

        <h1 className="admin-display text-4xl text-center mb-8">Sign in</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="admin-marker-muted block mb-2 text-[12px]">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input w-full"
            />
          </div>
          <div>
            <label className="admin-marker-muted block mb-2 text-[12px]">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input w-full"
            />
          </div>

          {error && (
            <div className="text-sm text-[#E85A4F] border border-[#E85A4F] rounded-[var(--admin-radius-sm)] px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="admin-btn-primary w-full mt-2 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
