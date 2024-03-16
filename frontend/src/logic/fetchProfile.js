
// Definizione della funzione fetchProfile con parametri per l'ID dell'utente, il token di autenticazione e la funzione setUser per aggiornare lo stato del profilo nell'applicazione.
const fetchProfile = async (userId, token, setUser) => {
  try {
    // Effettua una richiesta GET al server per recuperare i dati del profilo dell'utente specificato.
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Utilizza il token per l'autenticazione.
      },
    });

    if (!response.ok) throw new Error('Network response was not ok');

    // Estrae i dati dal corpo della risposta in formato JSON.
    const data = await response.json();
    if (!data.success) throw new Error('Failed to load profile data');

    // Formatta la data di nascita per rimuovere l'ora.
    const formattedBirthday = data.user.birthday ? data.user.birthday.split('T')[0] : '';
    // Aggiorna lo stato dell'utente con i dati ricevuti e la data di nascita formattata.
    setUser({ ...data.user, birthday: formattedBirthday });
  } catch (error) {

    console.error('Errore nel caricamento del profilo:', error);
    alert('Errore nel caricamento del profilo. Si prega di controllare la connessione o riprovare più tardi.');
  }
};

export default fetchProfile;
