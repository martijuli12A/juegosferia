import React from 'react';
import './FeriaHome.css';

const games = [
  {
    id: 'canicas',
    name: 'Canicas',
    image: '/assets/canicas/booth.svg',
    description: '¡Gana canicas y apuesta!'
  },
  {
    id: 'tirogol',
    name: 'Tiro a Gol',
    image: '/assets/tirogol/booth.svg',
    description: '¡Anota goles en la portería móvil!'
  },
  {
    id: 'botellas',
    name: 'Tiro de Botellas',
    image: '/assets/botellas/booth.svg',
    description: '¡Derriba botellas y suma puntos!'
  }
];

export default function FeriaHome({ onSelectGame }) {
  return (
    <div className="feria-bg">
      <header className="feria-header">
        <img src="/assets/feria/wheel.svg" alt="Rueda de la fortuna" className="feria-wheel" />
        <h1 className="feria-title">JUEGOS XIPE TOTEC</h1>
        <img src="/assets/feria/carousel.svg" alt="Carrusel" className="feria-carousel" />
      </header>
      <div className="feria-games">
        {games.map(game => (
          <div key={game.id} className="feria-booth" onClick={() => onSelectGame(game.id)}>
            <img src={game.image} alt={game.name} className="booth-img" />
            <h2>{game.name}</h2>
            <p>{game.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 