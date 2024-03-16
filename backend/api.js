

// Importazione del framework Express per gestire le richieste HTTP
const express = require('express');
const router = express.Router();

// Importazione dei modelli necessari
const User = require('./models/user.model');

// Importazione dei router per gestire le diverse sezioni dell'API
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');

// Collegamento dei router al router principale per delegare la gestione delle rotte specifiche
router.use(authRoutes);
router.use(userRoutes);
router.use(postRoutes);

module.exports = router;
