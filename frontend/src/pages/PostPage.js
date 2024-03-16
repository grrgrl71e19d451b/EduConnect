
// Importazioni necessarie da React, React Router, contesto di autenticazione e Chakra UI.
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, Button, Heading, Textarea, Flex, VStack, Text, Image } from '@chakra-ui/react';

// Importa componenti e funzioni ausiliarie per gestire post e autenticazione.
import Layout from '../components/Layout';
import fetchPosts from '../logic/fetchPosts';
import deletePost from '../logic/deletePost';
import submitPost from '../logic/submitPost';

function PostPage() {

  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');

  const navigate = useNavigate();
  const { currentUser, logout, isAuthCheckCompleted } = useAuth();

  // Effetto per verificare l'autenticazione dell'utente e caricare i suoi post.
  useEffect(() => {
    if (!isAuthCheckCompleted) return;

    if (!currentUser || !currentUser.id) {
      console.log('Redirecting to login: user not authenticated');
      navigate('/login');
      return;
    }

    // Carica i post dell'utente corrente.
    fetchPosts(setPosts, { userId: currentUser.id, token: localStorage.getItem('token') });
  }, [currentUser, isAuthCheckCompleted, navigate]);

  // Gestione della pubblicazione di un nuovo post.
  const handlePostSubmission = async () => {
    try {
      // Attendere il completamento della pubblicazione del post
      await submitPost(currentUser.id, postContent, localStorage.getItem('token'), setPostContent);

      // Dopo la pubblicazione del post, richiama fetchPosts per aggiornare la lista
      await fetchPosts(setPosts, { userId: currentUser.id, token: localStorage.getItem('token') });
    } catch (error) {
      console.error('Errore durante la pubblicazione dell\'annuncio:', error);
      alert('Errore durante la pubblicazione dell\'annuncio. Per favore riprova.');
    }
  };


  // Gestione dell'eliminazione di un post.
  const handlePostDeletion = async (postId) => {
    await deletePost(postId, localStorage.getItem('token'), setPosts, posts);
  };

  // Logout dell'utente.
  const handleLogout = () => {
    logout();
  };

  return (
    <Layout>
      <Box p={6} mb={6} bg="gray.200" rounded="lg">
        <Flex justifyContent="space-between" alignItems="flex-start" mb={4}>
          <Flex flexDirection="column">
            {currentUser && (
              <Heading as="h2" size="lg">Ciao, {currentUser.name}!</Heading>
            )}
            <Heading as="h1" size="2xl" mt={4}>I tuoi Annunci</Heading>
          </Flex>
          <Box>
            <Button onClick={() => navigate('/')} colorScheme="teal" size="sm" mr={2}>Home</Button>
            <Button onClick={handleLogout} colorScheme="red" size="sm">Logout</Button>
          </Box>
        </Flex>
        {/* Textarea per inserire il contenuto del nuovo post. */}
        <Textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Descrivi l'annuncio di tutorato che vuoi pubblicare. Include materie, livelli di competenza e disponibilità."
          rows="4"
          mb={4}
        />
        <Button onClick={handlePostSubmission} colorScheme="blue" mb={8} size="sm">Pubblica Annuncio</Button>
        <VStack spacing={4}>
          {/* Visualizzazione dei post esistenti con la possibilità di eliminarli. */}
          {posts.map((post) => (
            <Box key={post._id} p={5} shadow="md" borderWidth="1px" rounded="md" width="100%">
              {post.authorProfilePhotoPath && (
                <Image
                  src={`http://localhost:5000/${post.authorProfilePhotoPath}`}
                  alt="Foto Profilo"
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius="full"
                  mr={4}
                  float="left"
                />
              )}
              <Text mb={4} style={{ marginLeft: post.authorProfilePhotoPath ? "60px" : "0" }}>{post.content}</Text>
              <Button colorScheme="red" size="sm" onClick={() => handlePostDeletion(post._id)}>
                Elimina Post
              </Button>
            </Box>
          ))}
        </VStack>
      </Box>
    </Layout>
  );
}

export default PostPage;
