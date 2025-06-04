const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://citation-production.up.railway.app'] 
    : '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Chemin vers le fichier JSON des citations
const quotesFilePath = path.join(__dirname, "quotes.json");

// Initialiser le fichier de citations s'il n'existe pas
if (!fs.existsSync(quotesFilePath)) {
  // Créer quelques citations de test
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
} else {
  // Vérifier si le fichier a une structure valide
  try {
    const data = fs.readFileSync(quotesFilePath, "utf8");
    JSON.parse(data);
  } catch (err) {
    // Si le fichier n'est pas un JSON valide, le réinitialiser
    const initialQuotes = { quotes: [] };
    fs.writeFileSync(quotesFilePath, JSON.stringify(initialQuotes, null, 2));
  }
}

// Lire les citations
function readQuotes() {
  const data = fs.readFileSync(quotesFilePath, "utf8");
  return JSON.parse(data);
}

// Écrire les citations
function writeQuotes(quotes) {
  fs.writeFileSync(quotesFilePath, JSON.stringify(quotes, null, 2));
}

// Route pour obtenir une citation aléatoire
app.get("/api/quotes/random", (req, res) => {
  const { quotes } = readQuotes();
  if (quotes.length === 0) {
    return res.status(404).json({ message: "Aucune citation disponible" });
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json({ quote: quotes[randomIndex] });
});

// Route pour obtenir toutes les citations
app.get("/api/quotes", (req, res) => {
  const quotes = readQuotes();
  res.json(quotes);
});

// Route pour ajouter une nouvelle citation
app.post("/api/quotes", (req, res) => {
  const { text, author } = req.body;
  
  if (!text || !author) {
    return res.status(400).json({ message: "Le texte et l'auteur sont requis" });
  }
  
  const quotes = readQuotes();
  const newQuote = {
    id: Date.now().toString(),
    text,
    author,
    createdAt: new Date().toISOString()
  };
  
  quotes.quotes.push(newQuote);
  writeQuotes(quotes);
  
  res.status(201).json(newQuote);
});

// Route pour supprimer une citation
app.delete("/api/quotes/:id", (req, res) => {
  const { id } = req.params;
  
  const quotes = readQuotes();
  const initialLength = quotes.quotes.length;
  
  quotes.quotes = quotes.quotes.filter(quote => quote.id !== id);
  
  // Vérifier si une citation a été supprimée
  if (quotes.quotes.length === initialLength) {
    return res.status(404).json({ message: "Citation non trouvée" });
  }
  
  writeQuotes(quotes);
  
  res.json({ message: "Citation supprimée avec succès" });
});

// Route pour toutes les autres requêtes - renvoyer index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Après avoir lu les citations
console.log("Contenu du fichier quotes.json:", readQuotes());

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`)); 