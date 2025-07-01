import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Casino from './pages/Casino';
import Slot from './pages/Slot';
import Login from './pages/Login';
import Tournaments from './pages/Tournaments';
import ChatBot from './components/ChatBot';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};
initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/casino" element={<Casino />} />
        <Route path="/slot/:id" element={<Slot />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/tournaments" element={<Tournaments />} />
      </Routes>
      <ChatBot />
    </Router>
  );
}

export default App;