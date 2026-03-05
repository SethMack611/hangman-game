/**
 * GuessedLetters
 * Shows a running history of every letter the player has guessed.
 *
 * @param {string[]} guessedLetters - All letters guessed so far (lowercase)
 * @param {string[]} wrongGuesses   - Subset that are NOT in the word (for coloring)
 */
export default function GuessedLetters({ guessedLetters, wrongGuesses = [] }) {
  if (guessedLetters.length === 0) {
    return (
      <p style={styles.empty}>No letters guessed yet — take a shot!</p>
    );
  }

  return (
    <div style={styles.wrapper}>
      <span style={styles.label}>Guessed:</span>
      <div style={styles.row} role="list" aria-label="Guessed letters">
        {guessedLetters.map((letter) => {
          const isWrong = wrongGuesses.includes(letter);
          return (
            <span
              key={letter}
              role="listitem"
              aria-label={`${letter.toUpperCase()} — ${isWrong ? "wrong" : "correct"}`}
              style={{
                ...styles.chip,
                color:      isWrong ? "#f87171" : "#4ade80",
                borderColor: isWrong ? "#7f1d1d" : "#14532d",
                background:  isWrong ? "#1c0a0a" : "#0a1c0e",
              }}
            >
              {letter.toUpperCase()}
            </span>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: "440px",
  },
  label: {
    fontSize: "0.8rem",
    color: "#94a3b8",
    fontFamily: "monospace",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    flexShrink: 0,
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.35rem",
  },
  chip: {
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: "0.85rem",
    padding: "0.2rem 0.5rem",
    borderRadius: "4px",
    border: "1px solid",
    transition: "all 0.15s ease",
    userSelect: "none",
  },
  empty: {
    fontFamily: "monospace",
    fontSize: "0.85rem",
    color: "#475569",
    margin: 0,
    fontStyle: "italic",
  },
};