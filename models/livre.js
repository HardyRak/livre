const mongoose = require('mongoose');

const livre = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  auteur: {
    type: String,
    required: true,
    lowercase: true,
  },
  pages: {
    type: Number,
    required: true,
    min: 0 
  },
  dateSortie: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const livres = mongoose.model('livre', livre);

module.exports = livres;