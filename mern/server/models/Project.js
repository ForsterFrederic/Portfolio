const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  }
}, {
  timestamps: false
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;