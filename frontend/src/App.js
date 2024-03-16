
// Importa React, necessario per definire componenti React.
import React from 'react';
// Importa gli strumenti di routing da react-router-dom per navigare tra le pagine.
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ChakraProvider } from '@chakra-ui/react';

// Importa le pagine dell'applicazione.
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AuthenticationPage from './pages/AuthenticationPage';
import RegistrationPage from './pages/RegistrationPage';
import PostPage from './pages/PostPage';

// Definisce la componente App.
function App() {
  return (
    <div className="App">
      <ChakraProvider>
        {/* Router gestisce la navigazione basata su URL all'interno dell'app. */}
        <Router>
          {/* AuthProvider avvolge le Routes per fornire un contesto di autenticazione. */}
          <AuthProvider>
            {/* Routes contiene la definizione di tutte le Route dell'app. */}
            <Routes>
              <Route path="/login" element={<AuthenticationPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/post" element={<PostPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </AuthProvider>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
