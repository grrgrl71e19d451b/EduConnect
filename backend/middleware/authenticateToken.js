
// Importa il modulo jsonwebtoken per verificare i token JWT
const jwt = require('jsonwebtoken');

// Definizione del middleware authenticateToken
const authenticateToken = (req, res, next) => {
    // Estrae l'header 'Authorization' dalla richiesta. Questo header contiene il token.
    const authHeader = req.headers['authorization'];

    // Se l'header Authorization è presente, divide la stringa per recuperare solo il token
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ message: 'Accesso negato. Token non fornito.' });

    // Verifica il token utilizzando la chiave segreta con cui è stato firmato.
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token non valido o scaduto.' });
        // Se il token è valido, allega i dati decodificati dell'utente alla richiesta.
        req.user = user;
        // Passa il controllo al prossimo alla funzione di route.
        next();
    });
};

module.exports = authenticateToken;
