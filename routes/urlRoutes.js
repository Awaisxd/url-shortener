const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// API endpoints
router.post('/shorten', urlController.createShortUrl);
router.get('/shorten/:shortCode', urlController.getOriginalUrl);
router.put('/shorten/:shortCode', urlController.updateUrl);
router.delete('/shorten/:shortCode', urlController.deleteUrl);
router.get('/shorten/:shortCode/stats', urlController.getUrlStats);

// Catch-all route for redirection
router.get('/:shortCode', urlController.redirectUrl);

module.exports = router;