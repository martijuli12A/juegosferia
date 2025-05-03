import React from 'react';
import { useNavigate } from 'react-router-dom';

const FairInterface = () => {
  const navigate = useNavigate();
  
  const games = [
    {
      id: 'canicas',
      name: 'Juego de Canicas',
      description: '¡Clásico juego de canicas!',
      icon: '🎯',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'tiro-al-blanco',
      name: 'Tiro al Blanco',
      description: 'Demuestra tu puntería',
      icon: '🎯',
      color: 'from-red-400 to-red-600'
    },
    {
      id: 'futbol',
      name: 'Gol Mexicano',
      description: '¡Mete gol en la portería móvil!',
      icon: '⚽',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'pesca',
      name: 'Pesca Mexicana',
      description: 'Pesca los peces más resbaladizos',
      icon: '🎣',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 'pelota-azteca',
      name: 'Pelota Azteca',
      description: 'Juego tradicional prehispánico',
      icon: '🏐',
      color: 'from-yellow-400 to-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Feria Mexicana</h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-yellow-400 rounded-full p-3 md:p-4 shadow-lg">
              <span className="text-xl md:text-2xl">🪙</span>
            </div>
            <p className="text-lg md:text-xl text-white">Monedas: 0</p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => navigate(`/game/${game.id}`)}
              className={`bg-gradient-to-r ${game.color} rounded-xl p-4 md:p-6 shadow-xl transform hover:scale-105 
                         transition-all duration-300 cursor-pointer`}
            >
              <div className="text-4xl md:text-6xl mb-3 md:mb-4 text-center">{game.icon}</div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 text-center">{game.name}</h2>
              <p className="text-white text-center text-sm md:text-base">{game.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FairInterface; 