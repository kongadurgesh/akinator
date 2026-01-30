import { LeaderboardEntry, Guess } from '../types';

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  participantName: string;
  onParticipantNameChange: (name: string) => void;
  onAddParticipant: () => void;
  onFinishGame: () => void;
  guesses: Guess[];
  currentGuessParticipant: string;
  currentGuess: string;
  currentGuessQuestion: number;
  onCurrentGuessParticipantChange: (name: string) => void;
  onCurrentGuessChange: (guess: string) => void;
  onCurrentGuessQuestionChange: (question: number) => void;
  onAddGuess: () => void;
  selectedName: string;
  isNameRevealed: boolean;
}

const Leaderboard = ({
  leaderboard,
  participantName,
  onParticipantNameChange,
  onAddParticipant,
  onFinishGame,
  guesses,
  currentGuessParticipant,
  currentGuess,
  currentGuessQuestion,
  onCurrentGuessParticipantChange,
  onCurrentGuessChange,
  onCurrentGuessQuestionChange,
  onAddGuess,
  selectedName,
  isNameRevealed,
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
  const participantOptions = sortedLeaderboard.map((e) => e.name);
  const isGuessingDisabled = participantOptions.length === 0;

  const handleGuessKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onAddGuess();
    }
  };

  return (
    <div className="w-full h-full overflow-auto p-2 bg-gray-50 flex flex-col">
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

      <div className="flex-1 overflow-auto mb-3">
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

      <button
        onClick={onFinishGame}
        disabled={sortedLeaderboard.length === 0}
        className={`w-full px-2 py-1.5 rounded-md text-xs font-semibold transition-colors mb-2 ${
          sortedLeaderboard.length === 0
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-emerald-600 text-white hover:bg-emerald-700'
        }`}
        tabIndex={0}
        aria-label="Finish game"
      >
        Finish Game
      </button>

      <div className="border-t border-gray-300 pt-2">
        <h3 className="text-sm font-bold mb-2 text-gray-800">Guesses</h3>
        <div className="space-y-1.5 mb-2">
          {isGuessingDisabled ? (
            <input
              type="text"
              value=""
              disabled
              placeholder="Add a participant first"
              className="w-full px-2 py-1.5 border border-gray-300 rounded-md bg-gray-100 text-gray-500 text-xs cursor-not-allowed"
              aria-label="Participant name for guess (disabled)"
            />
          ) : (
            <div className="space-y-1">
              <div className="text-[11px] font-semibold text-gray-700">Choose team</div>
              <div
                className="flex flex-wrap gap-1 max-h-16 overflow-auto rounded-md border border-gray-200 bg-white p-1"
                role="group"
                aria-label="Teams"
              >
                {participantOptions.map((name) => {
                  const isSelected = currentGuessParticipant === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => onCurrentGuessParticipantChange(name)}
                      className={`px-2 py-1 rounded-full text-[11px] font-semibold transition-colors border ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                      aria-pressed={isSelected}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <input
            type="text"
            value={currentGuess}
            onChange={(e) => onCurrentGuessChange(e.target.value)}
            onKeyDown={handleGuessKeyDown}
            disabled={isGuessingDisabled}
            placeholder="Guess the person"
            className={`w-full px-2 py-1.5 border rounded-md focus:outline-none focus:ring-2 text-xs ${
              isGuessingDisabled
                ? 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
                :
              currentGuess.trim() && selectedName.trim() && isNameRevealed
                ? currentGuess.trim().toLowerCase() === selectedName.trim().toLowerCase()
                  ? 'border-green-500 focus:ring-green-500 bg-green-50'
                  : 'border-red-500 focus:ring-red-500 bg-red-50'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            aria-label="Guess the person"
          />
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-700 whitespace-nowrap">Question:</label>
            <select
              value={currentGuessQuestion}
              onChange={(e) => onCurrentGuessQuestionChange(Number(e.target.value))}
              disabled={isGuessingDisabled}
              className="flex-1 px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              aria-label="Question number for guess"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={onAddGuess}
            disabled={isGuessingDisabled || !currentGuessParticipant.trim() || !currentGuess.trim()}
            className={`w-full px-2 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              isGuessingDisabled || !currentGuessParticipant.trim() || !currentGuess.trim()
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
            tabIndex={0}
            aria-label="Add guess"
          >
            Add Guess
          </button>
        </div>
        <div className="space-y-1 max-h-32 overflow-auto">
          {guesses.length === 0 ? (
            <p className="text-gray-500 text-xs text-center py-1">No guesses yet</p>
          ) : (
            guesses.map((guessEntry) => {
              const isCorrect = selectedName.trim() && isNameRevealed &&
                guessEntry.guess.trim().toLowerCase() === selectedName.trim().toLowerCase();
              return (
                <div
                  key={guessEntry.id}
                  className={`bg-white border rounded-md p-1 text-xs ${
                    selectedName.trim() && isNameRevealed
                      ? isCorrect
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{guessEntry.participantName}</span>
                    <span className="text-gray-600">Q{guessEntry.questionNumber}</span>
                  </div>
                  <div className="text-gray-700 mt-0.5">{guessEntry.guess}</div>
                  {selectedName.trim() && isNameRevealed && (
                    <div className={`text-xs font-medium mt-0.5 ${
                      isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
