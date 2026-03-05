/**
 * NewGameButton
 * A single call-to-action button that resets the Hangman game.
 *
 * @param {function} resetGame - Callback that picks a new word and clears guesses
 */
export default function NewGameButton({ resetGame }) {
  return (
    <button
      onClick={resetGame}
      style={styles.button}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#2563eb";
        e.currentTarget.style.transform  = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#3b82f6";
        e.currentTarget.style.transform  = "scale(1)";
      }}
      onMouseDown={(e)  => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e)    => (e.currentTarget.style.transform = "scale(1.05)")}
      aria-label="Start a new game"
    >
      🔄 New Game
    </button>
  );
}

const styles = {
  button: {
    marginTop: "0.5rem",
    padding: "0.65rem 2rem",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontFamily: "monospace",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.15s ease, transform 0.1s ease",
    letterSpacing: "0.05em",
  },
};