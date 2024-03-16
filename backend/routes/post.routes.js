
// Importazione delle dipendenze necessarie
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

// Importazione dei controller per le operazioni sui post
const { createPost,
    getAllPosts,
    searchPosts,
    getPostsByUser,
    deletePost
} = require('../controllers/post.controller');

// Configurazione delle route per la gestione dei post
router.post('/posts', authenticateToken, createPost);
router.get('/posts/search', searchPosts);
router.get('/posts', getAllPosts);
router.get('/posts/user/:userId', authenticateToken, getPostsByUser);
router.delete('/posts/:postId', authenticateToken, deletePost);

module.exports = router;
