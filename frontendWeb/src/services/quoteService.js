const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const quoteService = {
  // Obtenir une citation aléatoire
  async getRandomQuote() {
    try {
      const response = await fetch(`${API_URL}/quotes/random`);
      if (!response.ok) throw new Error('Erreur lors de la récupération de la citation');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Obtenir toutes les citations
  async getAllQuotes() {
    try {
      const response = await fetch(`${API_URL}/quotes`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des citations');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Ajouter une nouvelle citation
  async addQuote(quote) {
    try {
      const response = await fetch(`${API_URL}/quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quote),
      });
      if (!response.ok) throw new Error('Erreur lors de l\'ajout de la citation');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Supprimer une citation
  async deleteQuote(id) {
    try {
      const response = await fetch(`${API_URL}/quotes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression de la citation');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Modifier une citation
  async updateQuote(id, quote) {
    try {
      const response = await fetch(`${API_URL}/quotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quote),
      });
      if (!response.ok) throw new Error('Erreur lors de la modification de la citation');
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }
}; 