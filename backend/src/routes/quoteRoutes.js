const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

// Route pour obtenir une citation aléatoire
router.get('/random', (req, res) => {
  const quote = quoteController.getRandomQuote();
  if (!quote) {
    return res.status(404).json({ message: "Aucune citation disponible" });
  }
  res.json({ quote });
});

// Route pour obtenir toutes les citations
router.get('/', (req, res) => {
  const quotes = quoteController.getAllQuotes();
  res.json(quotes);
});

// Route pour ajouter une nouvelle citation
router.post('/', (req, res) => {
  const { text, author } = req.body;
  
  if (!text || !author) {
    return res.status(400).json({ message: "Le texte et l'auteur sont requis" });
  }
  
  const newQuote = quoteController.addQuote(text, author);
  res.status(201).json(newQuote);
});

// Route pour modifier une citation
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { text, author } = req.body;
  
  if (!text || !author) {
    return res.status(400).json({ message: "Le texte et l'auteur sont requis" });
  }
  
  const updatedQuote = quoteController.updateQuote(id, { text, author });
  if (!updatedQuote) {
    return res.status(404).json({ message: "Citation non trouvée" });
  }
  
  res.json(updatedQuote);
});

// Route pour supprimer une citation
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  const success = quoteController.deleteQuote(id);
  if (!success) {
    return res.status(404).json({ message: "Citation non trouvée" });
  }
  
  res.json({ message: "Citation supprimée avec succès" });
});

module.exports = router; 