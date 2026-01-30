import { Question } from '../types';

interface QuestionPanelProps {
  questions: Question[];
  onQuestionChange: (id: number, text: string) => void;
  onAnswerChange: (id: number, answer: 'yes' | 'no' | null) => void;
  selectedName: string;
  isNameRevealed: boolean;
  onSelectedNameChange: (name: string) => void;
  onRevealName: () => void;
  selectedByNameInput: string;
  onSelectedByNameChange: (name: string) => void;
}

const QuestionPanel = ({ 
  questions, 
  onQuestionChange, 
  onAnswerChange,
  selectedName,
  isNameRevealed,
  onSelectedNameChange,
  onRevealName,
  selectedByNameInput,
  onSelectedByNameChange
}: QuestionPanelProps) => {
  const handleQuestionInputChange = (id: number, value: string) => {
    onQuestionChange(id, value);
  };

  const handleYesClick = (id: number) => {
    onAnswerChange(id, 'yes');
  };

  const handleNoClick = (id: number) => {
    onAnswerChange(id, 'no');
  };

  const handleKeyDown = (event: React.KeyboardEvent, id: number, answer: 'yes' | 'no') => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onAnswerChange(id, answer);
    }
  };

  return (
    <div className="w-full h-full overflow-auto p-3 bg-white border-l border-r border-gray-300 flex flex-col">
      <h2 className="text-xl font-bold mb-3 text-gray-800">Questions</h2>
      
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-300">
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          Selected Name
        </label>
        <div className="space-y-1.5">
          <input
            type="text"
            value={selectedByNameInput}
            onChange={(e) => onSelectedByNameChange(e.target.value)}
            placeholder="Who chose this person?"
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            aria-label="Person who chose the selected name"
          />
          <div className="flex gap-1.5">
            <input
              type={isNameRevealed ? "text" : "password"}
              value={selectedName}
              onChange={(e) => onSelectedNameChange(e.target.value)}
              placeholder="Enter selected name"
              className="flex-1 px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              aria-label="Selected name input"
            />
            <button
              onClick={onRevealName}
              disabled={!selectedName.trim()}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                !selectedName.trim()
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
              tabIndex={0}
              aria-label={isNameRevealed ? "Hide selected name" : "Reveal selected name"}
            >
              {isNameRevealed ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="space-y-3">
        {questions.map((question) => (
          <div key={question.id} className="space-y-1.5">
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleQuestionInputChange(question.id, e.target.value)}
              placeholder={`Question ${question.id}`}
              className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
              aria-label={`Question ${question.id} input`}
            />
            <div className="flex gap-1.5">
              <button
                onClick={() => handleYesClick(question.id)}
                onKeyDown={(e) => handleKeyDown(e, question.id, 'yes')}
                disabled={question.answer === 'no'}
                className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium text-white transition-all ${
                  question.answer === 'yes'
                    ? 'bg-green-600 shadow-md scale-105'
                    : question.answer === 'no'
                    ? 'bg-gray-400 cursor-not-allowed opacity-50'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
                tabIndex={0}
                aria-label={`Answer yes to question ${question.id}`}
              >
                Yes
              </button>
              <button
                onClick={() => handleNoClick(question.id)}
                onKeyDown={(e) => handleKeyDown(e, question.id, 'no')}
                disabled={question.answer === 'yes'}
                className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium text-white transition-all ${
                  question.answer === 'no'
                    ? 'bg-red-600 shadow-md scale-105'
                    : question.answer === 'yes'
                    ? 'bg-gray-400 cursor-not-allowed opacity-50'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
                tabIndex={0}
                aria-label={`Answer no to question ${question.id}`}
              >
                No
              </button>
              <button
                onClick={() => onAnswerChange(question.id, null)}
                disabled={question.answer === null}
                className={`px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
                  question.answer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
                tabIndex={0}
                aria-label={`Reset answer for question ${question.id}`}
              >
                Reset
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionPanel;
