
// Definizione della funzione deleteAccount con parametri necessari per l'operazione.
const deleteAccount = async (userId, token, logout, navigate) => {

  if (!window.confirm('Sei sicuro di voler eliminare il tuo account e tutti i post associati? Questa azione non può essere annullata.')) return;

  try {
    // Effettua una richiesta HTTP DELETE al server per eliminare l'account.
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Utilizza il token per l'autenticazione.
      },
    });

    if (!response.ok) throw new Error('Errore durante l\'eliminazione del profilo');

    // Se l'eliminazione ha successo, effettua il logout e reindirizza l'utente alla homepage.
    logout();
    navigate('/');
    alert('Account eliminato con successo.');

  } catch (error) {
    console.error('Errore durante l\'eliminazione del profilo:', error);
    alert('Errore durante l\'eliminazione del profilo.');
  }
};

export default deleteAccount;
