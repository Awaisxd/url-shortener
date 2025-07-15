const mongoose = require('mongoose');
const shortId = require('shortid');

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    default: shortId.generate,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  accessCount: {
    type: Number,
    default: 0,
  },
});

urlSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Url', urlSchema);