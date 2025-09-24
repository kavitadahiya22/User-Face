// Comprehensive API client for cybersecurity microservices integration
import { 
  Incident, 
  Asset, 
  Vulnerability,
  ApiResponse,
  PaginatedResponse
} from '../types';

// Create and Update request types for missing interfaces
export interface CreateIncidentRequest {
  readonly title: string;
  readonly description: string;
  readonly severity: 'critical' | 'high' | 'medium' | 'low';
  readonly assigned_to?: string;
  readonly affected_assets?: readonly string[];
  readonly tags?: readonly string[];
}

export interface UpdateIncidentRequest {
  readonly title?: string;
  readonly description?: string;
  readonly severity?: 'critical' | 'high' | 'medium' | 'low';
  readonly status?: 'open' | 'investigating' | 'contained' | 'eradicated' | 'recovered' | 'closed';
  readonly assigned_to?: string;
  readonly affected_assets?: readonly string[];
  readonly tags?: readonly string[];
}

// API Configuration
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  apiKey?: string;
  authToken?: string;
}

// Error types for better error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(message: string = 'Request timeout') {
    super(message);
    this.name = 'TimeoutError';
  }
}

// Request interceptor types
export interface RequestInterceptor {
  onRequest?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  onError?: (error: Error) => Promise<never>;
}

export interface ResponseInterceptor {
  onResponse?: (response: any) => any | Promise<any>;
  onError?: (error: ApiError) => Promise<never>;
}

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
  retryAttempts?: number;
}

// Cache implementation for API responses
class ApiCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttl: number = 300000): void { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}

// Main API Client class
export class ApiClient {
  private config: ApiConfig;
  private cache: ApiCache;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(config: ApiConfig) {
    this.config = config;
    this.cache = new ApiCache();
  }

  // Interceptor management
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  // Core request method with retry logic and error handling
  async request<T>(config: RequestConfig): Promise<ApiResponse<T>> {
    const finalConfig = await this.applyRequestInterceptors(config);
    const cacheKey = this.getCacheKey(finalConfig);
    
    // Check cache for GET requests
    if (finalConfig.method === 'GET') {
      const cachedData = this.cache.get(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    let lastError: Error;
    const maxRetries = finalConfig.retryAttempts ?? this.config.retryAttempts;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await this.executeRequest<T>(finalConfig);
        
        // Cache successful GET responses
        if (finalConfig.method === 'GET') {
          this.cache.set(cacheKey, response);
        }

        return await this.applyResponseInterceptors(response);
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on client errors (4xx) or on last attempt
        if (error instanceof ApiError && error.status < 500) {
          throw error;
        }
        
        if (attempt === maxRetries) {
          throw error;
        }

        // Wait before retry with exponential backoff
        await this.delay(this.config.retryDelay * Math.pow(2, attempt));
      }
    }

    throw lastError!;
  }

  // Execute the actual HTTP request
  private async executeRequest<T>(config: RequestConfig): Promise<ApiResponse<T>> {
    const url = this.buildUrl(config.url, config.params);
    const headers = this.buildHeaders(config.headers);
    const timeout = config.timeout ?? this.config.timeout;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method: config.method,
        headers,
        body: config.data ? JSON.stringify(config.data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData.code,
          errorData
        );
      }

      const data = await response.json();
      return {
        success: true,
        data,
        message: 'Request successful'
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error && typeof error === 'object' && 'name' in error && error.name === 'AbortError') {
        throw new TimeoutError('Request timeout');
      }
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      throw new NetworkError('Network request failed', error instanceof Error ? error : undefined);
    }
  }

  // Helper methods
  private async applyRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
    let finalConfig = { ...config };
    
    for (const interceptor of this.requestInterceptors) {
      if (interceptor.onRequest) {
        finalConfig = await interceptor.onRequest(finalConfig);
      }
    }
    
    return finalConfig;
  }

  private async applyResponseInterceptors<T>(response: ApiResponse<T>): Promise<ApiResponse<T>> {
    let finalResponse = response;
    
    for (const interceptor of this.responseInterceptors) {
      if (interceptor.onResponse) {
        finalResponse = await interceptor.onResponse(finalResponse);
      }
    }
    
    return finalResponse;
  }

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.config.baseUrl);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  private buildHeaders(headers?: Record<string, string>): Record<string, string> {
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.config.apiKey) {
      defaultHeaders['X-API-Key'] = this.config.apiKey;
    }

    if (this.config.authToken) {
      defaultHeaders['Authorization'] = `Bearer ${this.config.authToken}`;
    }

    return { ...defaultHeaders, ...headers };
  }

  private getCacheKey(config: RequestConfig): string {
    const params = config.params ? new URLSearchParams(config.params).toString() : '';
    return `${config.method}:${config.url}${params ? '?' + params : ''}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Convenience methods
  async get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'GET', url, params });
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'POST', url, data });
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'PUT', url, data });
  }

  async patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'PATCH', url, data });
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'DELETE', url });
  }

  // Cache management
  clearCache(): void {
    this.cache.clear();
  }

  invalidateCache(pattern?: string): void {
    if (!pattern) {
      this.cache.clear();
      return;
    }

    // Simple pattern matching for cache invalidation
    this.cache['cache'].forEach((_, key) => {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    });
  }
}

// Cybersecurity-specific API services
export class IncidentService {
  constructor(private apiClient: ApiClient) {}

  async getIncidents(params?: {
    page?: number;
    limit?: number;
    severity?: string;
    status?: string;
    assignee?: string;
  }): Promise<PaginatedResponse<Incident>> {
    const response = await this.apiClient.get<PaginatedResponse<Incident>>('/incidents', params);
    return response.data;
  }

  async getIncident(id: string): Promise<Incident> {
    const response = await this.apiClient.get<Incident>(`/incidents/${id}`);
    return response.data;
  }

  async createIncident(data: CreateIncidentRequest): Promise<Incident> {
    const response = await this.apiClient.post<Incident>('/incidents', data);
    this.apiClient.invalidateCache('/incidents');
    return response.data;
  }

  async updateIncident(id: string, data: UpdateIncidentRequest): Promise<Incident> {
    const response = await this.apiClient.put<Incident>(`/incidents/${id}`, data);
    this.apiClient.invalidateCache('/incidents');
    return response.data;
  }

  async deleteIncident(id: string): Promise<void> {
    await this.apiClient.delete(`/incidents/${id}`);
    this.apiClient.invalidateCache('/incidents');
  }

  async assignIncident(id: string, assignee: string): Promise<Incident> {
    const response = await this.apiClient.patch<Incident>(`/incidents/${id}/assign`, { assignee });
    this.apiClient.invalidateCache('/incidents');
    return response.data;
  }

  async closeIncident(id: string, resolution: string): Promise<Incident> {
    const response = await this.apiClient.patch<Incident>(`/incidents/${id}/close`, { resolution });
    this.apiClient.invalidateCache('/incidents');
    return response.data;
  }
}

export class AlertService {
  constructor(private apiClient: ApiClient) {}

  async getAlerts(params?: {
    page?: number;
    limit?: number;
    severity?: string;
    status?: string;
    assignee?: string;
  }): Promise<PaginatedResponse<any>> {
    const response = await this.apiClient.get<PaginatedResponse<any>>('/alerts', params);
    return response.data;
  }

  async getAlert(id: string): Promise<any> {
    const response = await this.apiClient.get<any>(`/alerts/${id}`);
    return response.data;
  }

  async getThreatIntelligence(params?: {
    indicators?: string[];
    sources?: string[];
    confidence?: number;
  }): Promise<any[]> {
    const response = await this.apiClient.get<any[]>('/threat-intelligence', params);
    return response.data;
  }
}

export class AssetService {
  constructor(private apiClient: ApiClient) {}

  async getAssets(params?: {
    page?: number;
    limit?: number;
    type?: string;
    owner?: string;
    riskScore?: number;
  }): Promise<PaginatedResponse<Asset>> {
    const response = await this.apiClient.get<PaginatedResponse<Asset>>('/assets', params);
    return response.data;
  }

  async getAsset(id: string): Promise<Asset> {
    const response = await this.apiClient.get<Asset>(`/assets/${id}`);
    return response.data;
  }

  async scanAsset(id: string): Promise<{ scanId: string }> {
    const response = await this.apiClient.post<{ scanId: string }>(`/assets/${id}/scan`);
    this.apiClient.invalidateCache('/assets');
    return response.data;
  }
}

export class VulnerabilityService {
  constructor(private apiClient: ApiClient) {}

  async getVulnerabilities(params?: {
    page?: number;
    limit?: number;
    severity?: string;
    status?: string;
    assetId?: string;
  }): Promise<PaginatedResponse<Vulnerability>> {
    const response = await this.apiClient.get<PaginatedResponse<Vulnerability>>('/vulnerabilities', params);
    return response.data;
  }

  async getVulnerability(id: string): Promise<Vulnerability> {
    const response = await this.apiClient.get<Vulnerability>(`/vulnerabilities/${id}`);
    return response.data;
  }

  async patchVulnerability(id: string): Promise<Vulnerability> {
    const response = await this.apiClient.patch<Vulnerability>(`/vulnerabilities/${id}/patch`);
    this.apiClient.invalidateCache('/vulnerabilities');
    return response.data;
  }
}

// API client factory with default configuration
export const createApiClient = (config: Partial<ApiConfig> = {}): ApiClient => {
  const defaultConfig: ApiConfig = {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
    ...config,
  };

  const apiClient = new ApiClient(defaultConfig);

  // Add default interceptors
  apiClient.addRequestInterceptor({
    onRequest: (config) => {
      console.log(`[API] ${config.method} ${config.url}`);
      return config;
    },
    onError: async (error) => {
      console.error('[API] Request failed:', error);
      throw error;
    },
  });

  apiClient.addResponseInterceptor({
    onResponse: (response) => {
      console.log(`[API] Response received:`, response.status);
      return response;
    },
    onError: async (error) => {
      console.error('[API] Response error:', error);
      
      // Handle specific error cases
      if (error.status === 401) {
        // Handle unauthorized - redirect to login
        window.location.href = '/login';
      }
      
      throw error;
    },
  });

  return apiClient;
};

// Service factory
export const createServices = (apiClient: ApiClient) => ({
  incidents: new IncidentService(apiClient),
  alerts: new AlertService(apiClient),
  assets: new AssetService(apiClient),
  vulnerabilities: new VulnerabilityService(apiClient),
});

// Default API client instance
export const apiClient = createApiClient();
export const services = createServices(apiClient);

export default {
  ApiClient,
  createApiClient,
  createServices,
  apiClient,
  services,
  ApiError,
  NetworkError,
  TimeoutError,
};