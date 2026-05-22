"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

      if (apiUrl) {
        // Production: authenticate via n8n backend
        const res = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setError(data.message || "Email atau password salah");
          setLoading(false);
          return;
        }

        localStorage.setItem("greevo_api_key", data.api_key || data.token);
        localStorage.setItem("greevo_user", JSON.stringify({
          email: data.email || email,
          name: data.name || email.split("@")[0],
          role: data.role || "viewer",
          company: data.company || "",
        }));
      } else {
        // Demo mode: accept any valid-looking credentials
        if (!email.includes("@") || password.length < 4) {
          setError("Email atau password tidak valid");
          setLoading(false);
          return;
        }

        localStorage.setItem("greevo_api_key", "gv_demo_session");
        localStorage.setItem("greevo_user", JSON.stringify({
          email,
          name: email.split("@")[0],
          role: "admin",
          company: "Demo Company",
        }));
      }

      localStorage.setItem("greevo_logged_in", "true");
      router.push("/");
    } catch {
      setError("Tidak bisa terhubung ke server. Coba lagi.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1B1D2A] p-4">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#6C5CE7] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <h1 className="text-xl font-bold text-white">Masuk ke GreeVo</h1>
          <p className="text-[#8B8FA3] mt-1.5 text-[13px]">Enterprise CRM, Marketing & SEO Platform</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-white dark:bg-[#22252F] rounded-2xl p-7 shadow-xl border border-[#E8ECF4] dark:border-[#2E3140]">
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@perusahaan.com"
                className="input-field"
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
                required
                autoComplete="current-password"
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#6C5CE7] focus:ring-[#6C5CE7]" />
                <span className="text-[12px] text-gray-500">Ingat saya</span>
              </label>
              <button type="button" className="text-[12px] text-[#6C5CE7] font-medium hover:underline">
                Lupa password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[12px] px-4 py-3 rounded-xl flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading || !email || !password} className="w-full btn-primary py-3 disabled:opacity-50">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Masuk...
                </span>
              ) : "Masuk"}
            </button>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 pt-5 border-t border-[#E8ECF4] dark:border-[#2E3140]">
            <p className="text-[11px] text-gray-400 text-center mb-2">Demo credentials:</p>
            <div className="bg-[#F8F9FC] dark:bg-[#1A1D26] rounded-xl p-3 space-y-1">
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Email: <code className="text-[#6C5CE7] font-mono">admin@demo.com</code>
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Password: <code className="text-[#6C5CE7] font-mono">demo1234</code>
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-[11px] text-[#8B8FA3] mt-6">
          © 2026 GreeVo. All rights reserved.
        </p>
      </div>
    </div>
  );
}
