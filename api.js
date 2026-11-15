// ============================================================
// CityMate API Client
// ============================================================

const API_BASE_URL = window.API_URL || (
  typeof localStorage !== 'undefined' && localStorage.getItem('cm_api_url')
    ? localStorage.getItem('cm_api_url')
    : typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:3001'
      : 'https://city-mate-backend-1.onrender.com'
);

function getToken() { return localStorage.getItem('cm_token'); }

/** Generic fetch wrapper with timeout and error handling */
async function api(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timeoutMs = options.timeout || 25000; // 25s timeout for Render cold starts
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const config = {
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  // Add auth token for admin routes
  if (endpoint.startsWith('/api/admin/')) {
    const token = getToken();
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, config);
    clearTimeout(timeoutId);
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('cm_token');
        if (window.location.pathname.includes('admin')) {
          window.location.href = 'login.html';
        }
      }
      throw new Error(data?.message || `HTTP ${res.status}`);
    }
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Connection timed out. The backend server on Render may be sleeping or taking too long to wake up. Please refresh in a moment.');
    }
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      throw new Error(`Cannot connect to backend API (${API_BASE_URL}). Please verify your backend server is running and awake.`);
    }
    throw err;
  }
}

// ─── PUBLIC API ───

export const bookService = (data) => api('/api/book', { method: 'POST', body: data });
export const bulkBookService = (data) => api('/api/book/bulk', { method: 'POST', body: data });
export const packageBookService = (data) => api('/api/book/package', { method: 'POST', body: data });
export const submitReview = (data) => api('/api/review', { method: 'POST', body: data });
export const fetchReviews = () => api('/api/reviews');
export const submitContact = (data) => api('/api/contact', { method: 'POST', body: data });

// ─── AUTH ───

export const loginAdmin = (email, password) =>
  api('/api/admin/login', { method: 'POST', body: { email, password } });

// ─── ADMIN API ───

export const getStats = () => api('/api/admin/stats');
export const getBookings = (params = '') => api(`/api/admin/bookings${params ? '?' + params : ''}`);
export const updateBooking = (id, status) => api(`/api/admin/update/${id}`, { method: 'POST', body: { status } });
export const deleteBooking = (id) => api(`/api/admin/booking/${id}`, { method: 'DELETE' });
export const getAdminReviews = () => api('/api/admin/reviews');
export const deleteReview = (id) => api(`/api/admin/review/${id}`, { method: 'DELETE' });
export const getContacts = () => api('/api/admin/contacts');
export const toggleContact = (id) => api(`/api/admin/contact/${id}/toggle`, { method: 'POST' });

export { API_BASE_URL };


