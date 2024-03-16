
// Importazione di Mongoose per gestione di schemi e modelli
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definizione dello schema per i post
const PostSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Collegamento allo schema 'User'
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Creazione del modello 'Post' basato su 'PostSchema'
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
