const mongoose = require('mongoose');

const detectionSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  status:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Detection', detectionSchema);