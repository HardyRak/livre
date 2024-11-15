const mongoose = require('mongoose');
const lecteurSchema = new mongoose.Schema({
    nom: {
      type: String,
      required: true,
      trim: true
    },
    livresLus: [
      {
        livreId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Livre',
          required: true
        },
        dateLecture: {
          type: Date,
          default: Date.now
        }
      }
    ]
  });
  
  const Lecteur = mongoose.model('Lecteur', lecteurSchema);
  module.exports = Lecteur;