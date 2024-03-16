
// Definizione della funzione deletePost con i parametri necessari per l'operazione.
const deletePost = async (postId, token, setPosts, posts) => {
  try {
    // Effettua una richiesta HTTP DELETE al server per eliminare il post specifico.
    const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Errore nella risposta del server durante l\'eliminazione dell\'annuncio.');

    console.log('Annuncio eliminato con successo.');
    // Aggiorna lo stato dei post filtrando via il post eliminato.
    setPosts(posts.filter(post => post._id !== postId));
  } catch (error) {

    console.error('Impossibile eliminare l\'annuncio:', error);
    alert('Impossibile eliminare l\'annuncio. Si prega di riprovare.');
  }
};

export default deletePost;
