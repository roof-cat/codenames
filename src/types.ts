export type CardType = 'red' | 'blue' | 'neutral' | 'assassin';

export interface Card {
  id: number;
  imageUrl: string;
  type: CardType;
  isRevealed: boolean;
}

export interface GameState {
  cards: Card[];
  currentTeam: 'red' | 'blue';
  redScore: number;
  blueScore: number;
  isSpymaster: boolean;
}