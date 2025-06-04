const fs = require('fs');
const path = require('path');

const quotesFilePath = path.join(__dirname, '../../quotes.json');

// Initialiser le fichier de citations s'il n'existe pas
const initializeQuotesFile = () => {
  if (!fs.existsSync(quotesFilePath)) {
    const initialQuotes = {
      quotes: [
        {
          id: "1",
          text: "La vie est ce qui arrive quand on est occupé à faire d'autres projets.",
          author: "John Lennon",
          createdAt: new Date().toISOString()
        },
        {
          id: "2",
          text: "Le succès, c'est d'aller d'échec en échec sans perdre son enthousiasme.",
          author: "Winston Churchill",
          createdAt: new Date().toISOString()
        },
        {
          id: "3",
          text: "La simplicité est la sophistication suprême.",
          author: "Leonardo da Vinci",
          createdAt: new Date().toISOString()
        }
      ]
    };
    fs.writeFileSync(quotesFilePath, JSON.stringify(initialQuotes, null, 2));
  }
};

// Lire les citations
const readQuotes = () => {
  const data = fs.readFileSync(quotesFilePath, "utf8");
  return JSON.parse(data);
};

// Écrire les citations
const writeQuotes = (quotes) => {
  fs.writeFileSync(quotesFilePath, JSON.stringify(quotes, null, 2));
};

// Obtenir une citation aléatoire
const getRandomQuote = () => {
  const { quotes } = readQuotes();
  if (quotes.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

// Obtenir toutes les citations
const getAllQuotes = () => {
  return readQuotes();
};

// Ajouter une nouvelle citation
const addQuote = (text, author) => {
  const quotes = readQuotes();
  const newQuote = {
    id: Date.now().toString(),
    text,
    author,
    createdAt: new Date().toISOString()
  };
  
  quotes.quotes.push(newQuote);
  writeQuotes(quotes);
  
  return newQuote;
};

// Modifier une citation
const updateQuote = (id, { text, author }) => {
  const quotes = readQuotes();
  const quoteIndex = quotes.quotes.findIndex(quote => quote.id === id);
  
  if (quoteIndex === -1) {
    return null;
  }
  
  const updatedQuote = {
    ...quotes.quotes[quoteIndex],
    text,
    author,
    updatedAt: new Date().toISOString()
  };
  
  quotes.quotes[quoteIndex] = updatedQuote;
  writeQuotes(quotes);
  
  return updatedQuote;
};

// Supprimer une citation
const deleteQuote = (id) => {
  const quotes = readQuotes();
  const initialLength = quotes.quotes.length;
  
  quotes.quotes = quotes.quotes.filter(quote => quote.id !== id);
  
  if (quotes.quotes.length === initialLength) {
    return false;
  }
  
  writeQuotes(quotes);
  return true;
};

module.exports = {
  initializeQuotesFile,
  getRandomQuote,
  getAllQuotes,
  addQuote,
  updateQuote,
  deleteQuote
}; 