
// Importa le dipendenze necessarie da React, React Router e Chakra UI.
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Button, Input, Select, Flex } from '@chakra-ui/react';

// Importa componenti e logica aggiuntiva.
import Layout from '../components/Layout';
import registerUser from '../logic/registerUser';

function RegistrationPage() {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  // Gestisce il cambiamento del file della foto.
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  // Gestisce il processo di registrazione all'invio del form.
  const handleRegistration = (e) => {
    e.preventDefault();

    // Controllo preliminare con la regex.
    const dateRegex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // Controlli individuali per ciascun campo.
    if (!name.trim()) {
      alert("Per favore, inserisci il tuo nome.");
      return;
    }

    if (!lastName.trim()) {
      alert("Per favore, inserisci il tuo cognome.");
      return;
    }

    if (!dateRegex.test(birthday)) {
      alert("Per favore, inserisci la tua data di nascita nel formato gg/mm/aaaa.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Per favore, inserisci un indirizzo email valido.");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("La password deve contenere minimo 8 caratteri, almeno una lettera maiuscola, una lettera minuscola e un numero.");
      return;
    }

    if (role !== "student" && role !== "teacher") {
      alert("Per favore, seleziona un ruolo valido (Studente o Insegnante).");
      return;
    }

    // Prepara i dati del form per la richiesta di registrazione.
    const formData = new FormData();
    formData.append('name', name);
    formData.append('lastName', lastName);
    formData.append('birthday', birthday);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    if (photo) {
      formData.append('photo', photo);
    }

    // Chiama la funzione di registrazione con i dati del form e il navigate.
    registerUser(formData, navigate);
  };

  return (
    <Layout>
      <Box p={6} mb={6} bg="gray.200" rounded="lg">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading as="h1" size="2xl">Benvenuto su EduConnect!</Heading>
          <Button colorScheme="teal" size="sm" onClick={() => navigate('/')}>Home</Button>
        </Flex>
        <Box>
          <form onSubmit={handleRegistration}>
            <Text fontSize="lg" mb={6}>Crea il tuo account</Text>
            {/* Campi del form per i dati dell'utente. */}
            <Input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} mb={4} />
            <Input type="text" placeholder="Cognome" value={lastName} onChange={(e) => setLastName(e.target.value)} mb={4} />
            <Input type="date" placeholder="Data di Nascita" value={birthday} onChange={(e) => setBirthday(e.target.value)} mb={4} />
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} mb={4} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} mb={4} />
            <Select placeholder="Ruolo" value={role} onChange={(e) => setRole(e.target.value)} mb={4}>
              <option value="student">Studente</option>
              <option value="teacher">Insegnante</option>
            </Select>
            <Input type="file" onChange={handleFileChange} mb={4} />
            {/* Pulsante per inviare il form. */}
            <Button type="submit" colorScheme="blue" mb={4}>Crea account</Button>
          </form>
          <Text fontSize="sm">
            Hai già un account? <Link to="/login">Accedi qui</Link>
          </Text>
        </Box>
      </Box>
    </Layout>
  );
}

export default RegistrationPage;
