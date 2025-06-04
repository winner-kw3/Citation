const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

router.get('/', quoteController.getAllQuotes);
router.get('/random', quoteController.getRandomQuote);
router.post('/', quoteController.addQuote);
router.put('/:id', quoteController.updateQuote);
router.delete('/:id', quoteController.deleteQuote);

module.exports = router;
