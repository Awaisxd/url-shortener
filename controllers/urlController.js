const Url = require('../models/Url');
const { isValidUrl } = require('../utils/validators'); // Assume you have this helper

const handleError = (res, error, context = 'URL operation') => {
  console.error(`${context} failed:`, error.message, error.stack);
  // Rest of the error handling remains the same
  if (error.code === 11000) {
    return res.status(409).json({ error: 'Short URL already exists' });
  }
  // ... rest of the error handling
};

// Create short URL (with enhanced duplicate handling)
exports.createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) return res.status(400).json({ error: 'URL is required' });
    if (!isValidUrl(url)) return res.status(400).json({ error: 'Invalid URL format' });

    const newUrl = await Url.create({ url });
    res.status(201).json({
      id: newUrl._id,
      url: newUrl.url,
      shortCode: newUrl.shortCode,
      createdAt: newUrl.createdAt,
      shortUrl: `${req.protocol}://${req.get('host')}/${newUrl.shortCode}`
    });
    
  } catch (error) {
    handleError(res, error, 'URL creation');
  }
};

// Unified URL existence checker middleware
exports.checkUrlExists = async (req, res, next) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    if (!url) return res.status(404).json({ error: 'URL not found' });
    req.urlDocument = url; // Attach to request for later use
    next();
  } catch (error) {
    handleError(res, error, 'URL lookup');
  }
};

// Get original URL
exports.getOriginalUrl = [
  exports.checkUrlExists,
  async (req, res) => {
    try {
      const url = await Url.findOneAndUpdate(
        { shortCode: req.params.shortCode },
        { $inc: { accessCount: 1 } },
        { new: true }
      );
      res.status(200).json(url);
    } catch (error) {
      handleError(res, error, 'URL retrieval');
    }
  }
];

// Update URL
exports.updateUrl = [
  exports.checkUrlExists,
  async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) return res.status(400).json({ error: 'URL is required' });
      if (!isValidUrl(url)) return res.status(400).json({ error: 'Invalid URL format' });

      const updatedUrl = await Url.findOneAndUpdate(
        { shortCode: req.params.shortCode },
        { url },
        { new: true, runValidators: true }
      );
      res.status(200).json(updatedUrl);
    } catch (error) {
      handleError(res, error, 'URL update');
    }
  }
];

// Delete URL
exports.deleteUrl = [
  exports.checkUrlExists,
  async (req, res) => {
    try {
      await Url.deleteOne({ shortCode: req.params.shortCode });
      res.status(204).end();
    } catch (error) {
      handleError(res, error, 'URL deletion');
    }
  }
];

// Get stats (reuses checkUrlExists middleware)
exports.getUrlStats = [
  exports.checkUrlExists,
  (req, res) => {
    res.status(200).json(req.urlDocument);
  }
];

// Redirect (reuses checkUrlExists middleware)
exports.redirectUrl = [
  exports.checkUrlExists,
  async (req, res) => {
    try {
      await Url.updateOne(
        { shortCode: req.params.shortCode },
        { $inc: { accessCount: 1 } }
      );
      res.redirect(301, req.urlDocument.url);
    } catch (error) {
      handleError(res, error, 'URL redirection');
    }
  }
];