const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
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
  },
  lecteurs: [
    {
      utilisateurId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecteur',
        required: true,
      },
      nom: {
        type: String,
        required: true,
      },
      dateLecture: {
        type: Date,
        default: Date.now,
      }
    }
  ]
});

const Livre = mongoose.model('Livre', livreSchema);
module.exports = Livre;