
// Importazione di React per poter utilizzare JSX.
import React from 'react';
import { Container } from '@chakra-ui/react';

// Definizione del componente funzionale Layout che accetta i children come props.
const Layout = ({ children }) => {
  // Renderizzazione del componente Layout.
  return (

    <>
      {/* Container di Chakra UI che definisce un contenitore per i children  */}
      <Container maxW="container.xl" pt="8" pb="8">
        {children}
      </Container>
    </>
  );
};

export default Layout; 
