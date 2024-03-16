
// Importazione di Mongoose per la definizione di schemi e modelli
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definizione dello schema per gli utenti
const UserSchema = new Schema({
  name: String,
  lastName: String,
  birthday: Date,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
  },
  profilePhotoPath: String,
});

// Creazione del modello User basato sullo schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
