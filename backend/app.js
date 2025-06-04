const express = require("express");
const path = require("path");
const cors = require("cors");
const quoteController = require('./src/controllers/quoteController');
const quoteRoutes = require('./src/routes/quoteRoutes');

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

// Initialiser le fichier de citations
quoteController.initializeQuotesFile();

// Routes API
app.use('/api/quotes', quoteRoutes);

// Route pour toutes les autres requêtes - renvoyer index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`)); 