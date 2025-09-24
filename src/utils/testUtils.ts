import React from 'react';

// Mock testing utilities for cybersecurity application testing

// Test data factories for cybersecurity entities
export const createMockIncident = (overrides = {}) => ({
  id: 'INC-001',
  title: 'Suspicious Network Activity',
  description: 'Unusual outbound traffic detected from workstation',
  severity: 'high' as const,
  status: 'open' as const,
  assignee: 'security-analyst-1',
  createdAt: new Date('2024-01-15T10:30:00Z'),
  updatedAt: new Date('2024-01-15T14:45:00Z'),
  source: 'SIEM',
  category: 'malware',
  affectedAssets: ['WS-001', 'SRV-002'],
  timeline: [
    {
      timestamp: new Date('2024-01-15T10:30:00Z'),
      action: 'Incident Created',
      user: 'system',
      details: 'Automated detection from SIEM'
    }
  ],
  ...overrides,
});

export const createMockThreat = (overrides = {}) => ({
  id: 'THR-001',
  name: 'Malware Detection',
  type: 'malware',
  severity: 'critical' as const,
  status: 'active' as const,
  description: 'Potential malware detected on network',
  indicators: [
    { type: 'ip', value: '192.168.1.100' },
    { type: 'hash', value: 'a1b2c3d4e5f6' }
  ],
  firstSeen: new Date('2024-01-15T09:00:00Z'),
  lastSeen: new Date('2024-01-15T15:00:00Z'),
  confidence: 85,
  source: 'EDR',
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  id: 'user-001',
  username: 'john.doe',
  email: 'john.doe@company.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'security-analyst',
  department: 'Security',
  isActive: true,
  lastLogin: new Date('2024-01-15T08:00:00Z'),
  permissions: ['incidents.read', 'incidents.write', 'threats.read'],
  ...overrides,
});

export const createMockAsset = (overrides = {}) => ({
  id: 'AST-001',
  name: 'Workstation-001',
  type: 'workstation',
  os: 'Windows 11',
  ipAddress: '192.168.1.100',
  macAddress: '00:11:22:33:44:55',
  owner: 'john.doe',
  department: 'Engineering',
  riskScore: 65,
  lastScan: new Date('2024-01-15T06:00:00Z'),
  vulnerabilities: 3,
  status: 'active',
  ...overrides,
});

export const createMockVulnerability = (overrides = {}) => ({
  id: 'VUL-001',
  cveId: 'CVE-2024-0001',
  title: 'Critical Remote Code Execution',
  description: 'Buffer overflow vulnerability in network service',
  severity: 'critical' as const,
  cvssScore: 9.8,
  status: 'open' as const,
  affectedAssets: ['SRV-001', 'SRV-002'],
  discoveredDate: new Date('2024-01-15T00:00:00Z'),
  dueDate: new Date('2024-01-22T23:59:59Z'),
  assignee: 'security-engineer-1',
  patchAvailable: true,
  ...overrides,
});

// Component testing utilities
export const renderWithProviders = (ui: React.ReactElement, options = {}) => {
  // Mock render function that would wrap with providers
  // In a real implementation, this would render the ui parameter
  console.log('Rendering component:', ui.type);
  return {
    container: document.createElement('div'),
    rerender: (newUi: React.ReactElement) => newUi,
    unmount: () => {},
    asFragment: () => document.createDocumentFragment(),
    debug: () => {},
    ...options,
  };
};

// Mock API responses
export const mockApiResponses = {
  incidents: {
    getAll: () => Promise.resolve({
      data: [createMockIncident(), createMockIncident({ id: 'INC-002', severity: 'medium' })],
      total: 2,
      page: 1,
      limit: 10,
    }),
    getById: (id: string) => Promise.resolve({
      data: createMockIncident({ id }),
    }),
    create: (data: any) => Promise.resolve({
      data: createMockIncident(data),
    }),
    update: (id: string, data: any) => Promise.resolve({
      data: createMockIncident({ id, ...data }),
    }),
  },
  threats: {
    getAll: () => Promise.resolve({
      data: [createMockThreat(), createMockThreat({ id: 'THR-002', severity: 'high' })],
      total: 2,
    }),
  },
  users: {
    getAll: () => Promise.resolve({
      data: [createMockUser(), createMockUser({ id: 'user-002', username: 'jane.smith' })],
      total: 2,
    }),
  },
};

// Mock hooks for testing
export const useMockIncidents = (options = {}) => ({
  incidents: [createMockIncident(), createMockIncident({ id: 'INC-002' })],
  loading: false,
  error: null,
  refetch: () => Promise.resolve(),
  create: () => Promise.resolve(createMockIncident()),
  update: () => Promise.resolve(createMockIncident()),
  delete: () => Promise.resolve(),
  ...options,
});

export const useMockAuth = (options = {}) => ({
  user: createMockUser(),
  isAuthenticated: true,
  loading: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  ...options,
});

// Test utility functions
export const waitForElement = async (selector: string, timeout = 1000) => {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element ${selector} not found within ${timeout}ms`));
    }, timeout);
  });
};

export const fireEvent = {
  click: (element: Element) => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  },
  change: (element: Element, value: string) => {
    if (element instanceof HTMLInputElement) {
      element.value = value;
      element.dispatchEvent(new Event('change', { bubbles: true }));
    }
  },
  keyDown: (element: Element, key: string) => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  },
  focus: (element: Element) => {
    if (element instanceof HTMLElement) {
      element.focus();
      element.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    }
  },
  blur: (element: Element) => {
    if (element instanceof HTMLElement) {
      element.blur();
      element.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    }
  },
};

// Accessibility testing utilities
export const checkAccessibility = (element: Element) => {
  const issues: string[] = [];

  // Check for proper ARIA labels
  if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
    if (element.tagName.toLowerCase() === 'button' && !element.textContent?.trim()) {
      issues.push('Button missing accessible name');
    }
    if (element.tagName.toLowerCase() === 'img' && !element.getAttribute('alt')) {
      issues.push('Image missing alt text');
    }
  }

  // Check for proper heading hierarchy
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let lastLevel = 0;
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.charAt(1));
    if (level > lastLevel + 1) {
      issues.push(`Heading hierarchy skip: ${heading.tagName} follows h${lastLevel}`);
    }
    lastLevel = level;
  });

  // Check for keyboard accessibility
  const interactive = element.querySelectorAll('button, a, input, select, textarea, [tabindex]');
  interactive.forEach((el) => {
    if (el.getAttribute('tabindex') === '-1' && !el.hasAttribute('aria-hidden')) {
      issues.push('Interactive element removed from tab order without aria-hidden');
    }
  });

  return {
    isAccessible: issues.length === 0,
    issues,
  };
};

// Performance testing utilities
export const measurePerformance = (fn: Function) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  return end - start;
};

export const expectPerformance = (fn: Function, maxTime: number) => {
  const duration = measurePerformance(fn);
  if (duration > maxTime) {
    throw new Error(`Performance test failed: ${duration}ms > ${maxTime}ms`);
  }
  return duration;
};

// Mock API client for testing
export class MockApiClient {
  private responses: Map<string, any> = new Map();
  private delay: number = 0;

  setResponse(endpoint: string, response: any) {
    this.responses.set(endpoint, response);
  }

  setDelay(ms: number) {
    this.delay = ms;
  }

  async get(endpoint: string) {
    await this.sleep();
    const response = this.responses.get(endpoint);
    if (!response) {
      throw new Error(`No mock response for ${endpoint}`);
    }
    return response;
  }

  async post(endpoint: string, data: any) {
    await this.sleep();
    const response = this.responses.get(endpoint);
    return response || { data: { ...data, id: 'mock-id' } };
  }

  async put(endpoint: string, data: any) {
    await this.sleep();
    console.log('PUT request to:', endpoint);
    return { data };
  }

  async delete(endpoint: string) {
    await this.sleep();
    console.log('DELETE request to:', endpoint);
    return { success: true };
  }

  private sleep() {
    return new Promise(resolve => setTimeout(resolve, this.delay));
  }
}

export default {
  createMockIncident,
  createMockThreat,
  createMockUser,
  createMockAsset,
  createMockVulnerability,
  renderWithProviders,
  mockApiResponses,
  useMockIncidents,
  useMockAuth,
  waitForElement,
  fireEvent,
  checkAccessibility,
  measurePerformance,
  expectPerformance,
  MockApiClient,
};