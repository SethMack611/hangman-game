# 🪢 Hangman Game

A classic Hangman word-guessing game built with **React + Vite**, containerized with **Docker**. Players guess letters to uncover a hidden word before the hangman is fully drawn — 5 wrong guesses and it's game over!

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) | UI component framework |
| [Vite](https://vite.dev/) | Frontend build tool & dev server |
| [Docker](https://www.docker.com/) | Containerization for consistent deployment |
| JavaScript (ES6+) | Application logic |
| CSS | Styling and layout |

---

## 📁 Project Structure

```
hangman-game/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Hangman stage images (hang0.png – hang5.png)
│   ├── App.jsx              # Root component — holds all game state
│   ├── HangmanImage.jsx     # Displays hangman image based on wrong guess count
│   ├── WordDisplay.jsx      # Shows the word as blanks and revealed letters
│   ├── LetterBox.jsx        # Individual clickable letter button
│   ├── LetterGrid.jsx       # Renders all 26 letter buttons
│   ├── GuessedLetters.jsx   # Displays previously guessed letters
│   ├── NewGameButton.jsx    # Resets the game with a new word
│   ├── GameOverPopup.jsx    # Win/loss modal popup
│   └── main.jsx             # React app entry point
├── .dockerignore
├── .gitignore
├── Dockerfile
├── index.html               # Vite HTML entry point
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## 🧩 Component Overview

| Component | Description |
|---|---|
| `App.jsx` | Manages all game state: the secret word, guessed letters, win/loss logic |
| `HangmanImage.jsx` | Swaps between 6 images (0–5 wrong guesses) to show hangman progress |
| `WordDisplay.jsx` | Maps over the word and reveals correctly guessed letters as blanks fill in |
| `LetterBox.jsx` | A single letter button — disables itself once clicked |
| `LetterGrid.jsx` | Renders all 26 `LetterBox` components and handles guess events |
| `GuessedLetters.jsx` | Displays the full history of letters the player has selected |
| `NewGameButton.jsx` | Triggers a game reset and picks a new random word |
| `GameOverPopup.jsx` | Overlay modal that appears on win or loss with a Play Again option |

---

## 🚀 How to Run Locally

**Prerequisites:** Node.js v18+ and npm installed

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd hangman-game

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🐳 How to Run with Docker

**Prerequisites:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

```bash
# 1. Build the Docker image
docker build -t hangman-game .

# 2. Run the container
docker run -p 5173:5173 hangman-game
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎮 How to Play

1. A secret word is randomly selected at the start of each game
2. Click any letter button to guess if it appears in the word
3. Correct guesses reveal the letter in the word
4. Wrong guesses add a body part to the hangman drawing
5. You have **5 wrong guesses** before the hangman is complete and the game is lost
6. Guess all letters before running out of chances to win!
7. Click **New Game** at any time to reset and start fresh

---

## ✅ Features

- 🖼️ **Live Hangman Drawing** — 6 progressive images update with each wrong guess
- 🔤 **Letter Selection** — Full A–Z grid; buttons disable after being clicked
- 📋 **Guess History** — All previously guessed letters are displayed
- 🔄 **New Game Button** — Instantly resets the board with a new random word
- 🏆 **Win/Loss Popup** — Modal appears at game end showing result and the answer

---

## 👤 Author

**Seth A. Mack**