import React from 'react';
import { Card as CardType } from '../types';
import Card from './Card';

interface GameBoardProps {
  cards: CardType[];
  isSpymaster: boolean;
  onCardClick: (id: number) => void;
  onRandomImage: (id: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, isSpymaster, onCardClick, onRandomImage }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isSpymaster={isSpymaster}
          onClick={() => onCardClick(card.id)}
          onRandomImage={() => onRandomImage(card.id)}
        />
      ))}
    </div>
  );
};

export default GameBoard;