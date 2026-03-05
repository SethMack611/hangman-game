import { useEffect } from "react";

/**
 * GameOverPopup
 * Full-screen overlay modal shown when the game ends.
 *
 * @param {boolean}  isVisible  - Controls whether the modal renders
 * @param {boolean}  isWon      - True = win state, False = loss state
 * @param {string}   word       - The secret word (revealed on loss)
 * @param {function} onNewGame  - Callback to reset and start a fresh game
 */
export default function GameOverPopup({ isVisible, isWon, word, onNewGame }) {
  // Close on Escape key
  useEffect(() => {
    if (!isVisible) return;
    const handleKey = (e) => { if (e.key === "Escape") onNewGame(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isVisible, onNewGame]);

  if (!isVisible) return null;

  return (
    <>
      {/* ── Inject keyframe animations ── */}
      <style>{`
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          70%  { transform: translate(-50%, -50%) scale(1.04); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes floatEmoji {
          0%, 100% { transform: translateY(0);   }
          50%       { transform: translateY(-8px); }
        }
        .popup-btn:hover {
          background: ${isWon ? "#16a34a" : "#2563eb"} !important;
          transform: scale(1.06);
        }
        .popup-btn:active {
          transform: scale(0.97);
        }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        style={styles.backdrop}
        onClick={onNewGame}
        role="presentation"
        aria-hidden="true"
      />

      {/* ── Modal card ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        style={styles.card}
      >
        {/* Emoji */}
        <div style={styles.emoji}>
          {isWon ? "🎉" : "💀"}
        </div>

        {/* Heading */}
        <h2 id="popup-title" style={{
          ...styles.heading,
          color: isWon ? "#4ade80" : "#f87171",
        }}>
          {isWon ? "You Won!" : "You Lost"}
        </h2>

        {/* Sub-message */}
        {isWon ? (
          <p style={styles.message}>
            Impressive! You figured it out.
          </p>
        ) : (
          <p style={styles.message}>
            The word was{" "}
            <span style={styles.revealedWord}>{word.toUpperCase()}</span>
          </p>
        )}

        {/* Divider */}
        <div style={{
          ...styles.divider,
          background: isWon
            ? "linear-gradient(90deg, transparent, #4ade80, transparent)"
            : "linear-gradient(90deg, transparent, #f87171, transparent)",
        }} />

        {/* Play Again button */}
        <button
          className="popup-btn"
          onClick={onNewGame}
          autoFocus
          style={{
            ...styles.button,
            background: isWon ? "#15803d" : "#3b82f6",
          }}
          aria-label="Play again"
        >
          🔄 Play Again
        </button>

        <p style={styles.hint}>or press Esc</p>
      </div>
    </>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(4px)",
    zIndex: 100,
    animation: "backdropIn 0.25s ease forwards",
    cursor: "pointer",
  },
  card: {
    position: "fixed",
    top: "50%",
    left: "50%",
    zIndex: 101,
    transform: "translate(-50%, -50%)",
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "16px",
    padding: "2.5rem 3rem",
    minWidth: "300px",
    maxWidth: "90vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.75rem",
    boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
    animation: "popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
  },
  emoji: {
    fontSize: "4rem",
    lineHeight: 1,
    animation: "floatEmoji 2s ease-in-out infinite",
  },
  heading: {
    fontFamily: "monospace",
    fontSize: "2rem",
    fontWeight: "bold",
    margin: 0,
    letterSpacing: "0.05em",
  },
  message: {
    fontFamily: "monospace",
    fontSize: "1rem",
    color: "#94a3b8",
    margin: 0,
    textAlign: "center",
  },
  revealedWord: {
    color: "#f1f5f9",
    fontWeight: "bold",
    fontSize: "1.15rem",
    letterSpacing: "0.15em",
    background: "#1e293b",
    padding: "0.1rem 0.5rem",
    borderRadius: "4px",
  },
  divider: {
    width: "100%",
    height: "1px",
    margin: "0.5rem 0",
  },
  button: {
    padding: "0.7rem 2.2rem",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontFamily: "monospace",
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: "0.05em",
    transition: "background 0.15s ease, transform 0.1s ease",
  },
  hint: {
    fontFamily: "monospace",
    fontSize: "0.7rem",
    color: "#334155",
    margin: 0,
  },
};