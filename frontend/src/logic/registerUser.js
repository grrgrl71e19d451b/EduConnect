
// Funzione registerUser, che accetta i dati del form di registrazione e una funzione navigate per la navigazione.
const registerUser = async (formData, navigate) => {

  try {
    // Effettua una richiesta POST al server per registrare l'utente, inviando i dati del form.
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      body: formData,
    });

    // Estrae i dati dalla risposta in formato JSON.
    const data = await response.json();

    if (response.ok) {
      alert(data.message); // Usa il messaggio di successo dal server
      navigate('/login');

    } else {
      alert(`Errore di registrazione: ${data.message}`);
    }
  } catch (error) {

    console.error('Registrazione utente: Errore nella comunicazione con il server o nella risposta', error);
    alert("Errore durante la registrazione. Si prega di riprovare.");
  }
};

export default registerUser;
