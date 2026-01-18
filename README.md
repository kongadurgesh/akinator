# Akinator Game

A local Akinator-style game built with React, TypeScript, and TailwindCSS.

## Features

- **10x10 Grid**: Display 100 famous personalities (non-fictional) fetched from Wikipedia API
- **Question Panel**: Enter up to 10 questions with Yes/No buttons (green for Yes, red for No)
- **Leaderboard**: Track participants and their scores based on answered questions

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
  components/
    PersonalityGrid.tsx    # 10x10 grid of personality cards
    QuestionPanel.tsx     # Question input and Yes/No buttons
    Leaderboard.tsx       # Leaderboard and participant input
  services/
    personalityApi.ts     # API service for fetching personalities
  types/
    index.ts              # TypeScript type definitions
  App.tsx                 # Main application component
  main.tsx                # Application entry point
  index.css               # Global styles with TailwindCSS
```

## How It Works

1. **Personality Fetching**: The app fetches famous personalities from Wikipedia API using multiple categories and search terms, then randomly selects 100 to display in the grid.

2. **Questions**: Users can enter up to 10 questions and answer them with Yes/No buttons. The buttons change appearance when selected.

3. **Leaderboard**: Participants can enter their name and add themselves to the leaderboard. Scores are calculated based on the number of answered questions.

## Technologies Used

- React 18
- TypeScript
- Vite
- TailwindCSS
- Wikipedia API
