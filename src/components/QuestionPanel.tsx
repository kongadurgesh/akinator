import { Question } from '../types';

interface QuestionPanelProps {
  questions: Question[];
  onQuestionChange: (id: number, text: string) => void;
  onAnswerChange: (id: number, answer: 'yes' | 'no') => void;
}

const QuestionPanel = ({ questions, onQuestionChange, onAnswerChange }: QuestionPanelProps) => {
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
    <div className="w-full h-full overflow-auto p-3 bg-white border-l border-r border-gray-300">
      <h2 className="text-xl font-bold mb-3 text-gray-800">Questions</h2>
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
                className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium text-white transition-all ${
                  question.answer === 'yes'
                    ? 'bg-green-600 shadow-md scale-105'
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
                className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium text-white transition-all ${
                  question.answer === 'no'
                    ? 'bg-red-600 shadow-md scale-105'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
                tabIndex={0}
                aria-label={`Answer no to question ${question.id}`}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPanel;
