"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!apiKey.startsWith("gv_") || apiKey.length < 10) {
      setError("Invalid API key format. Must start with gv_");
      setLoading(false);
      return;
    }

    localStorage.setItem("greevo_api_key", apiKey);
    localStorage.setItem("greevo_logged_in", "true");
    router.push("/");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1B1D2A] p-4">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#6C5CE7] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <h1 className="text-xl font-bold text-white">Welcome to GreeVo</h1>
          <p className="text-[#8B8FA3] mt-1.5 text-[13px]">Enterprise CRM, Marketing & SEO Platform</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white dark:bg-[#22252F] rounded-2xl p-7 shadow-xl border border-[#E8ECF4] dark:border-[#2E3140]">
          <div className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-2">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="gv_your_api_key_here"
                className="input-field"
                required
              />
              <p className="text-[11px] text-gray-400 mt-1.5">Enter your GreeVo API key to access the dashboard</p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[12px] px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading || !apiKey} className="w-full btn-primary py-3 disabled:opacity-50">
              {loading ? "Connecting..." : "Login"}
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-[#E8ECF4] dark:border-[#2E3140]">
            <p className="text-[11px] text-gray-400 text-center">
              Demo: <code className="bg-[#F8F9FC] dark:bg-[#1A1D26] px-2 py-0.5 rounded text-[#6C5CE7] font-mono">gv_demo_key_12345</code>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
