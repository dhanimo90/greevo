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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-xl shadow-brand-500/30 mx-auto mb-4">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome to GreeVo</h1>
          <p className="text-brand-200/60 mt-2 text-sm">Enterprise CRM, Marketing & SEO Platform</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="gv_your_api_key_here"
                className="input-field"
                required
              />
              <p className="text-xs text-gray-400 mt-1.5">Enter your GreeVo API key to access the dashboard</p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !apiKey}
              className="w-full btn-primary py-3 text-base disabled:opacity-50"
            >
              {loading ? "Connecting..." : "Login"}
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-400 text-center">
              Demo key: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">gv_demo_key_12345</code>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
