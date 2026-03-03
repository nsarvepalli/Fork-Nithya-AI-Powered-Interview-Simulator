# HireReady

HireReady is an AI-powered mock interview platform with a FastAPI backend and a React + Vite frontend.
Users can sign up, run tailored interview sessions, save interview history, manage profile/account settings, and upload/manage resumes for context-aware interview prompts.

## Contributors

- Hemin
- Kavya
- Nithya

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Axios, React Router
- **Backend:** FastAPI, Uvicorn, OpenAI SDK, PyJWT, python-dotenv
- **Database:** PostgreSQL (via `psycopg2`)
- **Resume parsing:** `pdfjs-dist` (PDF) + plain text support

## Features

- Username/password authentication with JWT
- Protected routes (`/`, `/history`, `/profile`)
- AI interview sessions:
  - Interview types: Technical, Behavioral, Mixed
  - Difficulty: Entry Level, Mid Level, Senior Level
  - Question count: 3–10
  - Tailored prompting using resume + optional job description
- Chat-style interview interaction with session completion detection
- Interview history with expandable message timeline
- Profile management:
  - Update username/password
  - Upload/change profile photo (client-side crop)
  - Delete account
- Resume management:
  - Upload PDF/TXT
  - List, view, delete saved resumes

## Project Structure

```text
HireReady-Fork/
├── backend/
│   ├── main.py            # FastAPI app + routes + OpenAI calls
│   ├── database.py        # PostgreSQL table init + data access layer
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api.js         # Axios client + API wrappers
│   │   ├── App.jsx        # Router and auth guarding
│   │   ├── components/
│   │   │   └── Layout.jsx
│   │   └── pages/
│   │       ├── Login.jsx
│   │       ├── Interview.jsx
│   │       ├── History.jsx
│   │       └── Profile.jsx
│   └── package.json
├── setup.bat             # Windows setup + run script
├── setup.sh              # Unix/macOS setup + run script
└── start.bat             # Windows start script (after setup)
```

## Prerequisites

- Python 3.10+
- Node.js 18+
- npm
- PostgreSQL database (local or hosted)
- OpenAI API key

## Environment Variables

Create a `.env` file inside `backend/`:

```env
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=postgresql://username:password@host:5432/database_name
SECRET_KEY=your_jwt_secret_key_optional
```

Notes:

- `DATABASE_URL` is required. The backend raises an error if it is missing.
- `SECRET_KEY` is optional; if omitted, a default development key is used.
- CORS is currently configured for `http://localhost:5173`.

## Quick Start

### Windows (recommended in this repo)

From the project root:

```bash
setup.bat
```

This script:

- creates `.venv`
- installs backend + frontend dependencies
- starts backend on `8000` and frontend on `5173`
- opens `http://localhost:5173`

After first setup, use:

```bash
start.bat
```

### macOS/Linux

```bash
chmod +x setup.sh
./setup.sh
```

## Manual Run (alternative)

### 1) Backend

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r backend/requirements.txt
cd backend
uvicorn main:app --reload --port 8000
```

Backend docs: `http://localhost:8000/docs`

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend app: `http://localhost:5173`

## API Overview

### Auth

- `POST /auth/signup`
- `POST /auth/login`

### Interview

- `POST /interview/start`
- `POST /interview/chat`
- `POST /interview/message`
- `PATCH /interview/session/{session_id}/status`

### History

- `GET /history/sessions`
- `GET /history/session/{session_id}`
- `GET /history/stats`

### Profile

- `GET /profile`
- `PUT /profile/username`
- `PUT /profile/password`
- `DELETE /profile`

### Resumes

- `GET /profile/resumes`
- `POST /profile/resumes`
- `GET /profile/resumes/{resume_id}`
- `DELETE /profile/resumes/{resume_id}`

## Database Tables

Tables are auto-created by `InterviewDatabase.init_database()`:

- `users`
- `interview_sessions`
- `chat_messages`
- `resumes`

## Known Current Behavior

- Interview completion is inferred when AI response contains both "thank you" and "overall".
- Frontend sends token from `localStorage` on every API request.
- If no token exists, app redirects to `/login`.

## Development Notes

- Frontend lint:

```bash
cd frontend
npm run lint
```

- Build frontend:

```bash
cd frontend
npm run build
```
