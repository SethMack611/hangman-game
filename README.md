---

# 🪢 Hangman Game 2.0

A classic Hangman word-guessing game built with **React + Vite**, now enhanced with **player profiles**, **win/loss persistence** via **DynamoDB**, and a **Node.js backend API**. Containerized with **Docker Compose** for a seamless full‑stack local environment.

**New in 2.0:**  
- Player login / name entry  
- Wins & losses saved per player  
- Win percentage displayed in real time  
- Backend API (`GET` / `PUT /player/:name`)  
- DynamoDB for persistent storage  
- Unit tests for API endpoints & UI logic  

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) | UI component framework |
| [Vite](https://vite.dev/) | Frontend build tool & dev server |
| [Node.js + Express](https://expressjs.com/) | Backend API (new) |
| [DynamoDB](https://aws.amazon.com/dynamodb/) | NoSQL database for player stats (new) |
| [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) | Container orchestration (DynamoDB added) |
| JavaScript (ES6+) | Application logic |
| CSS | Styling and layout |
| [Jest](https://jestjs.io/) / [React Testing Library](https://testing-library.com/react) | Unit tests (new) |

---

## 📁 Project Structure (updated)

```
hangman-game/
├── backend/                 # NEW: Node.js API
│   ├── controllers/         # Player controller (get/update)
│   ├── routes/              # API routes
│   ├── models/              # DynamoDB interaction layer
│   ├── tests/               # Unit tests for API endpoints
│   ├── Dockerfile           # Backend container definition
│   └── package.json
├── frontend/                # Original React app moved here
│   ├── public/
│   ├── src/                 # Same components + new LoginForm, StatsDisplay
│   ├── Dockerfile
│   ├── package.json
│   └── ...
├── docker-compose.yml       # NEW: Orchestrates frontend, backend, DynamoDB
├── .gitignore
└── README.md
```

*(The original frontend files remain unchanged except for new UI components listed below.)*

---

## 🧩 New Components (Frontend)

| Component | Description |
|---|---|
| `LoginForm.jsx` | Asks for player name, calls `GET /player/:name` to fetch/initialize stats |
| `StatsDisplay.jsx` | Shows player name, wins, losses, and win percentage (updated after each game) |
| *(Existing components stay – see original table)* | |

---

## 🧪 New Backend API

### Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/player/:name` | Returns `{ name, wins, losses }` if player exists, otherwise `404` |
| `PUT` | `/player/:name` | Updates wins/losses. Expects body `{ wins, losses }`. Returns updated player. |

### DynamoDB Table Schema

| Attribute | Type | Description |
|---|---|---|
| `name` | String (Primary Key) | Player's unique name |
| `wins` | Number | Total wins |
| `losses` | Number | Total losses |

---

## 🚀 How to Run Locally (with Docker Compose)

**Prerequisites:** Docker Desktop installed and running

```bash
# 1. Clone the repository and switch to your feature branch
git clone <your-repo-url>
cd hangman-game
git checkout -b feature/hangman-2.0

# 2. Start all services (frontend, backend, DynamoDB)
docker-compose up --build

# 3. Open your browser
http://localhost:5173
```

The `docker-compose.yml` will:
- Start DynamoDB locally (port 8000)
- Run the backend API (port 5000)
- Run the React frontend (port 5173)

---

## 🎮 How to Play (2.0)

1. **Login** – Enter your name on the welcome screen.  
   - New players are automatically created in DynamoDB.  
   - Returning players load their existing wins/losses.

2. **Play Hangman** – Guess letters to reveal the secret word.  
   - 5 wrong guesses = loss  
   - Reveal all letters = win  

3. **Stats Update** – After each game:  
   - Wins/losses increment locally in React state  
   - A `PUT` request syncs the changes to DynamoDB  
   - Your win percentage updates instantly  

4. **New Game** – Click “New Game” to play again with a different word.

---

## ✅ Testing (Step 6)

Unit tests are written with **Jest** and **React Testing Library**.

### Backend API tests
- `GET /player/:name` – returns player or 404  
- `PUT /player/:name` – updates stats and persists to DynamoDB  

### Frontend UI tests
- `LoginForm` – submits name, calls API, updates state  
- `StatsDisplay` – renders name, wins, losses, percentage correctly  
- Game flow – win/loss triggers local update + `PUT` request  

**Run tests:**
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

---

---

## 👤 Author

**Seth A. Mack**  

Let me know if you'd like me to add a **screenshot placeholder**, a **Docker Compose file example**, or a **troubleshooting section** for common DynamoDB local issues.
