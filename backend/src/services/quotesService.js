const db = require('../dataBase/connection');

// Obtenir toutes les citations
const getAllQuotes = async () => {
  const [rows] = await db.query('SELECT * FROM quotes ORDER BY createdAt DESC');
  return rows;
};

// Obtenir une citation aléatoire
const getRandomQuote = async () => {
  const [rows] = await db.query('SELECT * FROM quotes ORDER BY RAND() LIMIT 1');
  return rows[0] || null;
};

// Ajouter une citation
const addQuote = async (text, author) => {
  const [result] = await db.query(
    'INSERT INTO quotes (text, author, createdAt) VALUES (?, ?, NOW())',
    [text, author]
  );

  return {
    id: result.insertId,
    text,
    author,
    createdAt: new Date().toISOString()
  };
};

// Mettre à jour une citation
const updateQuote = async (id, { text, author }) => {
  const [result] = await db.query(
    'UPDATE quotes SET text = ?, author = ?, updatedAt = NOW() WHERE id = ?',
    [text, author, id]
  );

  if (result.affectedRows === 0) return null;

  return {
    id,
    text,
    author,
    updatedAt: new Date().toISOString()
  };
};

// Supprimer une citation
const deleteQuote = async (id) => {
  const [result] = await db.query('DELETE FROM quotes WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllQuotes,
  getRandomQuote,
  addQuote,
  updateQuote,
  deleteQuote
};
