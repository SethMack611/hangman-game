import noose           from "./assets/noose.png";
import upperbody       from "./assets/upperbody.png";
import botharms        from "./assets/botharms.png";
import arm1            from "./assets/1arm.png";
import upperandlower   from "./assets/upperandlowerbody.png";
import leg1            from "./assets/1leg.png";
import dead            from "./assets/Dead.png";

/**
 * Images ordered by wrong-guess count.
 * Index 0 = 0 wrong guesses (empty gallows)
 * Index 6 = 6 wrong guesses (game lost)
 */
const hangImages = [
  noose,          // 0 wrong — empty gallows & noose
  upperbody,      // 1 wrong — head + torso appear
  botharms,       // 2 wrong — both arms added
  arm1,           // 3 wrong — one arm drops (getting worried)
  upperandlower,  // 4 wrong — lower body added
  leg1,           // 5 wrong — one leg added
  dead,           // 6 wrong — fallen, game over
];

/**
 * HangmanImage
 * @param {number} wrongCount - Number of wrong guesses (0–6)
 */
export default function HangmanImage({ wrongCount }) {
  const index = Math.min(Math.max(wrongCount, 0), hangImages.length - 1);

  return (
    <div style={styles.wrapper}>
      <img
        src={hangImages[index]}
        alt={`Hangman stage ${index} — ${wrongCount} wrong guess${wrongCount !== 1 ? "es" : ""}`}
        style={styles.image}
      />
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "220px",
    height: "260px",
    objectFit: "contain",
  },
};