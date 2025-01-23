import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  isSpymaster: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, isSpymaster, onClick }) => {
  const getBorderColor = () => {
    if (!card.isRevealed && !isSpymaster) return 'border-gray-300';
    switch (card.type) {
      case 'red': return 'border-red-500';
      case 'blue': return 'border-blue-500';
      case 'assassin': return 'border-black';
      default: return 'border-gray-400';
    }
  };

  const getOverlayColor = () => {
    if (!card.isRevealed && !isSpymaster) return 'bg-transparent';
    switch (card.type) {
      case 'red': return 'bg-red-500';
      case 'blue': return 'bg-blue-500';
      case 'assassin': return 'bg-black';
      default: return 'bg-gray-500';
    }
  };

  const handleClick = () => {
    if (!card.isRevealed && !isSpymaster) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={card.isRevealed || isSpymaster}
      className={`
        relative aspect-square w-full rounded-lg border-2 
        ${getBorderColor()} overflow-hidden transition-all 
        ${!card.isRevealed && !isSpymaster ? 'hover:shadow-lg hover:scale-105 cursor-pointer' : 'cursor-default'}
      `}
    >
      <img
        src={card.imageUrl}
        alt="Card"
        className="w-full h-full object-cover"
        draggable="false"
      />
      <div 
        className={`
          absolute inset-0 transition-all pointer-events-none
          ${getOverlayColor()} 
          ${card.isRevealed || isSpymaster ? 'opacity-50' : 'opacity-0'}
        `}
      />
    </button>
  );
};

export default Card;