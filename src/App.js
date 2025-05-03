import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WalletLogin from './components/WalletLogin';
import FairInterface from './components/FairInterface';
import CanicasGame from './components/games/CanicasGame';
import TiroAlBlancoGame from './components/games/TiroAlBlancoGame';
import FutbolGame from './components/games/FutbolGame';
import PescaGame from './components/games/PescaGame';
import FeriaHome from './components/FeriaHome';
import TiroGolGame from './components/games/TiroGolGame';
import TiroBotellasGame from './components/games/TiroBotellasGame';
import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleConnect = () => {
    // Here we'll implement the wallet connection logic
    setIsConnected(true);
  };

  let content;
  if (!selectedGame) {
    content = <FeriaHome onSelectGame={setSelectedGame} />;
  } else if (selectedGame === 'canicas') {
    content = <CanicasGame />;
  } else if (selectedGame === 'tirogol') {
    content = <TiroGolGame />;
  } else if (selectedGame === 'botellas') {
    content = <TiroBotellasGame />;
  } else if (selectedGame === 'tiro-al-blanco') {
    content = <TiroAlBlancoGame />;
  } else if (selectedGame === 'futbol') {
    content = <FutbolGame />;
  } else if (selectedGame === 'pesca') {
    content = <PescaGame />;
  }

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
          <Route
            path="/game/pesca"
            element={
              isConnected ? (
                <PescaGame />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
        {content}
      </div>
    </Router>
  );
}

export default App; 