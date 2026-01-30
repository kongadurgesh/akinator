interface RulesProps {
  onBack: () => void;
}

const Rules = ({ onBack }: RulesProps) => {
  return (
    <div className="w-screen h-screen bg-gray-100 overflow-hidden">
      <div className="h-full max-w-4xl mx-auto p-4 flex flex-col">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Game Rules & Points</h1>
            <p className="text-sm text-gray-600 mt-1">
              Quick guide for how to play this Akinator-style round.
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            aria-label="Back to game"
          >
            Back to Game
          </button>
        </div>

        <div className="flex-1 overflow-auto rounded-xl border border-gray-200 bg-white p-5">
          <div className="space-y-5 text-sm text-gray-800">
            <section>
              <h2 className="text-lg font-bold text-gray-900">How to Play</h2>
              <ul className="mt-2 list-disc pl-5 space-y-1.5">
                <li>
                  Create a group chat and add a host to coordinate guesses. The host will manage the game flow and help teams submit their guesses.
                </li>
                <li>
                  Add teams/participants using the <span className="font-semibold">Leaderboard</span>{' '}
                  “Add” box.
                </li>
                <li>
                  One person secretly picks a personality and fills <span className="font-semibold">Selected Name</span>{' '}
                  (use “Show/Hide” to reveal when needed). Optionally fill “Who chose this person?” for chooser points.
                </li>
                <li>
                  Use the 10 question slots to ask yes/no questions. Tap <span className="font-semibold">Reset</span>{' '}
                  to clear a single answer.
                </li>
                <li>
                  Teams make guesses in the <span className="font-semibold">Guesses</span> section and choose which
                  question number they guessed on.
                </li>
                <li>
                  When you’re ready, press <span className="font-semibold">Show</span> on the selected name to reveal
                  it and automatically score the round.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">Points System</h2>
              <div className="mt-2 space-y-2">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="font-semibold text-gray-900">Correct Guess</div>
                  <ul className="mt-1 list-disc pl-5 space-y-1">
                    <li>
                      If the correct guess is made on questions <span className="font-semibold">1–5</span>: <span className="font-semibold">+1000</span>
                    </li>
                    <li>
                      From question <span className="font-semibold">6</span> onward: <span className="font-semibold">1000 − 100 × (Q − 5)</span>{' '}
                      (e.g. Q6=900, Q7=800 … minimum 0)
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="font-semibold text-gray-900">Chooser Bonus</div>
                  <p className="mt-1 text-gray-700">
                    If <span className="font-semibold">at least one team guesses wrong</span> in the round, the chooser
                    gets a flat <span className="font-semibold">+1000</span> (only if “Who chose this person?” is filled).
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">Rounds & Game End</h2>
              <ul className="mt-2 list-disc pl-5 space-y-1.5">
                <li>
                  <span className="font-semibold">Next Round</span> shuffles personalities and resets the current-round
                  inputs (guesses + selected name), while keeping the leaderboard scores.
                </li>
                <li>
                  <span className="font-semibold">Finish Game</span> announces the winner(s). Closing the result will reset
                  everything for a fresh game.
                </li>
              </ul>
            </section>

            <section className="border-t border-gray-200 pt-4">
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                <div className="font-semibold text-amber-900">Fun note</div>
                <p className="mt-1 text-amber-800">
                  If you feel bored, we have a backup of our <span className="font-semibold">MOSIP TWI national game</span>{' '}
                  — <span className="font-semibold">Skribbl.io</span>.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
