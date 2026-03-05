/**
 * LetterBox
 * A single keyboard button for the Hangman game.
 *
 * @param {string}   letter      - The letter this button represents (a–z)
 * @param {function} onClick     - Called with `letter` when the button is clicked
 * @param {boolean}  isDisabled  - True if this letter has already been guessed
 * @param {boolean}  isCorrect   - True if guessed and the letter is in the word
 * @param {boolean}  isWrong     - True if guessed and the letter is NOT in the word
 */
export default function LetterBox({
  letter,
  onClick,
  isDisabled = false,
  isCorrect = false,
  isWrong = false,
}) {
  function getBackground() {
    if (isWrong)    return "#7f1d1d";   // dark red  — wrong guess
    if (isCorrect)  return "#14532d";   // dark green — correct guess
    return "#1e293b";                   // default slate
  }

  function getBorder() {
    if (isWrong)    return "2px solid #ef4444";
    if (isCorrect)  return "2px solid #22c55e";
    return "2px solid #475569";
  }

  return (
    <button
      onClick={() => onClick(letter)}
      disabled={isDisabled}
      aria-label={`Guess letter ${letter}`}
      aria-pressed={isDisabled}
      style={{
        ...styles.base,
        background:   getBackground(),
        border:       getBorder(),
        opacity:      isDisabled ? 0.45 : 1,
        cursor:       isDisabled ? "not-allowed" : "pointer",
        transform:    "scale(1)",         // reset — hover handled via CSS class
        color:        isDisabled ? "#64748b" : "#f1f5f9",
      }}
      // Inline hover is limited; a CSS class or styled-component would be richer,
      // but this keeps the component self-contained with no extra files.
      onMouseEnter={(e) => {
        if (!isDisabled) e.currentTarget.style.transform = "scale(1.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {letter.toUpperCase()}
    </button>
  );
}

const styles = {
  base: {
    width: "2.4rem",
    height: "2.4rem",
    borderRadius: "6px",
    fontSize: "0.85rem",
    fontFamily: "monospace",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.1s ease, opacity 0.2s ease, background 0.2s ease",
    // Remove default button outline; keep visible focus ring for a11y
    outline: "none",
  },
};