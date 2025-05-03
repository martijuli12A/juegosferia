import React, { useState } from 'react';
import './TiroBotellasGame.css';

const initialBottles = [
  { id: 1, points: 200 },
  { id: 2, points: 100 },
  { id: 3, points: 100 },
  { id: 4, points: 50 },
  { id: 5, points: 50 },
  { id: 6, points: 50 },
  { id: 7, points: 100 },
  { id: 8, points: 50 },
  { id: 9, points: 50 },
  { id: 10, points: 100 },
  { id: 11, points: 200 },
];

export default function TiroBotellasGame() {
  const [bottles, setBottles] = useState(initialBottles);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  const throwBall = () => {
    if (bottles.length === 0) {
      setMessage('¡Ya no quedan botellas!');
      return;
    }
    // Derriba una botella aleatoria
    const idx = Math.floor(Math.random() * bottles.length);
    const bottle = bottles[idx];
    setScore(s => s + bottle.points);
    setBottles(bottles.filter((_, i) => i !== idx));
    setMessage(`¡Derribaste una botella de ${bottle.points} puntos!`);
  };

  return (
    <div className="botellas-bg">
      <h2>Tiro de Botellas</h2>
      <div className="botellas-pyramid">
        {bottles.map((b, i) => (
          <div key={b.id} className="botella" style={{ '--i': i }}>
            <span>{b.points}</span>
          </div>
        ))}
      </div>
      <button className="botellas-btn" onClick={throwBall} disabled={bottles.length === 0}>
        Lanzar pelota
      </button>
      <div className="botellas-score">Puntaje: {score}</div>
      {message && <div className="botellas-msg">{message}</div>}
    </div>
  );
} 