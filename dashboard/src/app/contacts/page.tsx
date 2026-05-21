"use client";
import { useState } from "react";
import { DataTable } from "@/components/data-table";

const demoContacts = [
  { id: 1, email: "john@acme.co.id", first_name: "John", last_name: "Doe", company: "PT Acme", lead_score: 85, lead_status: "qualified", source: "website" },
  { id: 2, email: "jane@globex.com", first_name: "Jane", last_name: "Smith", company: "Globex Corp", lead_score: 72, lead_status: "contacted", source: "referral" },
  { id: 3, email: "budi@startup.id", first_name: "Budi", last_name: "Santoso", company: "StartupID", lead_score: 91, lead_status: "customer", source: "event" },
  { id: 4, email: "siti@enterprise.co", first_name: "Siti", last_name: "Rahayu", company: "Enterprise Co", lead_score: 45, lead_status: "new", source: "social" },
  { id: 5, email: "alex@techfirm.io", first_name: "Alex", last_name: "Wong", company: "TechFirm", lead_score: 68, lead_status: "opportunity", source: "website" },
];

const statusColors: Record<string, string> = {
  new: "bg-gray-100 text-gray-700",
  contacted: "bg-blue-100 text-blue-700",
  qualified: "bg-purple-100 text-purple-700",
  opportunity: "bg-yellow-100 text-yellow-700",
  customer: "bg-green-100 text-green-700",
  lost: "bg-red-100 text-red-700",
};

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = demoContacts.filter((c) => {
    const matchSearch = !search || c.email.includes(search) || c.first_name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.lead_status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-500 mt-1">{demoContacts.length} total contacts</p>
        </div>
        <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors">
          + Add Contact
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search by name, email, company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-sm px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="opportunity">Opportunity</option>
          <option value="customer">Customer</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <DataTable
          data={filtered}
          columns={[
            { key: "first_name" as never, label: "Name", render: (_, row: typeof demoContacts[0]) => <span className="font-medium">{row.first_name} {row.last_name}</span> },
            { key: "email" as never, label: "Email" },
            { key: "company" as never, label: "Company" },
            { key: "lead_score" as never, label: "Score", render: (v) => <span className="font-semibold">{String(v)}</span> },
            { key: "lead_status" as never, label: "Status", render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[String(v)] || ""}`}>{String(v)}</span> },
            { key: "source" as never, label: "Source" },
          ]}
        />
      </div>
    </div>
  );
}
