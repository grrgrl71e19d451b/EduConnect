
// Importazioni necessarie dalla libreria React, React Router e Chakra UI.
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, Heading, Text, Button, Input, Flex } from '@chakra-ui/react';

// Importa componenti e funzioni ausiliarie.
import Layout from '../components/Layout';
import handleLogin from '../logic/handleLogin';

function AuthenticationPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Hook useNavigate per la navigazione programmatica.
  const navigate = useNavigate();
  // Accede alla funzione di login dal contesto di autenticazione.
  const { login } = useAuth();

  // Regex per la validazione.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  // Funzione chiamata alla sottomissione del form.
  const onSubmit = (event) => {
    event.preventDefault();

    if (!emailRegex.test(username)) {
      alert("Per favore, inserisci un indirizzo email valido.");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("La password deve contenere minimo 8 caratteri, almeno una lettera maiuscola, una lettera minuscola e un numero.");
      return;
    }

    // Passa i parametri necessari alla funzione handleLogin.
    handleLogin(username, password, login, navigate);
  };

  return (
    <Layout>
      {/* Box per contenere i componenti del form con stile Chakra UI. */}
      <Box p={6} mb={6} bg="gray.200" rounded="lg">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading as="h1" size="2xl">Benvenuto su EduConnect!</Heading>
          {/* Button per navigare alla home page. */}
          <Button colorScheme="teal" size="sm" onClick={() => navigate('/')}>Home</Button>
        </Flex>
        <Box>
          <Text fontSize="lg" mb={6}>Accedi al tuo account</Text>
          {/* Definizione del form con gestione della sottomissione. */}
          <form onSubmit={onSubmit}>
            {/* Input per l'username (email) e per la password. */}
            <Input
              type="text"
              placeholder="Username (Email)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              mb={4}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mb={4}
            />
            {/* Button per sottomettere il form. */}
            <Button type="submit" colorScheme="blue" mb={4}>Accedi</Button>
          </form>
          {/* Link alla pagina di registrazione. */}
          <Text fontSize="sm" mt={4}>
            Non hai un account? <Link to="/registration">Registrati qui</Link>
          </Text>
        </Box>
      </Box>
    </Layout>
  );
}

export default AuthenticationPage;
