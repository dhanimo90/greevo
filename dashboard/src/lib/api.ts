const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

function getApiKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("greevo_api_key") || "";
}

async function fetchAPI<T = unknown>(endpoint: string, options?: RequestInit): Promise<T> {
  const apiKey = getApiKey();
  const url = API_BASE ? `${API_BASE}${endpoint}` : endpoint;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
        ...options?.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error);
    throw error;
  }
}

// Dashboard
export async function getDashboard() {
  return fetchAPI("/portal/dashboard");
}

// Contacts
export async function getContacts(page = 1, limit = 50, status?: string, search?: string) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (status && status !== "all") params.set("status", status);
  if (search) params.set("search", search);
  return fetchAPI(`/portal/contacts?${params}`);
}

// Keywords
export async function getKeywords() {
  return fetchAPI("/portal/keywords");
}

// AI
export async function askAI(question: string) {
  return fetchAPI("/ai/ask", {
    method: "POST",
    body: JSON.stringify({ question }),
  });
}

export async function generateEmail(params: Record<string, string>) {
  return fetchAPI("/ai/generate-email", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

// Reports
export async function generateReportLink(reportType: string, title: string) {
  return fetchAPI("/reports/generate", {
    method: "POST",
    body: JSON.stringify({ report_type: reportType, title }),
  });
}
