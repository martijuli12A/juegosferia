import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './CanicasGame.css';

const CanicasGame = ({ contract, account }) => {
  const [marblesInCircle, setMarblesInCircle] = useState(1);
  const [betAmount, setBetAmount] = useState('0.01');
  const [gameStatus, setGameStatus] = useState('');
  const [playerBalance, setPlayerBalance] = useState('0');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contract && account) {
      loadPlayerBalance();
    }
  }, [contract, account]);

  const loadPlayerBalance = async () => {
    try {
      const balance = await contract.getPlayerBalance();
      setPlayerBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error('Error loading balance:', error);
    }
  };

  const startGame = async () => {
    try {
      setLoading(true);
      setGameStatus('Iniciando juego...');
      
      const tx = await contract.startGame(marblesInCircle, {
        value: ethers.utils.parseEther(betAmount)
      });
      
      await tx.wait();
      setGameStatus('Juego iniciado! Esperando resultado...');
      
      // Listen for game result
      contract.on('GameResult', (gameId, player, won, prize) => {
        if (player.toLowerCase() === account.toLowerCase()) {
          setGameStatus(won ? '¡Ganaste!' : 'Perdiste...');
          loadPlayerBalance();
        }
      });
    } catch (error) {
      console.error('Error starting game:', error);
      setGameStatus('Error al iniciar el juego');
    } finally {
      setLoading(false);
    }
  };

  const withdrawBalance = async () => {
    try {
      setLoading(true);
      const tx = await contract.withdrawBalance();
      await tx.wait();
      setGameStatus('Balance retirado exitosamente');
      loadPlayerBalance();
    } catch (error) {
      console.error('Error withdrawing balance:', error);
      setGameStatus('Error al retirar balance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="canicas-game">
      <h2>Juego de Canicas</h2>
      
      <div className="game-info">
        <p>Balance: {playerBalance} ETH</p>
        <p>Estado: {gameStatus}</p>
      </div>

      <div className="game-controls">
        <div className="input-group">
          <label>Número de canicas (1-10):</label>
          <input
            type="number"
            min="1"
            max="10"
            value={marblesInCircle}
            onChange={(e) => setMarblesInCircle(parseInt(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label>Apuesta (ETH):</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
          />
        </div>

        <button
          onClick={startGame}
          disabled={loading || !account}
          className="play-button"
        >
          {loading ? 'Cargando...' : 'Jugar'}
        </button>

        <button
          onClick={withdrawBalance}
          disabled={loading || !account || playerBalance === '0'}
          className="withdraw-button"
        >
          Retirar Balance
        </button>
      </div>
    </div>
  );
};

export default CanicasGame; 