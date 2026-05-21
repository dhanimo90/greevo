"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setApiKey(localStorage.getItem("greevo_api_key") || "");
    setApiUrl(localStorage.getItem("greevo_api_url") || process.env.NEXT_PUBLIC_API_URL || "");
  }, []);

  const handleSave = () => {
    localStorage.setItem("greevo_api_key", apiKey);
    if (apiUrl) localStorage.setItem("greevo_api_url", apiUrl);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("greevo_logged_in");
    localStorage.removeItem("greevo_api_key");
    router.push("/login");
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account and integrations</p>
      </div>

      {/* API Configuration */}
      <section className="card card-body space-y-4">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200">API Configuration</h2>
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">API Key</label>
          <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="input-field font-mono text-xs" placeholder="gv_your_api_key" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Backend URL (n8n Webhook)</label>
          <input type="text" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} className="input-field" placeholder="https://your-n8n.com/webhook" />
          <p className="text-xs text-gray-400 mt-1">Leave empty to use demo mode</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSave} className="btn-primary text-sm">Save Settings</button>
          {saved && <span className="text-sm text-emerald-600 font-medium">✓ Saved!</span>}
        </div>
      </section>

      {/* Integrations */}
      <section className="card card-body space-y-3">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200">Integrations</h2>
        {[
          { name: "HubSpot CRM", status: "connected", icon: "🟠" },
          { name: "SendGrid Email", status: "connected", icon: "📧" },
          { name: "Slack", status: "connected", icon: "💬" },
          { name: "Google Analytics 4", status: "connected", icon: "📊" },
          { name: "Ahrefs SEO", status: "connected", icon: "🔍" },
          { name: "OpenAI", status: "connected", icon: "🤖" },
          { name: "WhatsApp Business", status: "not_connected", icon: "📱" },
          { name: "Stripe Billing", status: "not_connected", icon: "💳" },
        ].map((item) => (
          <div key={item.name} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.name}</span>
            </div>
            <span className={`badge ${item.status === "connected" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}>
              {item.status === "connected" ? "✓ Connected" : "Not connected"}
            </span>
          </div>
        ))}
      </section>

      {/* Account */}
      <section className="card card-body space-y-4">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200">Account</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Logout</p>
            <p className="text-xs text-gray-400">Sign out from this device</p>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}
