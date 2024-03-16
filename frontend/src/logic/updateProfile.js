
// Definisce la funzione updateProfile con parametri per l'ID dell'utente, i dati dell'utente, il token di autenticazione, la foto del profilo e una funzione setUser per aggiornare lo stato del profilo nell'app.
const updateProfile = async (userId, user, token, profilePhoto, setUser) => {
    const formData = new FormData(); // Crea un oggetto FormData per contenere i dati del profilo, inclusi file.

    // Gestisce e formatta la data di nascita per assicurarsi che sia nel formato corretto.
    let formattedBirthday = user.birthday;
    if (formattedBirthday && formattedBirthday.includes('T')) {
        formattedBirthday = formattedBirthday.split('T')[0]; // Rimuove l'orario se presente.
    }

    // Verifica il formato della data di nascita usando un'espressione regolare.
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (formattedBirthday && !dateRegex.test(formattedBirthday)) {
        alert('Il formato della data di nascita non è valido. Si prega di utilizzare il formato DD-MM-YYYY.');
        return;
    }

    // Aggiunge i dati dell'utente al FormData, compresa la data di nascita formattata.
    Object.keys(user).forEach(key => {
        if (key === 'birthday') {
            formData.append(key, formattedBirthday);
        } else {
            formData.append(key, user[key]);
        }
    });

    // Aggiunge la foto del profilo al FormData.
    if (profilePhoto) {
        formData.append('photo', profilePhoto);
    }

    try {
        // Effettua una richiesta PUT al server per aggiornare il profilo dell'utente.
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Include il token di autenticazione.
            },
            body: formData, // Invia il FormData come corpo della richiesta.
        });

        if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);

        const updatedUserData = await response.json(); // Estrae i dati aggiornati dalla risposta.

        // Aggiorna lo stato del profilo con i dati ricevuti.
        setUser(prevState => ({
            ...prevState,
            ...updatedUserData.user,
            birthday: formattedBirthday,
            profilePhotoPath: updatedUserData.user.profilePhotoPath,
        }));

    } catch (error) {
        console.error('Errore nell\'aggiornamento del profilo:', error);
        alert('Errore nell\'aggiornamento del profilo. Dettagli: ' + error.message);
    }
};

export default updateProfile;
