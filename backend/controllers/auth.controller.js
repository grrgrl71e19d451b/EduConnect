
// Configurazione iniziale per caricare le variabili d'ambiente
require('dotenv').config();

// Importazione delle dipendenze necessarie
const User = require('../models/user.model');
const bcrypt = require('bcryptjs'); // Libreria per hash e verifica delle password
const jwt = require('jsonwebtoken'); // Libreria per la creazione di token JWT

// Funzione per gestire il login degli utenti
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Ricerca dell'utente tramite email
    const user = await User.findOne({ email });
    if (!user) {

      return res.status(404).json({ success: false, message: "L'utente non esiste" });
    }

    // Verifica che la password corrisponda
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {

      return res.status(400).json({ success: false, message: 'Password non valida' });
    }

    // Creazione del token JWT contenente l'ID, il nome e il ruolo dell'utente
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ success: true, message: 'Login effettuato con successo', token });
  } catch (error) {

    res.status(500).json({ success: false, message: 'Errore del server' });
  }
};
