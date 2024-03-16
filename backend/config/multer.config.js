
// Importazione del modulo multer necessario per l'upload di file
const multer = require('multer');

// Configurazione dello storage e definizione della cartella di destinazione file 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads'); 
    },
    // Funzione per personalizzare il nome dei file caricati
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

// Creazione di un'istanza multer configurata con lo storage definito
const upload = multer({ storage: storage });

module.exports = upload;
