import React, { useState } from 'react';
import { GameState, Card } from './types';
import GameBoard from './components/GameBoard';
import GameControls from './components/GameControls';

const TOTAL_CARDS = 25;
const IMAGES = Array.from({ length: 25 }, (_, i) => 
  `https://img.randme.me/?${i + 1}`
  //`https://picsum.photos/seed/${Math.random()}/300/300`
);

function generateCards(): Card[] {
  const cards: Card[] = [];
  const shuffledImages = [...IMAGES].sort(() => Math.random() - 0.5);
  
  // Distribute card types
  const types: Card['type'][] = [
    ...Array(9).fill('red'),
    ...Array(8).fill('blue'),
    ...Array(7).fill('neutral'),
    'assassin'
  ];
  
  const shuffledTypes = types.sort(() => Math.random() - 0.5);

  for (let i = 0; i < TOTAL_CARDS; i++) {
    cards.push({
      id: i,
      imageUrl: shuffledImages[i],
      type: shuffledTypes[i],
      isRevealed: false
    });
  }

  return cards;
}

function App() {
  const [gameState, setGameState] = useState<GameState>({
    cards: generateCards(),
    currentTeam: Math.random() < 0.5 ? 'red' : 'blue',
    redScore: 9,
    blueScore: 8,
    isSpymaster: false
  });

  const handleCardClick = (id: number) => {
    setGameState(prev => {
      // Find the clicked card
      const clickedCard = prev.cards.find(card => card.id === id);
      
      // If card is already revealed or not found, return current state
      if (!clickedCard || clickedCard.isRevealed) return prev;

      // Create new cards array with the clicked card revealed
      const newCards = prev.cards.map(card =>
        card.id === id ? { ...card, isRevealed: true } : card
      );

      let { currentTeam, redScore, blueScore } = prev;

      // Update game state based on card type
      if (clickedCard.type === 'assassin') {
        // Game over - reveal all cards
        newCards.forEach(card => card.isRevealed = true);
      } else if (clickedCard.type === 'red') {
        redScore--;
        if (currentTeam !== 'red') currentTeam = 'red';
      } else if (clickedCard.type === 'blue') {
        blueScore--;
        if (currentTeam !== 'blue') currentTeam = 'blue';
      } else {
        // Neutral card - switch teams
        currentTeam = currentTeam === 'red' ? 'blue' : 'red';
      }

      return {
        ...prev,
        cards: newCards,
        currentTeam,
        redScore,
        blueScore
      };
    });
  };

  const handleNewGame = () => {
    setGameState({
      cards: generateCards(),
      currentTeam: Math.random() < 0.5 ? 'red' : 'blue',
      redScore: 9,
      blueScore: 8,
      isSpymaster: false
    });
  };

  const toggleSpymaster = () => {
    setGameState(prev => ({
      ...prev,
      isSpymaster: !prev.isSpymaster
    }));
  };

  const handleRandomImage = (id: number) => {
    setGameState(prev => {
      const newCards = prev.cards.map(card => {
        if (card.id === id) {
          const url = new URL(card.imageUrl);
          url.searchParams.set('random', Math.random().toString());
          return { ...card, imageUrl: url.toString() };
        }
        return card;
      });
      return { ...prev, cards: newCards };
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <GameControls
        currentTeam={gameState.currentTeam}
        redScore={gameState.redScore}
        blueScore={gameState.blueScore}
        isSpymaster={gameState.isSpymaster}
        onToggleSpymaster={toggleSpymaster}
        onNewGame={handleNewGame}
      />
      <GameBoard
        cards={gameState.cards}
        isSpymaster={gameState.isSpymaster}
        onCardClick={handleCardClick}
        onRandomImage={handleRandomImage}
      />
    </div>
  );
}

export default App;