import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GameSelection.css';

const GameSelection = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'canicas',
      name: 'Canicas',
      image: '/assets/canicas/booth.svg',
      description: '¡Demuestra tu puntería con las canicas!'
    },
    {
      id: 'futbol',
      name: 'Fútbol',
      image: '/assets/futbol/booth.svg',
      description: '¡Mete goles y gana premios!'
    },
    {
      id: 'pesca',
      name: 'Pesca',
      image: '/assets/pesca/booth.svg',
      description: '¡Pesca los peces más grandes!'
    },
    {
      id: 'tiro',
      name: 'Tiro al Blanco',
      image: '/assets/tiro/booth.svg',
      description: '¡Demuestra tu puntería!'
    }
  ];

  return (
    <div className="game-selection-container">
      <h1 className="game-selection-title">¡Bienvenido a la Feria!</h1>
      <div className="game-grid">
        {games.map((game) => (
          <div 
            key={game.id} 
            className="game-booth"
            onClick={() => navigate(`/game/${game.id}`)}
          >
            <div className="booth-image">
              <img src={game.image} alt={game.name} />
            </div>
            <div className="booth-info">
              <h3>{game.name}</h3>
              <p>{game.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSelection; 