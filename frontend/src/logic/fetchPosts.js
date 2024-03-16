
// Definizione della funzione fetchPosts con i parametri necessari per l'operazione.
const fetchPosts = async (setPosts, { searchTerm = '', userId = null, token = '' } = {}) => {
  // Base URL dell'API per recuperare i post.
  let url = 'http://localhost:5000/api/posts/';

  if (searchTerm) {
    // Imposta l'URL per la ricerca se è stato fornito un searchTerm
    url += `search?term=${searchTerm}`;
  } else if (userId) {
    // Imposta l'URL per un specifico utente se è stato fornito un userId
    url += `user/${userId}`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (data.success && data.posts) {
      // Posts contiene un array di post recuperati dall'API

      setPosts(data.posts.map(post => ({
        ...post,
        // Assicura che ogni post includa una proprietà 'comments', impostandola come array vuoto se mancante.
        comments: post.comments || [],
      })));
    } else {
      alert('Errore nel caricamento degli annunci.');
    }
  } catch (error) {
    console.error('Errore nel caricamento degli annunci:', error);
    alert('Errore durante il caricamento degli annunci.');
  }
};

export default fetchPosts;
