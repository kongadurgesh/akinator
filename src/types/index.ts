export interface Personality {
  id: string;
  name: string;
}

export interface Question {
  id: number;
  text: string;
  answer: 'yes' | 'no' | null;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  timestamp: number;
}
