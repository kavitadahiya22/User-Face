const API_BASE_URL = 'http://localhost:8000'

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  // Get token from localStorage for now (not ideal, but simpler for demo)
  const token = localStorage.getItem('cybrty_token')
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  })
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }
  
  return response.json()
}

// Dashboard API
export const dashboardApi = {
  getKPIs: () => apiRequest('/api/v1/dashboard/kpis'),
  getRecentAlerts: (limit = 5) => apiRequest(`/api/v1/dashboard/recent-alerts?limit=${limit}`),
}

// Assets API
export const assetsApi = {
  getAssets: (params: any = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value))
      }
    })
    return apiRequest(`/api/v1/assets?${searchParams}`)
  },
  getAsset: (id: string) => apiRequest(`/api/v1/assets/${id}`),
}

// Vulnerabilities API
export const vulnerabilitiesApi = {
  getVulnerabilities: (params: any = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value))
      }
    })
    return apiRequest(`/api/v1/vulns?${searchParams}`)
  },
}

// Alerts API
export const alertsApi = {
  getAlerts: (params: any = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value))
      }
    })
    return apiRequest(`/api/v1/alerts?${searchParams}`)
  },
}

// Incidents API
export const incidentsApi = {
  getIncidents: (params: any = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value))
      }
    })
    return apiRequest(`/api/v1/incidents?${searchParams}`)
  },
}

// Identity API
export const identityApi = {
  getUsers: (params: any = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value))
      }
    })
    return apiRequest(`/api/v1/identity/users?${searchParams}`)
  },
}

// Reports API
export const reportsApi = {
  getReports: () => apiRequest('/api/v1/reports'),
}

// Settings API
export const settingsApi = {
  getSystemSettings: () => apiRequest('/api/v1/settings/system'),
}
