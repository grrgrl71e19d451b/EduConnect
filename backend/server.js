
// Caricamento delle variabili d'ambiente da config.env
require('dotenv').config({ path: './config.env' });

// Importazione delle dipendenze necessarie per l'applicazione
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importazione dei router dell'API
const apiRoutes = require('./api');

// Inizializzazione dell'applicazione Express
const app = express();

// Definizione della porta su cui il server sarà in ascolto
const port = process.env.PORT || 3000;

// Connessione a MongoDB utilizzando l'URI fornito nelle variabili d'ambiente
const uri = process.env.ATLAS_DB;
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(`Failed to connect to the database. Error: ${err}`));

// Utilizzo del middleware CORS per gestire le richieste cross-origin
app.use(cors());

// Permette a Express di interpretare il corpo delle richieste in formato JSON
app.use(express.json());

// Definizione del percorso base '/api' per tutti i router dell'API
app.use('/api', apiRoutes);

// Configurazione del server per servire file statici dalla cartella 'uploads'
app.use('/uploads', express.static('uploads'));

// Avvio del server in ascolto sulla porta specificata
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
