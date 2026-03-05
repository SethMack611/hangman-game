import LetterBox from "./LetterBox";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/**
 * LetterGrid
 * Renders the full A–Z keyboard grid for the Hangman game.
 *
 * @param {string[]}  guessedLetters - Letters the player has already clicked
 * @param {string[]}  wrongGuesses   - Subset of guessedLetters not in the word
 * @param {function}  handleGuess    - Called with a letter when a key is clicked
 * @param {boolean}   gameOver       - Disables all keys when game is won or lost
 */
export default function LetterGrid({
  guessedLetters,
  wrongGuesses,
  handleGuess,
  gameOver,
}) {
  return (
    <div style={styles.grid}>
      {ALPHABET.map((letter) => {
        const lowerLetter = letter.toLowerCase();
        const guessed     = guessedLetters.includes(lowerLetter);
        const isWrong     = wrongGuesses.includes(lowerLetter);
        const isCorrect   = guessed && !isWrong;

        return (
          <LetterBox
            key={letter}
            letter={lowerLetter}
            onClick={handleGuess}
            isDisabled={guessed || gameOver}
            isCorrect={isCorrect}
            isWrong={isWrong}
          />
        );
      })}
    </div>
  );
}

const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.4rem",
    maxWidth: "440px",
    justifyContent: "center",
  },
};