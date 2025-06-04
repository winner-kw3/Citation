const quoteService = require('../services/quotesService');

// GET /quotes
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await quoteService.getAllQuotes();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// GET /quotes/random
const getRandomQuote = async (req, res) => {
  try {
    const quote = await quoteService.getRandomQuote();
    if (!quote) return res.status(404).json({ message: 'Aucune citation trouvée.' });
    res.json(quote);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// POST /quotes
const addQuote = async (req, res) => {
  const { text, author } = req.body;
  if (!text || !author) {
    return res.status(400).json({ error: 'Texte et auteur obligatoires' });
  }

  try {
    const newQuote = await quoteService.addQuote(text, author);
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout' });
  }
};

// PUT /quotes/:id
const updateQuote = async (req, res) => {
  const { id } = req.params;
  const { text, author } = req.body;

  try {
    const updatedQuote = await quoteService.updateQuote(id, { text, author });
    if (!updatedQuote) return res.status(404).json({ message: 'Citation non trouvée' });
    res.json(updatedQuote);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la modification' });
  }
};

// DELETE /quotes/:id
const deleteQuote = async (req, res) => {
  const { id } = req.params;

  try {
    const success = await quoteService.deleteQuote(id);
    if (!success) return res.status(404).json({ message: 'Citation non trouvée' });
    res.json({ message: 'Citation supprimée' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};

module.exports = {
  getAllQuotes,
  getRandomQuote,
  addQuote,
  updateQuote,
  deleteQuote
};
