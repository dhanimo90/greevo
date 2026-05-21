"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("gv_****************************");

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and integrations</p>
      </div>

      {/* API Key */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="font-semibold text-gray-700 mb-4">API Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">API Key</label>
            <div className="flex gap-2">
              <input type="text" value={apiKey} readOnly className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono" />
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Copy</button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Use this key in X-API-Key header for all API calls</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">n8n Webhook URL</label>
            <input type="text" defaultValue="https://n8n.yourdomain.com/webhook" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="font-semibold text-gray-700 mb-4">Integrations</h2>
        <div className="space-y-3">
          {[
            { name: "HubSpot", status: "connected", icon: "🟠" },
            { name: "SendGrid", status: "connected", icon: "📧" },
            { name: "Slack", status: "connected", icon: "💬" },
            { name: "Google Analytics", status: "connected", icon: "📊" },
            { name: "Ahrefs", status: "connected", icon: "🔍" },
            { name: "WhatsApp", status: "not_connected", icon: "📱" },
            { name: "Salesforce", status: "not_connected", icon: "☁️" },
          ].map((int) => (
            <div key={int.name} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span className="text-xl">{int.icon}</span>
                <span className="font-medium text-gray-700">{int.name}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${int.status === "connected" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                {int.status === "connected" ? "✓ Connected" : "Not connected"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="font-semibold text-gray-700 mb-4">Notification Preferences</h2>
        <div className="space-y-3">
          {["New leads", "Hot lead alerts", "Deal stage changes", "SEO ranking changes", "System errors"].map((pref) => (
            <label key={pref} className="flex items-center justify-between py-1 cursor-pointer">
              <span className="text-sm text-gray-700">{pref}</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-600 rounded" />
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
