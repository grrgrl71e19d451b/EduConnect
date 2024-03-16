
// Funzione handleLogin con i parametri per username, password, una funzione login e navigate.
const handleLogin = async (username, password, login, navigate) => {

  const userCredentials = {
    email: username,
    password: password,
  };

  try {

    console.log('Invio della richiesta di login...');
    // Effettua una richiesta POST al server per l'autenticazione, includendo le credenziali dell'utente.
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    });

    console.log('Risposta ricevuta dal server.');

    // Estrae i dati dal corpo della risposta in formato JSON.
    const data = await response.json();

    if (data.success) {

      console.log('Login riuscito.');
      login(data.token); // Chiama la funzione login passata come argomento per salvare il token.
      navigate('/');
    } else {

      console.error('Errore di login:', data.message);
      alert('Errore di login: ' + data.message);
    }
  } catch (error) {

    console.error('Errore di connessione:', error.message);
    alert('Errore di connessione: ' + error.message);
  }
};

export default handleLogin;
