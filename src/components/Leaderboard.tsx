import { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  participantName: string;
  onParticipantNameChange: (name: string) => void;
  onAddParticipant: () => void;
}

const Leaderboard = ({
  leaderboard,
  participantName,
  onParticipantNameChange,
  onAddParticipant,
}: LeaderboardProps) => {
  const handleNameInputChange = (value: string) => {
    onParticipantNameChange(value);
  };

  const handleAddClick = () => {
    onAddParticipant();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onAddParticipant();
    }
  };

  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full h-full overflow-auto p-2 bg-gray-50">
      <h2 className="text-lg font-bold mb-2 text-gray-800">Leaderboard</h2>
      
      <div className="mb-2 space-y-1.5">
        <input
          type="text"
          value={participantName}
          onChange={(e) => handleNameInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter name"
          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
          aria-label="Participant name input"
        />
        <button
          onClick={handleAddClick}
          className="w-full px-2 py-1.5 bg-blue-500 text-white rounded-md text-xs font-semibold hover:bg-blue-600 transition-colors"
          tabIndex={0}
          aria-label="Add participant to leaderboard"
        >
          Add
        </button>
      </div>

      <div className="space-y-1">
        {sortedLeaderboard.length === 0 ? (
          <p className="text-gray-500 text-xs text-center py-2">No participants yet</p>
        ) : (
          sortedLeaderboard.map((entry, index) => (
            <div
              key={entry.id}
              className="bg-white border border-gray-300 rounded-md p-1.5 flex justify-between items-center"
            >
              <div className="flex items-center gap-1 flex-1 min-w-0">
                <span className="font-bold text-gray-600 text-xs">#{index + 1}</span>
                <span className="text-xs font-medium text-gray-800 truncate">{entry.name}</span>
              </div>
              <span className="text-xs font-semibold text-blue-600 ml-1">{entry.score}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
