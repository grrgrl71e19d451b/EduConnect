
// Importazione delle dipendenze necessarie
const express = require('express');
const router = express.Router();

// Importazione del controller per l'autenticazione
const authController = require('../controllers/auth.controller');

// Configurazione delle route per l'autenticazione
router.post('/login', authController.login);

module.exports = router;
