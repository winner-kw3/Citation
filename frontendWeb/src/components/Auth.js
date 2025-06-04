import { ref } from 'vue';

const user = ref(null);

export function useAuth() {
  const login = (userData) => {
    if (!userData || typeof userData !== 'object') return; // évite undefined/null
    user.value = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => !!user.value;

  const initAuth = () => {
    try {
      const userData = localStorage.getItem('user');

      // Vérifie que ce n'est pas null, vide ou "undefined"
      if (userData && userData !== 'undefined') {
        user.value = JSON.parse(userData);
      } else {
        localStorage.removeItem('user'); // Nettoyage
      }
    } catch (err) {
      console.error("Erreur lors de la récupération de l'utilisateur :", err);
      localStorage.removeItem('user'); // Nettoyage sécurisé
    }
  };

  return {
    user,
    login,
    logout,
    isAuthenticated,
    initAuth,
  };
}
