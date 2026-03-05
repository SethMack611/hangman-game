/**
 * WordDisplay
 * Renders the word as a row of revealed letters and blanks.
 *
 * @param {string}   word           - The secret word (lowercase)
 * @param {string[]} guessedLetters - Letters the player has guessed so far
 * @param {boolean}  gameLost       - Reveal all letters when the game is lost
 */
export default function WordDisplay({ word, guessedLetters, gameLost = false }) {
  return (
    <div style={styles.row} aria-label="Word to guess" role="group">
      {word.split("").map((letter, index) => {
        const isRevealed = gameLost || guessedLetters.includes(letter);

        return (
          <div key={index} style={styles.cell}>
            <span
              style={{
                ...styles.letter,
                opacity:    isRevealed ? 1 : 0,
                color:      gameLost && !guessedLetters.includes(letter)
                              ? "#f87171"   // red — letter the player missed
                              : "#f1f5f9",  // white — correctly guessed
              }}
              aria-hidden={!isRevealed}
            >
              {letter.toUpperCase()}
            </span>
            <div style={styles.underline} />
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cell: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  letter: {
    fontSize: "2rem",
    fontWeight: "bold",
    fontFamily: "monospace",
    minWidth: "2rem",
    textAlign: "center",
    transition: "opacity 0.2s ease",
    lineHeight: 1,
  },
  underline: {
    width: "2rem",
    height: "3px",
    background: "#64748b",
    borderRadius: "2px",
  },
};