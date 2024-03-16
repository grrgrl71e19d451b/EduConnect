
// Importazione delle dipendenze necessarie
const bcrypt = require('bcryptjs'); // Per hash delle password
const User = require('../models/user.model');
const Post = require('../models/post.model');
const fs = require('fs'); // File system per operazioni sui file
const path = require('path'); // Per gestire i percorsi dei file

// Funzione per registrare un nuovo utente
const registerUser = async (req, res) => {
    // Estrazione dei dati inviati tramite la richiesta dal frontend
    const { name, lastName, birthday, email, password, role } = req.body;
    let profilePhotoPath = '';

    // Controlla se è stata caricata una foto profilo con la richiesta
    if (req.file) {
        profilePhotoPath = req.file.path;
    }

    try {
        // Cerca un utente esistente con la stessa email per evitare duplicati
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Elimina la foto del profilo precedentemente caricata se l'utente già esiste, per evitare file non necessari.
            if (profilePhotoPath) {
                fs.unlink(profilePhotoPath, (err) => {
                    if (err) console.error("Errore nell'eliminazione del file:", err);
                });
            }

            return res.status(400).json({ success: false, message: "L'utente esiste già." });
        }

        // Genera hash della password per la sicurezza delle credenziali dell'utente
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crea un nuovo documento utente con i dati forniti e l'hash della password
        const newUser = new User({
            name,
            lastName,
            birthday,
            email,
            password: hashedPassword,
            role,
            profilePhotoPath,
        });

        // Salva l'utente nel database
        await newUser.save();

        return res.status(201).json({ success: true, message: "Utente registrato con successo.", user: newUser });
    } catch (error) {

        // Rimuovi il file caricato in caso di errore per mantenere pulita la directory.
        if (profilePhotoPath) {
            fs.unlink(profilePhotoPath, (err) => {
                if (err) console.error("Errore nell'eliminazione del file:", err);
            });
        }

        return res.status(500).json({ success: false, message: "Errore durante la registrazione dell'utente." });
    }
};

// Funzione per ottenere i dettagli di un utente specifico
const getUser = async (req, res) => {
    const requestedUserId = req.params.userId; // ID dell'utente richiesto dalla URL
    const authenticatedUserId = req.user.id; // ID utente estratto dal token JWT

    // Verifica che l'ID utente richiesto corrisponda all'utente autenticato
    if (requestedUserId !== authenticatedUserId) {
        return res.status(403).json({ success: false, message: "Non autorizzato a visualizzare questi dettagli." });
    }

    try {
        const user = await User.findById(requestedUserId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Utente non trovato." });
        }
        // Rimuove la password dall'oggetto utente prima di restituirlo
        const { password, ...userWithoutPassword } = user.toObject();
        return res.status(200).json({ success: true, user: userWithoutPassword });
    } catch (error) {
        console.error("Errore durante il recupero dell'utente:", error);
        return res.status(500).json({ success: false, message: "Errore durante il recupero dell'utente." });
    }
};

// Funzione per aggiornare i dettagli di un utente esistente
const updateUser = async (req, res) => {
    const { userId } = req.params; // ID dell'utente da aggiornare passato attraverso l'URL
    const authenticatedUserId = req.user.id; // ID utente estratto dal token JWT

    // Verifica che l'utente stia tentando di aggiornare solo il proprio profilo
    if (userId !== authenticatedUserId) {
        return res.status(403).json({ success: false, message: "Non autorizzato ad aggiornare questo utente." });
    }

    let updateData = req.body;

    try {
        const currentUser = await User.findById(userId);
        // Se c'è una nuova foto profilo e l'utente aveva già una foto, elimina quella vecchia
        if (req.file && currentUser.profilePhotoPath) {
            const oldImagePath = currentUser.profilePhotoPath;
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error("Errore nell'eliminazione della vecchia immagine del profilo: " + err);
                }
            });
            updateData.profilePhotoPath = req.file.path;
        } else if (req.file) {
            updateData.profilePhotoPath = req.file.path;
        }

        // Aggiorna i dati dell'utente nel database
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        res.json({ success: true, message: "Utente aggiornato con successo", user: updatedUser });
    } catch (error) {
        console.error("Errore nell'aggiornamento dell'utente: " + error);
        res.status(500).json({ success: false, message: "Errore nell'aggiornamento dell'utente", error: error });
    }
};

// Funzione per eliminare un utente e i suoi post associati
const deleteUser = async (req, res) => {
    const { userId } = req.params; // ID dell'utente specificato nella richiesta
    const authenticatedUserId = req.user.id; // ID dell'utente ottenuto dal token JWT

    // Verifica che l'utente stia tentando di eliminare solo il proprio account
    if (userId !== authenticatedUserId) {
        return res.status(403).json({ success: false, message: "Non autorizzato ad eliminare questo utente." });
    }

    try {
        const userToDelete = await User.findById(userId);
        if (userToDelete && userToDelete.profilePhotoPath) {
            // Eliminazione della foto del profilo se presente
            fs.unlink(userToDelete.profilePhotoPath, (err) => {
                if (err) {
                    console.error("Errore nell'eliminazione dell'immagine del profilo: " + err);
                }
            });
        }

        // Eliminazione dei post dell'utente
        await Post.deleteMany({ userId: userId });

        // Eliminazione dell'utente
        await User.findByIdAndDelete(userId);
        res.json({ success: true, message: "Utente e tutti i post associati eliminati con successo" });
    } catch (error) {
        console.error("Errore nell'eliminazione dell'utente e dei post: " + error);
        res.status(500).json({ success: false, message: "Errore nell'eliminazione dell'utente e dei post", error: error });
    }
};

module.exports = { registerUser, getUser, updateUser, deleteUser };
