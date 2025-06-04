const authService = require('../services/authService');

const register = async (req, res) => {
    const { username, password } = req.body;
    console.log('Données reçues pour inscription :', req.body);
  
    try {
      const user = await authService.register(username, password);
      res.status(201).json(user);
    } catch (err) {
      console.error('Erreur dans le contrôleur register :', err);
      res.status(400).json({ error: err.message || 'Erreur lors de l\'inscription' });
    }
  };
  

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log('Données reçues pour connexion :', req.body);

  try {
    const result = await authService.login(username, password);
    if (!result) return res.status(401).json({ error: 'Identifiants invalides' });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = {
  register,
  login
};
