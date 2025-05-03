import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WalletLogin from './components/WalletLogin';
import FairInterface from './components/FairInterface';
import CanicasGame from './components/games/CanicasGame';
import TiroAlBlancoGame from './components/games/TiroAlBlancoGame';
import FutbolGame from './components/games/FutbolGame';
import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // Here we'll implement the wallet connection logic
    setIsConnected(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isConnected ? (
                <Navigate to="/fair" replace />
              ) : (
                <WalletLogin onConnect={handleConnect} />
              )
            }
          />
          <Route
            path="/fair"
            element={
              isConnected ? (
                <FairInterface />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/game/canicas"
            element={
              isConnected ? (
                <CanicasGame />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/game/tiro-al-blanco"
            element={
              isConnected ? (
                <TiroAlBlancoGame />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/game/futbol"
            element={
              isConnected ? (
                <FutbolGame />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 