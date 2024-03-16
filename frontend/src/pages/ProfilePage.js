
// Importazioni necessarie da React, React Router, il contesto di autenticazione e Chakra UI.
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, Button, Heading, Input, Select, VStack, Flex, Image } from '@chakra-ui/react';

// Importa componenti e funzioni per la gestione del profilo.
import Layout from '../components/Layout';
import fetchProfile from '../logic/fetchProfile';
import updateProfile from '../logic/updateProfile';
import deleteAccount from '../logic/deleteAccount';

function ProfilePage() {

  const navigate = useNavigate();
  const { currentUser, logout, isAuthCheckCompleted } = useAuth();

  // Stato per gestire i dati dell'utente e la foto del profilo.
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    birthday: '',
    role: '',
    profilePhotoPath: '',
  });
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Effetto per caricare i dati del profilo all'avvio.
  useEffect(() => {
    if (!isAuthCheckCompleted) return;
    if (!currentUser || !currentUser.id) {
      console.log('Reindirizzamento al login: utente non autenticato o ID mancante');
      navigate('/login');
      return;
    }
    const token = localStorage.getItem('token');
    fetchProfile(currentUser.id, token, setUser);
  }, [currentUser, isAuthCheckCompleted, navigate]);

  // Gestisce il cambiamento dei campi del form.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  // Gestisce il cambio della foto del profilo.
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  // Gestisce la sottomissione dell'aggiornamento del profilo.
  const handleUpdateSubmit = (event) => {
    event.preventDefault();

    // Estrae i valori dallo stato dell'utente.
    const { name, lastName, birthday, role } = user;

    // Regex per validare che nome e cognome e data in formato aaaa-mm-gg.
    const nameRegex = /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúÁÉÍÓÚäëïöüÄËÏÖÜ\s-]+$/;

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    // Verifica che tutti i campi siano stati compilati.
    if (!name.trim() || !lastName.trim() || !birthday.trim()) {
      alert("Per favore, compila tutti i campi.");
      return;
    }

    // Verifica che nome e cognome e data di nascita siano validi.
    if (!nameRegex.test(name) || !nameRegex.test(lastName)) {
      alert("Nome o cognome contengono caratteri non validi.");
      return;
    }

    if (!dateRegex.test(birthday)) {
      alert("Per favore, inserisci una data valida nel formato YYYY-MM-DD.");
      return; // Interrompe la funzione se la data non è valida.
    }

    // Verifica che il ruolo selezionato sia valido.
    if (role !== "student" && role !== "teacher") {
      alert('Per favore, seleziona un ruolo valido (Studente o Insegnante).');
      return;
    }

    // Se tutti i controlli sono superati, procede con l'aggiornamento del profilo.
    const token = localStorage.getItem('token');
    updateProfile(currentUser.id, user, token, profilePhoto, setUser)
      .then(() => {
        alert("Profilo aggiornato con successo!");
      })
      .catch((error) => {
        console.error("Errore durante l'aggiornamento del profilo:", error);
        alert("Errore durante l'aggiornamento del profilo. Si prega di riprovare.");
      });
  };

  // Gestisce l'eliminazione dell'account e dei post associati.
  const handleDeleteAccountAndPosts = () => {
    const token = localStorage.getItem('token');
    deleteAccount(currentUser.id, token, logout, () => navigate('/'));
  };

  // Logout dell'utente.
  const handleLogout = () => {
    logout();
  };

  // Verifica se l'utente è definito prima di renderizzare la pagina.
  if (!user) {
    return <Box>Caricamento...</Box>;
  }

  return (
    <Layout>
      <Box p={6} mb={6} bg="gray.200" rounded="lg">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          {currentUser && (
            <Heading as="h2" size="lg">Ciao, {currentUser.name}!</Heading>
          )}
          <Flex>
            <Button onClick={() => navigate('/')} colorScheme="teal" size="sm" mr={2}>Home</Button>
            <Button onClick={handleLogout} colorScheme="red" size="sm">Logout</Button>
          </Flex>
        </Flex>
        <Heading as="h1" size="2xl" mt={4}>Il tuo Spazio Personale</Heading>

        <VStack spacing={4} align="stretch" mt={4}>
          {/* Visualizzazione e modifica dei dettagli del profilo, inclusa la foto. */}
          {user.profilePhotoPath && (
            <Image
              src={`http://localhost:5000/${user.profilePhotoPath}`}
              alt="Foto Profilo"
              boxSize="200px"
              objectFit="cover"
              mb={4}
            />
          )}
          <Input type="file" onChange={handleFileChange} />
          {/* Campi per l'aggiornamento del profilo. */}
          <Input name="name" value={user.name} onChange={handleChange} placeholder="Nome" />
          <Input name="lastName" value={user.lastName} onChange={handleChange} placeholder="Cognome" />
          <Input name="email" type="email" value={user.email} onChange={handleChange} placeholder="Email" readOnly />
          <Input name="birthday" type="date" value={user.birthday} onChange={handleChange} placeholder="Data di nascita" />
          <Select name="role" value={user.role} onChange={handleChange} placeholder="Seleziona un ruolo">
            <option value="student">Studente</option>
            <option value="teacher">Insegnante</option>
          </Select>
        </VStack>
        <Flex justifyContent="flex-end" mt={4}>
          {/* Pulsanti per l'aggiornamento del profilo e l'eliminazione dell'account. */}
          <Button onClick={handleUpdateSubmit} size="sm" colorScheme="blue" mr={2}>
            Aggiorna Profilo
          </Button>
          <Button onClick={handleDeleteAccountAndPosts} size="sm" colorScheme="red">
            Elimina Account
          </Button>
        </Flex>
      </Box>
    </Layout>
  );
}

export default ProfilePage;
