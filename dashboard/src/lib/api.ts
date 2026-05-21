const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5678/webhook";

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const apiKey = typeof window !== "undefined" ? localStorage.getItem("greevo_api_key") : "";
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { "Content-Type": "application/json", "X-API-Key": apiKey || "", ...options?.headers },
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export const api = {
  getDashboard: () => fetchAPI("/portal/dashboard"),
  getContacts: (page = 1, limit = 50, status?: string) =>
    fetchAPI(`/portal/contacts?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`),
  getKeywords: () => fetchAPI("/portal/keywords"),
  askAI: (question: string) => fetchAPI("/ai/ask", { method: "POST", body: JSON.stringify({ question }) }),
  generateEmail: (params: Record<string, string>) =>
    fetchAPI("/ai/generate-email", { method: "POST", body: JSON.stringify(params) }),
};
