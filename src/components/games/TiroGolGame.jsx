import React, { useRef, useEffect, useState } from 'react';
import './TiroGolGame.css';

export default function TiroGolGame() {
  const [goals, setGoals] = useState(0);
  const [message, setMessage] = useState('');
  const goalRef = useRef(null);
  const ballRef = useRef(null);
  const [goalPos, setGoalPos] = useState(0);
  const [direction, setDirection] = useState(1);

  // Animate the goal left and right
  useEffect(() => {
    const interval = setInterval(() => {
      setGoalPos(pos => {
        let next = pos + direction * 4;
        if (next > 220 || next < 0) {
          setDirection(d => -d);
          next = pos + -direction * 4;
        }
        return next;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [direction]);

  // Handle shot
  const shoot = () => {
    setMessage('');
    const ball = ballRef.current;
    if (!ball) return;
    ball.style.transition = 'top 0.5s';
    ball.style.top = '60px';
    setTimeout(() => {
      // Check if ball is inside goal
      const ballLeft = ball.offsetLeft;
      const goalLeft = goalPos;
      if (ballLeft > goalLeft && ballLeft < goalLeft + 80) {
        setGoals(g => g + 1);
        setMessage('¡Golazo!');
      } else {
        setMessage('¡Fallaste!');
      }
      ball.style.transition = '';
      ball.style.top = '220px';
    }, 500);
  };

  return (
    <div className="tirogol-bg">
      <h2>Tiro a Gol</h2>
      <div className="tirogol-campo">
        <div
          ref={goalRef}
          className="tirogol-goal"
          style={{ left: goalPos }}
        >
          <div className="tirogol-net" />
        </div>
        <div
          ref={ballRef}
          className="tirogol-ball"
          style={{ left: 120 }}
        />
      </div>
      <button className="tirogol-btn" onClick={shoot}>Patear</button>
      <div className="tirogol-score">Goles: {goals}</div>
      {message && <div className="tirogol-msg">{message}</div>}
    </div>
  );
} 