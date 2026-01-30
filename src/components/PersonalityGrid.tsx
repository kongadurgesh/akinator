import { Personality } from '../types';

interface PersonalityGridProps {
  personalities: Personality[];
  onShuffle: () => void;
  onShowRules: () => void;
  markerMode: 'green' | 'red' | null;
  onMarkerModeChange: (mode: 'green' | 'red' | null) => void;
  greenMarkedPersonalities: Set<string>;
  redMarkedPersonalities: Set<string>;
  onPersonalityClick: (personalityId: string) => void;
}

const PersonalityGrid = ({ 
  personalities, 
  onShuffle, 
  onShowRules,
  markerMode,
  onMarkerModeChange,
  greenMarkedPersonalities,
  redMarkedPersonalities,
  onPersonalityClick,
}: PersonalityGridProps) => {
  return (
    <div className="w-full h-full flex flex-col p-2 bg-gray-50">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-800">Famous Personalities</h2>
        </div>
        <div className="flex items-center gap-2">
        <button
            onClick={() => onMarkerModeChange(markerMode === 'green' ? null : 'green')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              markerMode === 'green'
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
            aria-label="Green marker mode"
          >
            Green
          </button>
          <button
            onClick={() => onMarkerModeChange(markerMode === 'red' ? null : 'red')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
              markerMode === 'red'
                ? 'bg-red-600 text-white'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
            aria-label="Red marker mode"
          >
            Red
          </button>
          <button
            onClick={onShowRules}
            className="px-3 py-1.5 bg-white text-gray-800 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Open rules and points system"
          >
            Rules
          </button>
          <button
            onClick={onShuffle}
            className="px-4 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Next round"
          >
            Next Round
          </button>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-10 gap-1 auto-rows-fr">
        {personalities.map((personality) => {
          const isGreen = greenMarkedPersonalities.has(personality.id);
          const isRed = redMarkedPersonalities.has(personality.id);
          
          return (
            <div
              key={personality.id}
              onClick={() => onPersonalityClick(personality.id)}
              className={`rounded-md p-0.5 text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center ${
                isGreen
                  ? 'bg-green-200 border-2 border-green-500 text-green-900 hover:bg-green-300'
                  : isRed
                  ? 'bg-red-200 border-2 border-red-500 text-red-900 hover:bg-red-300'
                  : 'bg-white border border-gray-300 text-gray-700 hover:shadow-md hover:border-blue-500'
              }`}
              tabIndex={0}
              role="button"
              aria-label={`Personality: ${personality.name}`}
            >
              <span className="line-clamp-2 leading-tight px-0.5 font-bold">{personality.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalityGrid;
