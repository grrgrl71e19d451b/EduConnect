
// Definisce la funzione submitPost, che prende come argomenti l'ID dell'utente, il contenuto del post, il token per l'autenticazione e setPostContent per aggiornare lo stato del contenuto del post.
const submitPost = async (userId, postContent, token, setPostContent) => {
  // Controlla se il contenuto del post è vuoto o composto solo da spazi bianchi.
  if (!postContent.trim()) {
    console.error('Per favore, inserisci il contenuto dell\'annuncio.');
    alert('Per favore, inserisci il contenuto dell\'annuncio.'); // Avvisa l'utente se il contenuto è vuoto.
    return;
  }

  try {
    // Esegue una richiesta POST al server per inviare il nuovo annuncio.
    const response = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, content: postContent.trim() }), // Invia i dati del post come JSON.
    });

    if (!response.ok) throw new Error('Failed to submit post');

    const data = await response.json(); // Ottiene i dati della risposta.
    if (!data.success) throw new Error('Errore durante la pubblicazione dell\'annuncio.');

    console.log('Annuncio pubblicato con successo!');
    setPostContent(''); // Azzera il contenuto del post dopo l'invio riuscito.

  } catch (error) {
    console.error('Errore durante la pubblicazione dell\'annuncio:', error);
    alert('Errore durante la pubblicazione dell\'annuncio. Per favore riprova.'); 
  }
};

export default submitPost;
