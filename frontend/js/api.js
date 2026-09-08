const API = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem(window.AUTH_TOKEN_KEY);
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    };

    try {
      const response = await fetch(`${window.API_BASE}${endpoint}`, {
        ...options,
        headers
      });
      return await response.json();
    } catch (error) {
      console.warn('Backend inaccesible o sin conexión. Operando en modo local/PWA.');
      return { success: false, message: 'Modo sin conexión' };
    }
  }
};