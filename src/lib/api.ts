const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  client?: string;
  date: string;
  video_url?: string;
  thumbnail_url?: string;
  order: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  read_at?: string;
  responded_at?: string;
  response_note?: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: any;
  type: string;
  group: string;
  label: string;
  description?: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

export interface Stats {
  total_projects: number;
  total_services: number;
  total_messages: number;
  new_messages: number;
  featured_projects: number;
}

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

// Helper function to handle API errors
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const api = {
  // ============ PUBLIC ENDPOINTS ============

  async getProjects(params?: { category?: string; featured?: boolean; search?: string }): Promise<Project[]> {
    const queryParams = new URLSearchParams();
    if (params?.category && params.category !== 'all') {
      queryParams.append('category', params.category);
    }
    if (params?.featured) {
      queryParams.append('featured', 'true');
    }
    if (params?.search) {
      queryParams.append('search', params.search);
    }

    const url = `${API_URL}/projects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url, { cache: 'no-store' });
    return handleResponse(response);
  },

  async getProject(id: string): Promise<Project> {
    const response = await fetch(`${API_URL}/projects/${id}`, { cache: 'no-store' });
    return handleResponse(response);
  },

  async getServices(activeOnly?: boolean): Promise<Service[]> {
    const url = activeOnly ? `${API_URL}/services?active=true` : `${API_URL}/services`;
    const response = await fetch(url, { cache: 'no-store' });
    return handleResponse(response);
  },

  async getService(id: string): Promise<Service> {
    const response = await fetch(`${API_URL}/services/${id}`, { cache: 'no-store' });
    return handleResponse(response);
  },

  async getSettings(group?: string, flat?: boolean): Promise<any> {
    const params = new URLSearchParams();
    if (group) params.append('group', group);
    if (flat) params.append('flat', 'true');

    const url = `${API_URL}/settings${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url, { cache: 'no-store' });
    return handleResponse(response);
  },

  async getSetting(key: string): Promise<SiteSetting> {
    const response = await fetch(`${API_URL}/settings/${key}`, { cache: 'no-store' });
    return handleResponse(response);
  },

  async getStats(): Promise<Stats> {
    const response = await fetch(`${API_URL}/stats`, { cache: 'no-store' });
    return handleResponse(response);
  },

  async sendContact(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
  }): Promise<{ message: string; data: ContactMessage }> {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // ============ AUTHENTICATION ============

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);

    // Store token in localStorage
    if (typeof window !== 'undefined' && data.token) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
    }

    return data;
  },

  async logout(): Promise<void> {
    const token = getAuthToken();
    if (!token) return;

    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } finally {
      // Clear local storage regardless of API response
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
  },

  async getCurrentUser(): Promise<any> {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token');

    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  // ============ PROTECTED ENDPOINTS ============

  async createProject(data: FormData): Promise<Project> {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: data,
    });
    return handleResponse(response);
  },

  async updateProject(id: string, data: FormData): Promise<Project> {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'POST', // Using POST because FormData doesn't work well with PUT
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-HTTP-Method-Override': 'PUT', // Laravel will treat this as PUT
      },
      body: data,
    });
    return handleResponse(response);
  },

  async deleteProject(id: string): Promise<void> {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    await handleResponse(response);
  },

  async createService(data: {
    title: string;
    description: string;
    icon?: string;
    features?: string[];
    is_active?: boolean;
    order?: number;
  }): Promise<Service> {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/services`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async updateService(id: string, data: Partial<Service>): Promise<Service> {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/services/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async deleteService(id: string): Promise<void> {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/services/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    await handleResponse(response);
  },

  async getMessages(params?: { status?: string; search?: string; per_page?: number }): Promise<any> {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString());

    const url = `${API_URL}/messages${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  async getMessage(id: string): Promise<ContactMessage> {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/messages/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },

  async updateMessageStatus(id: string, status: 'new' | 'read' | 'responded', note?: string): Promise<ContactMessage> {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/messages/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, response_note: note }),
    });
    return handleResponse(response);
  },

  async deleteMessage(id: string): Promise<void> {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    await handleResponse(response);
  },

  async updateSettings(settings: Array<{ key: string; value: any }>): Promise<any> {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/settings`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ settings }),
    });
    return handleResponse(response);
  },

  async updateSetting(key: string, value: any): Promise<SiteSetting> {
    const token = getAuthToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/settings/${key}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    });
    return handleResponse(response);
  },
};
