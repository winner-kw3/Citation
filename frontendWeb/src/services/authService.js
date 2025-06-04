const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/auth';

export const authService = {
  register: async (credentials) => {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!res.ok) throw new Error('Échec de l\'inscription');
    return res.json();
  },

  login: async (credentials) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!res.ok) throw new Error('Échec de la connexion');
    return res.json();
  }
};
