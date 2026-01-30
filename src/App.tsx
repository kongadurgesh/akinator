import { useState, useEffect } from 'react';
import PersonalityGrid from './components/PersonalityGrid';
import QuestionPanel from './components/QuestionPanel';
import Leaderboard from './components/Leaderboard';
import { Personality, Question, LeaderboardEntry, Guess } from './types';
import { fetchFamousPersonalities } from './services/personalityApi';

const App = () => {
  const [personalities, setPersonalities] = useState<Personality[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [participantName, setParticipantName] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedByName, setSelectedByName] = useState('');
  const [selectedByNameInput, setSelectedByNameInput] = useState('');
  const [isNameRevealed, setIsNameRevealed] = useState(false);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuessParticipant, setCurrentGuessParticipant] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentGuessQuestion, setCurrentGuessQuestion] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [finishModalTitle, setFinishModalTitle] = useState('');
  const [finishModalSubtitle, setFinishModalSubtitle] = useState('');
  const [hasCalculatedScoresForRound, setHasCalculatedScoresForRound] = useState(false);

  const createEmptyQuestions = (): Question[] =>
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      text: '',
      answer: null,
    }));

  useEffect(() => {
    const loadPersonalities = async () => {
      setLoading(true);
      try {
        const fetchedPersonalities = await fetchFamousPersonalities(100);
        setPersonalities(fetchedPersonalities);
      } catch (error) {
        console.error('Error loading personalities:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPersonalities();
  }, []);

  useEffect(() => {
    setQuestions(createEmptyQuestions());
  }, []);

  useEffect(() => {
    // Auto-select a team for guesses when participants exist
    if (!currentGuessParticipant.trim() && leaderboard.length > 0) {
      setCurrentGuessParticipant(leaderboard[0].name);
    }
  }, [leaderboard, currentGuessParticipant]);

  const resetAllSections = async () => {
    setLeaderboard([]);
    setParticipantName('');

    setQuestions(createEmptyQuestions());

    setGuesses([]);
    setCurrentGuessParticipant('');
    setCurrentGuess('');
    setCurrentGuessQuestion(1);

    setSelectedName('');
    setSelectedByName('');
    setSelectedByNameInput('');
    setIsNameRevealed(false);
    setHasCalculatedScoresForRound(false);

    setLoading(true);
    try {
      const fetchedPersonalities = await fetchFamousPersonalities(100);
      setPersonalities(fetchedPersonalities);
    } catch (error) {
      console.error('Error resetting game:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionChange = (id: number, text: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, text } : q))
    );
  };

  const handleAnswerChange = (id: number, answer: 'yes' | 'no' | null) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, answer } : q))
    );
  };

  const handleParticipantNameChange = (name: string) => {
    setParticipantName(name);
  };

  const handleAddParticipant = () => {
    if (!participantName.trim()) {
      return;
    }

    const answeredQuestions = questions.filter((q) => q.answer !== null);
    const score = answeredQuestions.length;

    const newEntry: LeaderboardEntry = {
      id: `entry-${Date.now()}`,
      name: participantName.trim(),
      score,
      timestamp: Date.now(),
    };

    setLeaderboard((prev) => [...prev, newEntry]);
    setCurrentGuessParticipant((prev) => (prev.trim() ? prev : newEntry.name));
    setParticipantName('');

    setQuestions((prev) =>
      prev.map((q) => ({ ...q, text: '', answer: null }))
    );
    setGuesses([]);
    setSelectedName('');
    setSelectedByName('');
    setSelectedByNameInput('');
    setIsNameRevealed(false);
    setHasCalculatedScoresForRound(false);
  };

  const handleShuffle = async () => {
    setLoading(true);
    // Reset the current round state on shuffle
    setGuesses([]);
    setCurrentGuess('');
    setCurrentGuessQuestion(1);
    setSelectedName('');
    setSelectedByName('');
    setSelectedByNameInput('');
    setIsNameRevealed(false);
    setHasCalculatedScoresForRound(false);
    try {
      const fetchedPersonalities = await fetchFamousPersonalities(100);
      setPersonalities(fetchedPersonalities);
    } catch (error) {
      console.error('Error shuffling personalities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectedNameChange = (name: string) => {
    setSelectedName(name);
    setIsNameRevealed(false);
    setHasCalculatedScoresForRound(false);
  };

  const handleSelectedByNameChange = (name: string) => {
    setSelectedByNameInput(name);
  };

  const handleRevealName = () => {
    if (!isNameRevealed && !hasCalculatedScoresForRound) {
      // Set the person who chose the name when revealing
      if (selectedByNameInput.trim()) {
        setSelectedByName(selectedByNameInput.trim());
      }
      // When revealing, calculate scores for all guesses
      calculateScores();
    }
    setIsNameRevealed((prev) => !prev);
  };

  const calculateScores = () => {
    if (!selectedName.trim()) return;

    const updatedLeaderboard = [...leaderboard];

    const normalizedSelectedName = selectedName.trim().toLowerCase();
    const chooserName = selectedByName.trim();
    const hasAnyIncorrectGuess = guesses.some(
      (g) => g.guess.trim().toLowerCase() !== normalizedSelectedName
    );

    guesses.forEach((guessEntry) => {
      const isCorrect = guessEntry.guess.trim().toLowerCase() === normalizedSelectedName;
      if (!isCorrect) return;

      const guesserIndex = updatedLeaderboard.findIndex(
        (e) => e.name === guessEntry.participantName
      );

      const points =
        guessEntry.questionNumber <= 5
          ? 1000
          : Math.max(0, 1000 - 100 * (guessEntry.questionNumber - 5));

      if (guesserIndex !== -1) {
        updatedLeaderboard[guesserIndex].score += points;
      } else {
        updatedLeaderboard.push({
          id: `entry-${Date.now()}-${guessEntry.participantName}`,
          name: guessEntry.participantName,
          score: points,
          timestamp: Date.now(),
        });
      }
    });

    // Chooser gets ONLY +1000 total if there is at least one incorrect guess in the round.
    // No "deduction" points are added to the chooser.
    if (hasAnyIncorrectGuess && chooserName) {
      const chooserIndex = updatedLeaderboard.findIndex((e) => e.name === chooserName);
      if (chooserIndex !== -1) {
        updatedLeaderboard[chooserIndex].score += 1000;
      } else {
        updatedLeaderboard.push({
          id: `entry-${Date.now()}-${chooserName}`,
          name: chooserName,
          score: 1000,
          timestamp: Date.now(),
        });
      }
    }

    setLeaderboard(updatedLeaderboard);
    setHasCalculatedScoresForRound(true);
  };

  const handleAddGuess = () => {
    if (!currentGuessParticipant.trim() || !currentGuess.trim()) {
      return;
    }

    const newGuess: Guess = {
      id: `guess-${Date.now()}`,
      participantName: currentGuessParticipant.trim(),
      guess: currentGuess.trim(),
      questionNumber: currentGuessQuestion,
      timestamp: Date.now(),
    };

    setGuesses((prev) => [...prev, newGuess]);
    setCurrentGuess('');
    setCurrentGuessQuestion(1);
  };

  const handleFinishGame = () => {
    if (leaderboard.length === 0) return;

    const maxScore = Math.max(...leaderboard.map((e) => e.score));
    const winners = leaderboard
      .filter((e) => e.score === maxScore)
      .map((e) => e.name);

    if (winners.length === 1) {
      setFinishModalTitle(`Winner: ${winners[0]}`);
      setFinishModalSubtitle(`Score: ${maxScore}`);
    } else {
      setFinishModalTitle(`It's a tie!`);
      setFinishModalSubtitle(`Winners: ${winners.join(', ')} (Score: ${maxScore})`);
    }

    setIsFinishModalOpen(true);
  };

  const handleCloseFinishModal = async () => {
    setIsFinishModalOpen(false);
    setFinishModalTitle('');
    setFinishModalSubtitle('');
    await resetAllSections();
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading personalities...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-screen h-screen flex bg-gray-100 overflow-hidden">
        <div className="w-[60%] h-full border-r border-gray-300">
          <PersonalityGrid personalities={personalities} onShuffle={handleShuffle} />
        </div>
        
        <div className="w-[25%] h-full border-r border-gray-300">
          <QuestionPanel
            questions={questions}
            onQuestionChange={handleQuestionChange}
            onAnswerChange={handleAnswerChange}
            selectedName={selectedName}
            isNameRevealed={isNameRevealed}
            onSelectedNameChange={handleSelectedNameChange}
            onRevealName={handleRevealName}
            selectedByNameInput={selectedByNameInput}
            onSelectedByNameChange={handleSelectedByNameChange}
          />
        </div>
        
        <div className="w-[15%] h-full">
          <Leaderboard
            leaderboard={leaderboard}
            participantName={participantName}
            onParticipantNameChange={handleParticipantNameChange}
            onAddParticipant={handleAddParticipant}
            onFinishGame={handleFinishGame}
            guesses={guesses}
            currentGuessParticipant={currentGuessParticipant}
            currentGuess={currentGuess}
            currentGuessQuestion={currentGuessQuestion}
            onCurrentGuessParticipantChange={setCurrentGuessParticipant}
            onCurrentGuessChange={setCurrentGuess}
            onCurrentGuessQuestionChange={setCurrentGuessQuestion}
            onAddGuess={handleAddGuess}
            selectedName={selectedName}
            isNameRevealed={isNameRevealed}
          />
        </div>
      </div>

      {isFinishModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Game finished modal"
          onClick={handleCloseFinishModal}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white shadow-xl border border-gray-200 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-900">{finishModalTitle}</h3>
            <p className="mt-1 text-sm text-gray-600">{finishModalSubtitle}</p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseFinishModal}
                className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
