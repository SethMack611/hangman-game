import { useState, useCallback, useEffect } from "react";
import HangmanImage from "./HangmanImage";
import LetterGrid from "./LetterGrid";
import WordDisplay from "./WordDisplay";
import GuessedLetters from "./GuessedLetters";
import NewGameButton from "./NewGameButton";
import GameOverPopup from "./GameOverPopup";

const WORD_LIST = [
  "javascript", "hangman", "component", "keyboard",
  "variable", "function", "array", "object",
  "developer", "interface", "algorithm", "framework",
  "typescript", "closure", "recursion", "promise",
];

const MAX_WRONG_GUESSES = 6;

function pickRandomWord(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export default function App() {
  // ── Core state ─────────────────────────────────────────────────────────────
  const [word, setWord] = useState(() => pickRandomWord(WORD_LIST));
  const [guessedLetters, setGuessedLetters] = useState([]);

  // ── Derived state ───────────────────────────────────────────────────────────
  const wrongGuesses = guessedLetters.filter((l) => !word.includes(l));
  const gameWon  = [...new Set(word.split(""))].every((l) => guessedLetters.includes(l));
  const gameLost = wrongGuesses.length >= MAX_WRONG_GUESSES;
  const gameOver = gameWon || gameLost;

  // ── Actions ─────────────────────────────────────────────────────────────────
  const handleGuess = useCallback(
    (letter) => {
      if (gameOver || guessedLetters.includes(letter)) return;
      setGuessedLetters((prev) => [...prev, letter]);
    },
    [gameOver, guessedLetters]
  );

  const resetGame = useCallback(() => {
    setWord(pickRandomWord(WORD_LIST));
    setGuessedLetters([]);
  }, []);

  // ── Physical keyboard support ───────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      const letter = e.key.toLowerCase();
      if (/^[a-z]$/.test(letter)) handleGuess(letter);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGuess]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Hangman</h1>

      {/* wrongGuesses.length → HangmanImage */}
      <HangmanImage wrongCount={wrongGuesses.length} />

      <p style={styles.counter}>
        Wrong guesses: {wrongGuesses.length} / {MAX_WRONG_GUESSES}
      </p>

      {/* guessedLetters → GuessedLetters */}
      <GuessedLetters
        guessedLetters={guessedLetters}
        wrongGuesses={wrongGuesses}
      />

      {/* word + guessedLetters → WordDisplay */}
      <WordDisplay
        word={word}
        guessedLetters={guessedLetters}
        gameLost={gameLost}
      />

      {/* handleGuess + guessedLetters → LetterGrid */}
      <LetterGrid
        guessedLetters={guessedLetters}
        wrongGuesses={wrongGuesses}
        handleGuess={handleGuess}
        gameOver={gameOver}
      />

      {/* resetGame → NewGameButton */}
      <NewGameButton resetGame={resetGame} />

      {/* gameWon / gameLost flags → GameOverPopup */}
      <GameOverPopup
        isVisible={gameOver}
        isWon={gameWon}
        word={word}
        onNewGame={resetGame}
      />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#f1f5f9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem 1rem",
    fontFamily: "monospace",
    gap: "1.25rem",
  },
  title: { fontSize: "2.5rem", letterSpacing: "0.2em", margin: 0 },
  counter: { fontSize: "1rem", color: "#94a3b8", margin: 0 },
};