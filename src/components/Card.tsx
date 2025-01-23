import React, { useState } from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  isSpymaster: boolean;
  onClick: () => void;
  onRandomImage: () => void;
}

const Card: React.FC<CardProps> = ({ card, isSpymaster, onClick, onRandomImage }) => {
  const [showPreview, setShowPreview] = useState(false);

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

  const handleRandomImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRandomImage();
  };

  return (
    <div className="relative">
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
        <div className={`absolute inset-0 ${getOverlayColor()} opacity-60`} />
        <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
          {card.word}
        </span>
      </button>
      <div className="absolute top-1 right-1 flex gap-1">
        <button
          onClick={() => setShowPreview(true)}
          className="bg-white/80 hover:bg-white p-1 rounded-full shadow-md"
          title="Preview image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={handleRandomImage}
          className="bg-white/80 hover:bg-white p-1 rounded-full shadow-md"
          title="Change image randomly"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowPreview(false)}>
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={card.imageUrl}
              alt="Card Preview"
              className="rounded-lg shadow-2xl object-contain max-w-full max-h-[90vh]"
            />
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;