Panoramica del Progetto EduConnect

EduConnect è una piattaforma educativa all'avanguardia, creata per facilitare l'interazione tra studenti e tutor. Attraverso un'interfaccia web intuitiva, consente la registrazione, l'accesso, la navigazione e la pubblicazione di annunci di tutoraggio, nonché la personalizzazione dei profili. Si rivolge principalmente a due categorie: Insegnanti e Studenti.
Nella fase di registrazione, si specifica il ruolo: gli Insegnanti possono pubblicare annunci, gestirli e personalizzare il proprio profilo, mentre gli Studenti possono rispondere agli annunci e modificare il proprio profilo. Il punto di forza di EduConnect è il suo motore di ricerca avanzato, che permette di filtrare gli annunci per materia o parole chiave, facilitando la scoperta dell'insegnante perfetto. 
La piattaforma offre anche strumenti avanzati per la gestione del profilo, permettendo agli utenti di aggiornare i loro dati, eccetto nome utente e password, e di eliminare il profilo. Per gli Insegnanti, eliminare il profilo comporta la rimozione di tutti gli annunci, assicurando una gestione delle informazioni sicura ed efficiente.

Tecnologie utilizzate
Backend
•	Node.js e Express.js: La base del backend, con Node.js che fornisce un ambiente di esecuzione JavaScript lato server e Express.js, un framework per creare applicazioni web e API in modo rapido. Questi strumenti semplificano la gestione di richieste HTTP, routing e l'uso di middleware per espandere le funzionalità dell'applicazione.
•	MongoDB e Mongoose: Utilizzando MongoDB, un potente database NoSQL, e Mongoose, che facilita la modellazione dei dati, si ottiene un sistema di gestione dati efficace e versatile. Questa coppia permette di definire schemi per una manipolazione precisa dei dati.
•	Autenticazione e Sicurezza: Sicurezza rinforzata con bcryptjs per l'hashing delle password e jwt per la creazione di sessioni sicure con token, assicurando così l'integrità e la protezione delle informazioni degli utenti.
•	Multer: Integrato per l'upload di file, Multer rende semplice per gli utenti caricare immagini, lavorando in sinergia con il sistema di file del server per una gestione ottimale dei media.
•	CORS e dotenv: CORS abilita la comunicazione tra il frontend e il backend su domini diversi, essenziale per le richieste API, mentre dotenv gestisce le variabili d'ambiente, garantendo una configurazione sicura dell'applicazione.
Frontend
•	React.js: Questa libreria facilita la creazione di una UI dinamica e interattiva, consentendo lo sviluppo di SPA reattive che migliorano l'esperienza utente mantenendo la pagina web agile e veloce.
•	Chakra UI: Offre una vasta gamma di componenti UI pronti all'uso e personalizzabili, agevolando lo sviluppo di interfacce gradevoli ed ergonomiche che si adattano a vari dispositivi.
•	React Router: Fornisce un sistema di routing lato client, permettendo navigazioni fluide e immediate all'interno dell'applicazione senza necessità di ricaricare la pagina, contribuendo a un'esperienza utente coesa e soddisfacente.
•	Jwt-decode: Utile per la decodifica dei token JWT lato client, facilita l'accesso a informazioni critiche dell'utente memorizzate nel token, come identità e permessi, supportando così una gestione avanzata dell'autenticazione e dell'autorizzazione nell'app.

Funzionalità Chiave
1.	Registrazione e Autenticazione: Gli utenti possono registrarsi e autenticarsi, consentendo l'accesso a funzionalità protette, come confermato dai controller per l'autenticazione presenti nel backend.
2.	Gestione Profili: Ogni utente ha la capacità di aggiornare il proprio profilo, inclusa la possibilità di caricare una foto. Questo è supportato dalla presenza di rotte e controller dedicati nel backend, così come dall'implementazione di funzionalità di caricamento file con multer.
3.	Pubblicazione e Gestione Annunci: Gli utenti possono creare annunci relativi a sessioni di tutoraggio e gestirli. Le funzionalità di creazione, visualizzazione e eliminazione dei post sono implementate attraverso specifiche rotte e controller nel backend.
4.	Ricerca Annunci: Esiste una funzionalità di ricerca che permette di trovare annunci filtrandoli per termini specifici. Questo è evidenziato dalla presenza di una rotta di ricerca nel backend che utilizza espressioni regolari per filtrare i post in base al contenuto.
•	Autologout: Un meccanismo per disconnettere automaticamente gli utenti dopo un'ora di inattività, migliorando la sicurezza.

Prerequisiti e Installazione

Prerequisiti
Per avviare il progetto EduConnect, sono necessari i seguenti prerequisiti:
•	Node.js: Un runtime JavaScript necessario per eseguire il codice del server.
•	Mongo Atlas: È richiesto un account su Mongo Atlas per ospitare il database in cloud.
•	Clonare la repository: Clonare il codice sorgente del progetto utilizzando Git. Puoi farlo via HTTP con il comando git clone https://github.com/grrgrl71e19d451b/EduConnect.git   

Installazione
Backend
1.	Apri un terminale e naviga nella cartella del backend usando il comando cd backend.
2.	Installa le dipendenze del progetto eseguendo npm install per scaricare tutti i pacchetti npm necessari.
3.	Avvia il server backend con il comando npm start.
Frontend
1.	Apri un nuovo terminale e naviga nella cartella del frontend con cd frontend.
2.	Come per il backend, installa le dipendenze eseguendo npm install.
3.	Avvia il server frontend con npm start.


Sviluppo
Registrazione
La funzione di registrazione degli utenti è implementata in modo efficace nel backend utilizzando bcryptjs per l'hashing delle password. Questa pratica protegge le credenziali degli utenti, assicurando che le password siano salvate nel database in forma criptata. Questo approccio rafforza la sicurezza dell'applicazione, impedendo l'accesso diretto alle password in caso di violazione dei dati.
Login e Gestione Sessioni
Durante il processo di login, dopo aver verificato le credenziali dell'utente, il sistema genera un token JWT utilizzando jsonwebtoken. Questo token serve come chiave per l'autenticazione delle richieste successive dell'utente, facilitando l'accesso a funzionalità protette senza necessità di login ripetuti. L'adozione dei token JWT rappresenta una soluzione diffusa per la gestione delle sessioni in applicazioni web, combinando sicurezza ed efficienza.
Persistenza della Sessione
Per quanto riguarda la persistenza della sessione, il progetto utilizza il local storage del browser per salvare il token JWT. Questa scelta permette agli utenti di mantenere la propria sessione attiva anche dopo aver chiuso il browser, migliorando l'esperienza utente con un accesso semplificato alle sessioni future. Il local storage fornisce una soluzione conveniente per conservare i dati lato client senza una scadenza predefinita, a differenza del session storage che viene cancellato alla chiusura del browser.

Operazioni CRUD
Per gestire i dati dei servizi offerti e richiesti dall’ applicazione, ho implementato un'architettura REST API per gestire efficacemente i dati dei servizi offerti e richiesti dall'applicazione, utilizzando metodi HTTP standard per accedere e manipolare le risorse. La comunicazione con il backend avviene tramite l'API Fetch di JavaScript, che facilita l'esecuzione di chiamate HTTP asincrone direttamente dal browser, eliminando la necessità di librerie esterne.
Questo approccio si riflette nelle seguenti operazioni CRUD essenziali:
•	POST: Creare nuove entità nel sistema è semplice grazie a route come router.post('/register', registerUser) per la registrazione di utenti e router.post('/posts', createPost) per la pubblicazione di post. Questo metodo ci consente di ampliare le nostre collezioni di dati con nuovi elementi.
•	GET: Per leggere o recuperare dati esistenti, utilizziamo route come router.get('/posts', getAllPosts) per ottenere tutti i post e router.get('/users/:userId', getUser) per accedere ai dettagli di un utente specifico, migliorando così l'esperienza utente con accesso rapido e diretto alle informazioni richieste.
•	PUT: Aggiornare le entità esistenti è gestito tramite route come router.put('/users/:userId', upload.single('photo'), updateUser), che consente di modificare i dettagli dell'utente, inclusa l'immagine del profilo, garantendo che le informazioni rimangano attuali e rilevanti.
•	DELETE: L'eliminazione di entità specifiche è possibile grazie a comandi come router.delete('/posts/:postId', deletePost) e router.delete('/users/:userId', deleteUser), permettendoci di rimuovere dati non più necessari o desiderati, mantenendo così pulito e pertinente il database.


Sicurezza
La protezione efficace dell’applicazione si articola attraverso un approccio che integra misure di sicurezza sia sul frontend che sul backend. 
Sicurezza sul Backend
Il backend di un'applicazione web rappresenta il cuore del suo sistema di elaborazione dati, dove risiedono logiche applicative e informazioni sensibili. Per assicurare una protezione efficace, si adottano diverse strategie:
•	Prevenzione di Injection: L'uso di MongoDB in combinazione con Mongoose offre una robusta difesa contro le iniezioni, un tipo comune di attacco. Mongoose aiuta a validare e strutturare i dati, riducendo i rischi di attacchi tramite modelli definiti.
•	Sanitizzazione e Validazione dei Dati: I dati forniti dagli utenti vengono rigorosamente sanitizzati e validati utilizzando espressioni regolari prima di essere processati dal backend, bloccando così qualsiasi tentativo di exploit tramite dati manipolati.
•	Protezione delle Password: Per la sicurezza delle credenziali utente, si fa affidamento a bcryptjs per l'hashing delle password, rendendole estremamente difficili da decifrare in caso di violazioni del database.
•	Gestione dell'Autenticazione e delle Sessioni: Utilizzando jsonwebtoken, il sistema implementa un meccanismo di autenticazione basato su token che scadono dopo un determinato lasso di tempo, garantendo l'accesso alle risorse solo agli utenti autenticati e prevenendo l'abuso di sessioni non terminate.
Sicurezza sul Frontend
Il frontend, interfaccia utente dell'applicazione, necessita di misure di sicurezza per proteggere le interazioni degli utenti:
•	Autologout: Una funzionalità chiave è il logout automatico, che utilizza i token JWT per determinare periodi di inattività e disconnettere automaticamente gli utenti dopo un'ora di non utilizzo, mitigando i rischi legati alle sessioni lasciate incustodite.
•	Validazione degli Input Lato Client: Implementare la validazione degli input attraverso espressioni regolari previene l'invio di dati dannosi al server, fungendo da primo livello di difesa contro input malevoli.
Integrazione del Middleware di Autenticazione
Al centro della strategia di sicurezza vi è l'integrazione di middleware di autenticazione, che verifica i token JWT per ogni richiesta in entrata. Ciò assicura che solo le richieste autorizzate possano eseguire operazioni sensibili, come la creazione, l'aggiornamento o l'eliminazione di contenuti, rinforzando ulteriormente la sicurezza dell'applicazione.

Conclusione
EduConnect rappresenta un esempio di come tecnologie moderne come Node.js, Express, MongoDB, React, e Chakra UI possono essere combinate per creare applicazioni web robuste e funzionali. Questo approccio dimostra l'efficacia di un'architettura basata su JavaScript sia lato server che client, permettendo lo sviluppo di sistemi che migliorano l'efficienza dello sviluppo e offrono un'esperienza utente fluida.
