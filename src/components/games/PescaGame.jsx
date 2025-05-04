import React, { useState } from 'react';
import GameTemplate from '../GameTemplate';
import Phaser from 'phaser';

// Tipos de peces mexicanos (formas y colores básicos)
const fishTypes = [
  {
    key: 'axolote',
    color: 0xffb347,
    shape: 'ellipse',
    points: 30,
    catchProb: 0.4,
  },
  {
    key: 'mojarra',
    color: 0x3498db,
    shape: 'ellipse',
    points: 15,
    catchProb: 0.7,
  },
  {
    key: 'bagre',
    color: 0x8e44ad,
    shape: 'ellipse',
    points: 20,
    catchProb: 0.5,
  },
  {
    key: 'charal',
    color: 0x2ecc71,
    shape: 'ellipse',
    points: 10,
    catchProb: 0.85,
  },
  {
    key: 'carpa',
    color: 0xe74c3c,
    shape: 'ellipse',
    points: 25,
    catchProb: 0.6,
  },
];

const HAND_SIZE = 50;
const POND_RADIUS = 160;
const POND_CENTER = { x: 250, y: 270 };
const FISH_COUNT = 7;

const PescaGame = () => {
  const [score, setScore] = useState(0);

  const preload = function() {
    // No assets, solo gráficos básicos
  };

  const create = function() {
    // Fondo de feria
    this.cameras.main.setBackgroundColor('#ffe082');
    this.add.text(120, 20, '¡Pesca de Feria!', { fontSize: '32px', fill: '#c62828', fontFamily: 'monospace' });

    // Dibujar cubeta/estanque circular
    const pond = this.add.graphics();
    pond.fillStyle(0x4fc3f7, 1);
    pond.fillCircle(POND_CENTER.x, POND_CENTER.y, POND_RADIUS);
    pond.lineStyle(8, 0x1565c0, 1);
    pond.strokeCircle(POND_CENTER.x, POND_CENTER.y, POND_RADIUS);

    // Recipiente superior
    const bowl = this.add.graphics();
    bowl.fillStyle(0xffe082, 1);
    bowl.fillRoundedRect(150, 70, 200, 40, 20);
    bowl.lineStyle(4, 0x8d6e63, 1);
    bowl.strokeRoundedRect(150, 70, 200, 40, 20);
    this.add.text(180, 80, 'Peces esperando...', { fontSize: '16px', fill: '#6d4c41' });

    // Crear peces
    const fishes = [];
    for (let i = 0; i < FISH_COUNT; i++) {
      const type = fishTypes[Math.floor(Math.random() * fishTypes.length)];
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
      const r = Phaser.Math.FloatBetween(POND_RADIUS * 0.3, POND_RADIUS * 0.9);
      const x = POND_CENTER.x + Math.cos(angle) * r;
      const y = POND_CENTER.y + Math.sin(angle) * r;
      const fish = this.add.graphics();
      fish.fillStyle(type.color, 1);
      fish.fillEllipse(x, y, 40, 22);
      // Ojos
      fish.fillStyle(0xffffff, 1);
      fish.fillCircle(x + 10, y - 5, 4);
      fish.fillStyle(0x000000, 1);
      fish.fillCircle(x + 11, y - 5, 2);
      // Cola
      fish.fillStyle(type.color, 1);
      fish.fillTriangle(x - 20, y, x - 35, y - 10, x - 35, y + 10);
      // Guardar datos
      fish.setData('type', type);
      fish.setData('x', x);
      fish.setData('y', y);
      fish.setData('caught', false);
      fish.setData('id', i);
      fish.setData('escapeAnim', false);
      fishes.push(fish);
    }
    this.fishes = fishes;

    // Mano
    let hand = null;
    let handTween = null;
    let isMobile = this.sys.game.device.os.android || this.sys.game.device.os.iOS;
    let handActive = false;

    // Animación de puntos flotantes
    const showPoints = (x, y, points) => {
      const txt = this.add.text(x, y, `+${points}`, { fontSize: '22px', fill: '#388e3c', fontWeight: 'bold' });
      this.tweens.add({
        targets: txt,
        y: y - 40,
        alpha: 0,
        duration: 900,
        onComplete: () => txt.destroy(),
      });
    };

    // Animación de escape
    const escapeAnim = (fish) => {
      if (fish.getData('escapeAnim')) return;
      fish.setData('escapeAnim', true);
      this.tweens.add({
        targets: fish,
        alpha: 0.2,
        duration: 200,
        yoyo: true,
        repeat: 2,
        onComplete: () => fish.setData('escapeAnim', false),
      });
    };

    // Lógica de pesca
    const tryCatchFish = (x, y) => {
      if (handActive) return;
      handActive = true;
      // Dibujar mano
      if (hand) hand.destroy();
      hand = this.add.graphics();
      hand.fillStyle(0xfbc02d, 1);
      hand.fillRoundedRect(x - HAND_SIZE / 2, y - HAND_SIZE / 2, HAND_SIZE, HAND_SIZE, 20);
      hand.lineStyle(4, 0x6d4c41, 1);
      hand.strokeRoundedRect(x - HAND_SIZE / 2, y - HAND_SIZE / 2, HAND_SIZE, HAND_SIZE, 20);
      // Animación de "bajar" la mano
      handTween = this.tweens.add({
        targets: hand,
        scaleY: 1.2,
        duration: 180,
        yoyo: true,
        onComplete: () => {
          // Ver si hay pez debajo
          let caught = false;
          fishes.forEach(fish => {
            if (fish.getData('caught')) return;
            const fx = fish.getData('x');
            const fy = fish.getData('y');
            if (Phaser.Math.Distance.Between(x, y, fx, fy) < 30) {
              // Probabilidad de captura
              if (Math.random() < fish.getData('type').catchProb) {
                fish.setData('caught', true);
                fish.clear();
                showPoints(fx, fy, fish.getData('type').points);
                setScore(prev => prev + fish.getData('type').points);
                caught = true;
              } else {
                escapeAnim(fish);
              }
            }
          });
          // Quitar mano
          setTimeout(() => {
            if (hand) hand.destroy();
            handActive = false;
          }, 350);
        }
      });
    };

    // PC: la mano sigue el mouse
    if (!isMobile) {
      this.input.on('pointermove', pointer => {
        if (handActive) return;
        if (hand) hand.destroy();
        hand = this.add.graphics();
        hand.fillStyle(0xfbc02d, 1);
        hand.fillRoundedRect(pointer.x - HAND_SIZE / 2, pointer.y - HAND_SIZE / 2, HAND_SIZE, HAND_SIZE, 20);
        hand.lineStyle(4, 0x6d4c41, 1);
        hand.strokeRoundedRect(pointer.x - HAND_SIZE / 2, pointer.y - HAND_SIZE / 2, HAND_SIZE, HAND_SIZE, 20);
      });
      this.input.on('pointerdown', pointer => {
        tryCatchFish(pointer.x, pointer.y);
      });
    } else {
      // Móvil: al tocar, aparece la mano animada
      this.input.on('pointerdown', pointer => {
        tryCatchFish(pointer.x, pointer.y);
      });
    }
  };

  const update = function() {
    // Nada especial por ahora
  };

  return (
    <GameTemplate
      gameId="pesca"
      title="Pesca Mexicana"
      maxScore={200}
      onGameComplete={() => console.log('Juego completado!')}
      preload={preload}
      create={create}
      update={update}
    />
  );
};

export default PescaGame; 