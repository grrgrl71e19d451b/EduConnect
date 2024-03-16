
// Import delle dipendenze necessarie
const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const authenticateToken = require('../middleware/authenticateToken');

// Import dei controller per le operazioni sugli utenti
const {
  registerUser,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');

// Configurazione delle route per la gestione degli utenti

router.post('/register', upload.single('photo'), registerUser);
router.get('/users/:userId', authenticateToken, getUser);
router.put('/users/:userId', upload.single('photo'), authenticateToken, updateUser);
router.delete('/users/:userId', authenticateToken, deleteUser);

module.exports = router;
