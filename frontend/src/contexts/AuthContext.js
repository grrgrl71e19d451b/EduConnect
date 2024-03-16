
// Importa React, e suoi componenti.
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 

const AuthContext = createContext();

export function useAuth() {
  // Un hook personalizzato per accedere facilmente al contesto di autentificazione.
  return useContext(AuthContext);
}

// Provider che gestisce lo stato di autenticazione e lo rende disponibile ai componenti figli.
export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthCheckCompleted, setIsAuthCheckCompleted] = useState(false);

  useEffect(() => {
    // Effetto per verificare il token salvato nella local Storage e autenticare l'utente all'avvio dell'app.
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          setCurrentUser(decodedToken); // Imposta l'utente corrente se il token è valido.
        } else {
          logout();
        }
      } catch (error) {
        console.error('Errore durante la decodifica del token:', error);
        logout();
      }
    }
    setIsAuthCheckCompleted(true); // Indica che il controllo iniziale è completato.

    // Imposta un intervallo per verificare periodicamente la scadenza del token.
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          logout(); // Esegue il logout se il token scade.
        }
      }
    }, 60000);

    return () => clearInterval(interval); // Pulisce l'intervallo, per arrestare il controllo della validità del token
  }, []);

  // Funzioni per il login e il logout.
  const login = (token) => {
    localStorage.setItem('token', token);

    const decodedUser = jwtDecode(token);
    setCurrentUser(decodedUser);
    setIsAuthCheckCompleted(true);
  };

  const logout = () => {
    localStorage.removeItem('token');

    setCurrentUser(null);
    setIsAuthCheckCompleted(true);
  };

  // Il valore fornito dal provider include lo stato dell'utente, il controllo di autenticazione, login, logout.
  const value = { currentUser, isAuthCheckCompleted, login, logout };

  // Il componente AuthProvider avvolge i figli per fornire il contesto di autenticazione.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
