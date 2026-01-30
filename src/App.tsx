import { useState, useEffect } from 'react';
import PersonalityGrid from './components/PersonalityGrid';
import QuestionPanel from './components/QuestionPanel';
import Leaderboard from './components/Leaderboard';
import Rules from './components/Rules';
import { Personality, Question, LeaderboardEntry, Guess } from './types';
import { fetchFamousPersonalities } from './services/personalityApi';

const App = () => {
  const [activeView, setActiveView] = useState<'game' | 'rules'>('game');
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
  const [loading, setLoading] = useState(true);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [finishModalTitle, setFinishModalTitle] = useState('');
  const [finishModalSubtitle, setFinishModalSubtitle] = useState('');
  const [hasCalculatedScoresForRound, setHasCalculatedScoresForRound] = useState(false);
  const [markerMode, setMarkerMode] = useState<'green' | 'red' | null>(null);
  const [greenMarkedPersonalities, setGreenMarkedPersonalities] = useState<Set<string>>(new Set());
  const [redMarkedPersonalities, setRedMarkedPersonalities] = useState<Set<string>>(new Set());
  const [previousRoundNames, setPreviousRoundNames] = useState<Set<string>>(new Set());

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
        const fetchedPersonalities = await fetchFamousPersonalities(100, previousRoundNames);
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

    const newEntry: LeaderboardEntry = {
      id: `entry-${Date.now()}`,
      name: participantName.trim(),
      score: 0,
      timestamp: Date.now(),
    };

    setLeaderboard((prev) => [...prev, newEntry]);
    setCurrentGuessParticipant((prev) => (prev.trim() ? prev : newEntry.name));
    setParticipantName('');
  };

  const handleRemoveParticipant = (participantId: string) => {
    // Find the participant to remove
    const participantToRemove = leaderboard.find((entry) => entry.id === participantId);
    if (!participantToRemove) return;

    // Remove from leaderboard
    setLeaderboard((prev) => prev.filter((entry) => entry.id !== participantId));

    // Remove their guesses
    setGuesses((prev) => prev.filter((guess) => guess.participantName !== participantToRemove.name));

    // If this participant was selected for guessing, clear or select another
    if (currentGuessParticipant === participantToRemove.name) {
      const remainingParticipants = leaderboard
        .filter((entry) => entry.id !== participantId)
        .map((entry) => entry.name);
      if (remainingParticipants.length > 0) {
        setCurrentGuessParticipant(remainingParticipants[0]);
      } else {
        setCurrentGuessParticipant('');
      }
    }

    // If this participant was the chooser, clear chooser info
    if (selectedByName === participantToRemove.name) {
      setSelectedByName('');
      setSelectedByNameInput('');
    }
  };

  const handleShuffle = async () => {
    setLoading(true);
    // Reset the current round state on shuffle
    setGuesses([]);
    setCurrentGuess('');
    setSelectedName('');
    setSelectedByName('');
    setSelectedByNameInput('');
    setIsNameRevealed(false);
    setHasCalculatedScoresForRound(false);
    setQuestions(createEmptyQuestions());
    // Clear marked personalities
    setGreenMarkedPersonalities(new Set());
    setRedMarkedPersonalities(new Set());
    setMarkerMode(null);
    
    // Track current round's personalities to exclude in next round
    const currentRoundNames = new Set(personalities.map(p => p.name.toLowerCase()));
    
    try {
      // Fetch new personalities excluding only the previous round's names
      const fetchedPersonalities = await fetchFamousPersonalities(100, previousRoundNames);
      setPersonalities(fetchedPersonalities);
      // Update previous round names to current round for next shuffle
      setPreviousRoundNames(currentRoundNames);
    } catch (error) {
      console.error('Error shuffling personalities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalityClick = (personalityId: string) => {
    if (!markerMode) return;

    if (markerMode === 'green') {
      setGreenMarkedPersonalities((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(personalityId)) {
          newSet.delete(personalityId);
        } else {
          newSet.add(personalityId);
          // Remove from red if it was there
          setRedMarkedPersonalities((redPrev) => {
            const redNewSet = new Set(redPrev);
            redNewSet.delete(personalityId);
            return redNewSet;
          });
        }
        return newSet;
      });
    } else if (markerMode === 'red') {
      setRedMarkedPersonalities((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(personalityId)) {
          newSet.delete(personalityId);
        } else {
          newSet.add(personalityId);
          // Remove from green if it was there
          setGreenMarkedPersonalities((greenPrev) => {
            const greenNewSet = new Set(greenPrev);
            greenNewSet.delete(personalityId);
            return greenNewSet;
          });
        }
        return newSet;
      });
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

    // Track correct guesses and their question numbers
    const correctGuesses = guesses.filter(
      (g) => g.guess.trim().toLowerCase() === normalizedSelectedName
    );
    const allCorrectGuessesAfterQ5 = correctGuesses.length > 0 && 
      correctGuesses.every((g) => g.questionNumber > 5);
    const noCorrectGuesses = correctGuesses.length === 0;

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

    // Chooser scoring logic:
    // - If all guessers took more than 5 questions (or no one guessed correctly), award 500 points
    // - Otherwise, if there is at least one incorrect guess, award 1000 points
    if (chooserName && hasAnyIncorrectGuess) {
      const chooserPoints = (allCorrectGuessesAfterQ5 || noCorrectGuesses) ? 500 : 1000;
      const chooserIndex = updatedLeaderboard.findIndex((e) => e.name === chooserName);
      if (chooserIndex !== -1) {
        updatedLeaderboard[chooserIndex].score += chooserPoints;
      } else {
        updatedLeaderboard.push({
          id: `entry-${Date.now()}-${chooserName}`,
          name: chooserName,
          score: chooserPoints,
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

    // Check if this team already has a guess
    const teamAlreadyGuessed = guesses.some(
      (g) => g.participantName.toLowerCase() === currentGuessParticipant.trim().toLowerCase()
    );
    
    if (teamAlreadyGuessed) {
      return; // Prevent multiple guesses from the same team
    }

    // Calculate current question number based on answered questions
    const answeredQuestionsCount = questions.filter((q) => q.answer !== null).length;
    const currentQuestionNumber = Math.min(answeredQuestionsCount + 1, 10);

    const newGuess: Guess = {
      id: `guess-${Date.now()}`,
      participantName: currentGuessParticipant.trim(),
      guess: currentGuess.trim(),
      questionNumber: currentQuestionNumber,
      timestamp: Date.now(),
    };

    setGuesses((prev) => [...prev, newGuess]);
    setCurrentGuess('');
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

  if (activeView === 'rules') {
    return <Rules onBack={() => setActiveView('game')} />;
  }

  return (
    <>
      <div className="w-screen h-screen flex bg-gray-100 overflow-hidden">
        <div className="w-[60%] h-full border-r border-gray-300">
          <PersonalityGrid
            personalities={personalities}
            onShuffle={handleShuffle}
            onShowRules={() => setActiveView('rules')}
            markerMode={markerMode}
            onMarkerModeChange={setMarkerMode}
            greenMarkedPersonalities={greenMarkedPersonalities}
            redMarkedPersonalities={redMarkedPersonalities}
            onPersonalityClick={handlePersonalityClick}
          />
        </div>
        
        <div className="w-[20%] h-full border-r border-gray-300">
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
        
        <div className="w-[20%] h-full">
          <Leaderboard
            leaderboard={leaderboard}
            participantName={participantName}
            onParticipantNameChange={handleParticipantNameChange}
            onAddParticipant={handleAddParticipant}
            onRemoveParticipant={handleRemoveParticipant}
            onFinishGame={handleFinishGame}
            guesses={guesses}
            currentGuessParticipant={currentGuessParticipant}
            currentGuess={currentGuess}
            questions={questions}
            onCurrentGuessParticipantChange={setCurrentGuessParticipant}
            onCurrentGuessChange={setCurrentGuess}
            onAddGuess={handleAddGuess}
            selectedName={selectedName}
            isNameRevealed={isNameRevealed}
            selectedByName={selectedByName}
            selectedByNameInput={selectedByNameInput}
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
