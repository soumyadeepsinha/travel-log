const mongoose = require('mongoose')

const { Schema } = mongoose;

const requiredNumber = {
  type: Number,
  required: true,
}

const logEntrySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  comments: String,
  image: String,
  rating: {
    type: Number,
    min: 1,
    max: 10,
    default: 1,
  },
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90,
  },
  longitude: {
    ...requiredNumber,
    min: -180,
    max: 180,
  },
  visitDate: {
    type: Date,
    required: true,
  }
}, {
  timestamp: true,
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry