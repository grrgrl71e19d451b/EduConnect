
// Importazioni necessarie dalle librerie React, React Router e Chakra UI.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, Heading, Text, Button, Input, InputGroup, InputRightElement, Image } from '@chakra-ui/react';

// Importazione di componenti e funzioni specifiche dell'app.
import Layout from '../components/Layout';
import fetchPosts from '../logic/fetchPosts';

function HomePage() {

  const { currentUser, logout } = useAuth();

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Effetto per caricare i post all'avvio del componente.
  useEffect(() => {
    fetchPosts(setPosts);
  }, []);

  // Gestione del cambio dei termini di ricerca.
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Sottomissione della ricerca.
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchPosts(setPosts, { searchTerm: searchTerm });
  };

  return (
    <Layout>
      <div style={{ position: 'relative' }}>
        <Box p={6} mb={6} bg="gray.200" rounded="lg">
          {currentUser && (
            <Heading as="h2" size="lg" mb={4}>Ciao, {currentUser.name}!</Heading>
          )}
          <Heading as="h1" size="2xl" mb={4}>Benvenuto su EduConnect!</Heading>
          <Text fontSize="lg" mb={6}>Trova il tutor perfetto per te.</Text>
          {/* Form di ricerca. */}
          <InputGroup mb={4}>
            <Input
              type="text"
              placeholder="Cerca annunci..."
              value={searchTerm}
              onChange={handleSearchChange}
              rounded="full"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearchSubmit(event);
                }
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleSearchSubmit} colorScheme="blue">
                Cerca
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>

        {/* Opzioni di login/logout e navigazione. */}
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          {currentUser ? (
            <div>
              <Button onClick={logout} size="sm" colorScheme="red" ml={2}>Logout</Button>
              {/* Link per gli insegnanti ai loro post e profilo. */}
              {currentUser.role === 'teacher' && (
                <Link to="/post" style={{ textDecoration: 'none' }}>
                  <Button size="sm" ml={2}>I miei Post</Button>
                </Link>
              )}
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <Button size="sm" ml={2}>Vai al mio profilo</Button>
              </Link>
            </div>
          ) : (
            <div>
              {/* Opzioni per utenti non loggati. */}
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button size="sm">Accedi</Button>
              </Link>
              <Link to="/registration" style={{ textDecoration: 'none', marginLeft: '5px' }}>
                <Button size="sm">Crea un account</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Titolo della sezione annunci. */}
        <h1 style={{ fontSize: '1.5rem', marginBottom: '20px', paddingLeft: '10px', fontWeight: 'bold' }}>Annunci</h1>
        {/* Mappa i post in componenti visualizzabili. */}
        {posts.map((post, index) => (
          <Box key={index} p={4} mb={4} bg="gray.100" rounded="md">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2' }}>
              {/* Foto profilo dell'insegnante. */}
              {post.authorProfilePhotoPath && (
                <Image
                  src={`http://localhost:5000/${post.authorProfilePhotoPath}`}
                  alt="Foto Profilo"
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius="full"
                  marginRight="4"
                />
              )}
              <Text fontWeight="bold">Insegnante {post.authorName}</Text>
            </div>
            <Text mb={2}>{post.content}</Text>
            {/* Opzione di contatto se disponibile. */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {post.authorEmail && currentUser && (
                <a href={`mailto:${post.authorEmail}`}>
                  <Button size="sm">Contattami</Button>
                </a>
              )}
            </div>
          </Box>
        ))}
      </div>
    </Layout>
  );
}

export default HomePage;
