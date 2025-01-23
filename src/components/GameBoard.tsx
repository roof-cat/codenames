import React from 'react';
import { Card as CardType } from '../types';
import Card from './Card';

interface GameBoardProps {
  cards: CardType[];
  isSpymaster: boolean;
  onCardClick: (id: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, isSpymaster, onCardClick }) => {
  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isSpymaster={isSpymaster}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
};

export default GameBoard;