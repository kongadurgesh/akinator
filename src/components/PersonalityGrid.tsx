import { Personality } from '../types';

interface PersonalityGridProps {
  personalities: Personality[];
  onShuffle: () => void;
}

const PersonalityGrid = ({ personalities, onShuffle }: PersonalityGridProps) => {
  return (
    <div className="w-full h-full flex flex-col p-2 bg-gray-50">
      <div className="flex items-center justify-between mb-1.5">
        <h2 className="text-lg font-bold text-gray-800">Famous Personalities</h2>
        <button
          onClick={onShuffle}
          className="px-4 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next Round
        </button>
      </div>
      <div className="flex-1 grid grid-cols-10 gap-1 auto-rows-fr">
        {personalities.map((personality) => (
          <div
            key={personality.id}
            className="bg-white border border-gray-300 rounded-md p-0.5 text-[9px] font-medium text-gray-700 hover:shadow-md hover:border-blue-500 transition-all cursor-pointer text-center flex items-center justify-center"
            tabIndex={0}
            role="button"
            aria-label={`Personality: ${personality.name}`}
          >
            <span className="line-clamp-2 leading-tight px-0.5">{personality.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalityGrid;
