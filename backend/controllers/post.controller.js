
// Importazione del modello Post per interagire con la collezione dei post
const Post = require('../models/post.model');

// Creazione di un nuovo post
const createPost = async (req, res) => {
    // Utilizza l'ID utente dal token JWT 
    const userId = req.user.id;
    const { content } = req.body;

    try {
        // Creazione dell'istanza del post e salvataggio nel database
        const newPost = new Post({ userId, content });
        await newPost.save();
        return res.status(201).json({ success: true, message: "Post creato con successo.", post: newPost });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Errore durante la creazione del post." });
    }
};

// Ricerca di post basata su una stringa di ricerca
const searchPosts = async (req, res) => {
    const { term } = req.query;

    try {
        // Ricerca dei post che corrispondono al termine di ricerca
        const posts = await Post.find({
            content: { $regex: term, $options: 'i' }
        }).populate('userId', 'name lastName email profilePhotoPath');

        // Trasformazione dei post per includere dati formattati dell'autore
        return res.status(200).json({
            success: true,
            posts: posts.map(post => ({
                ...post.toObject(),
                authorName: `${post.userId.name} ${post.userId.lastName}`,
                authorEmail: post.userId.email,
                authorProfilePhotoPath: post.userId.profilePhotoPath
            }))
        });
    } catch (error) {

        return res.status(500).json({ success: false, message: "Errore durante la ricerca dei post." });
    }
};

// Recupero di tutti i post
const getAllPosts = async (req, res) => {
    try {
        // Recupero di tutti i post dal database
        const posts = await Post.find().populate('userId', 'name lastName email profilePhotoPath');

        // Mappatura dei post per aggiungere dettagli dell'autore
        return res.status(200).json({
            success: true,
            posts: posts.map(post => ({
                ...post.toObject(),
                authorName: post.userId ? `${post.userId.name} ${post.userId.lastName}` : 'Autore sconosciuto',
                authorEmail: post.userId ? post.userId.email : 'Nessuna email fornita',
                authorProfilePhotoPath: post.userId ? post.userId.profilePhotoPath : ''
            }))
        });
    } catch (error) {

        console.error("getAllPosts: Errore catturato", error);
        return res.status(500).json({ success: false, message: "Errore durante il recupero dei post." });
    }
};

// Recupero dei post di un utente specifico
const getPostsByUser = async (req, res) => {
    // Utilizza l'ID utente dal token JWT
    const authenticatedUserId = req.user.id;

    try {
        // Recupero dei post di un utente specifico utilizzando l'ID dall'autenticazione
        const posts = await Post.find({ userId: authenticatedUserId }).populate('userId', 'name lastName email profilePhotoPath');

        // Mappatura dei post per aggiungere dettagli dell'autore
        return res.status(200).json({
            success: true,
            posts: posts.map(post => ({
                ...post.toObject(),
                authorName: post.userId ? `${post.userId.name} ${post.userId.lastName}` : 'Autore sconosciuto',
                authorEmail: post.userId ? post.userId.email : 'Nessuna email fornita',
                authorProfilePhotoPath: post.userId ? post.userId.profilePhotoPath : ''
            }))
        });
    } catch (error) {
        console.error("getPostsByUser: Errore catturato", error);
        return res.status(500).json({ success: false, message: "Errore durante il recupero dei post dell'utente." });
    }
};

// Eliminazione di un post specifico
const deletePost = async (req, res) => {
    const { postId } = req.params; // ID del post da eliminare

    try {
        // Prima, recupera il post per verificare chi ne è l'autore
        const post = await Post.findById(postId);

        if (!post) {
            // Se il post non esiste, restituisce un errore
            return res.status(404).json({ success: false, message: "Post non trovato." });
        }

        // Verifica che l'utente che effettua la richiesta sia l'autore del post
        if (post.userId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Non autorizzato a eliminare questo post." });
        }

        // Se l'utente è autorizzato, procede con l'eliminazione del post
        await Post.findByIdAndDelete(postId);

        return res.status(200).json({ success: true, message: "Post eliminato con successo." });
    } catch (error) {
        console.error("deletePost: Errore catturato", error);
        return res.status(500).json({ success: false, message: "Errore durante l'eliminazione del post." });
    }
};

module.exports = { createPost, getAllPosts, searchPosts, getPostsByUser, deletePost };
