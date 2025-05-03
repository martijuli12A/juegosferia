import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AztecCoin from './AztecCoin';
import Phaser from 'phaser';

const GameTemplate = ({ gameId, title, maxScore, onGameComplete, preload, create, update }) => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [game, setGame] = useState(null);
  const [showCoin, setShowCoin] = useState(false);
  const [gameSize, setGameSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateGameSize = () => {
      const isMobile = window.innerWidth <= 768;
      setGameSize({
        width: isMobile ? window.innerWidth - 32 : 800,
        height: isMobile ? (window.innerWidth - 32) * 0.75 : 600
      });
    };

    updateGameSize();
    window.addEventListener('resize', updateGameSize);

    return () => {
      window.removeEventListener('resize', updateGameSize);
    };
  }, []);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: gameSize.width,
      height: gameSize.height,
      parent: 'game',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    const game = new Phaser.Game(config);
    setGame(game);

    return () => {
      game.destroy(true);
    };
  }, [gameSize, preload, create, update]);

  const handleBack = () => {
    navigate('/fair');
  };

  const checkHighScore = (currentScore) => {
    if (currentScore >= maxScore) {
      setShowCoin(true);
      onGameComplete && onGameComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-8 gap-4">
          <button
            onClick={handleBack}
            className="w-full md:w-auto bg-white text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            ← Volver a la Feria
          </button>
          <h1 className="text-2xl md:text-4xl font-bold text-white text-center">{title}</h1>
          <div className="text-xl md:text-2xl font-bold text-white">
            Puntos: {score}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-2 md:p-4">
          <div id="game" className="mx-auto"></div>
        </div>

        {showCoin && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white p-4 md:p-8 rounded-xl text-center w-full max-w-md">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">¡Felicidades!</h2>
              <p className="text-lg md:text-xl mb-6">Has ganado una moneda azteca</p>
              <div className="flex justify-center mb-6">
                <AztecCoin size="lg" />
              </div>
              <button
                onClick={() => setShowCoin(false)}
                className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg"
              >
                Continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameTemplate; 