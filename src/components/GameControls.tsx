import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface GameControlsProps {
  currentTeam: 'red' | 'blue';
  redScore: number;
  blueScore: number;
  isSpymaster: boolean;
  onToggleSpymaster: () => void;
  onNewGame: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  currentTeam,
  redScore,
  blueScore,
  isSpymaster,
  onToggleSpymaster,
  onNewGame,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <span className="font-semibold">{redScore}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-500" />
          <span className="font-semibold">{blueScore}</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSpymaster}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {isSpymaster ? <EyeOff size={20} /> : <Eye size={20} />}
          <span>{isSpymaster ? 'Hide' : 'Show'} Spymaster View</span>
        </button>
        <button
          onClick={onNewGame}
          className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
        >
          New Game
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-medium">Current Team:</span>
        <div className={`w-4 h-4 rounded-full bg-${currentTeam}-500`} />
      </div>
    </div>
  );
};

export default GameControls;