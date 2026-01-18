import { useState, useEffect } from 'react';
import PersonalityGrid from './components/PersonalityGrid';
import QuestionPanel from './components/QuestionPanel';
import Leaderboard from './components/Leaderboard';
import { Personality, Question, LeaderboardEntry } from './types';
import { fetchFamousPersonalities } from './services/personalityApi';

const App = () => {
  const [personalities, setPersonalities] = useState<Personality[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [participantName, setParticipantName] = useState('');
  const [loading, setLoading] = useState(true);

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
    const initialQuestions: Question[] = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      text: '',
      answer: null,
    }));
    setQuestions(initialQuestions);
  }, []);

  const handleQuestionChange = (id: number, text: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, text } : q))
    );
  };

  const handleAnswerChange = (id: number, answer: 'yes' | 'no') => {
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
    setParticipantName('');

    setQuestions((prev) =>
      prev.map((q) => ({ ...q, text: '', answer: null }))
    );
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
    <div className="w-screen h-screen flex bg-gray-100 overflow-hidden">
      <div className="w-[60%] h-full border-r border-gray-300">
        <PersonalityGrid personalities={personalities} />
      </div>
      
      <div className="w-[25%] h-full border-r border-gray-300">
        <QuestionPanel
          questions={questions}
          onQuestionChange={handleQuestionChange}
          onAnswerChange={handleAnswerChange}
        />
      </div>
      
      <div className="w-[15%] h-full">
        <Leaderboard
          leaderboard={leaderboard}
          participantName={participantName}
          onParticipantNameChange={handleParticipantNameChange}
          onAddParticipant={handleAddParticipant}
        />
      </div>
    </div>
  );
};

export default App;
