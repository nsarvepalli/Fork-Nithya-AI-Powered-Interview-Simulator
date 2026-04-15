# HireReady

**AI-Powered Mock Interview Platform for Job Seekers**

HireReady is an intelligent interview preparation platform that simulates real interview experiences using advanced AI technology. Designed to help job seekers practice and perfect their interview skills, HireReady provides personalized, context-aware mock interviews that adapt to your background, target role, and experience level.

## About the Project

### The Problem We Solve

Landing a job interview is challenging, but performing well in the interview itself is where many candidates struggle. Traditional interview preparation methods have significant limitations:

- 🚫 **Limited Practice Opportunities:** Friends and family aren't professional interviewers and can't provide industry-specific questions
- 💰 **Expensive Interview Coaches:** Professional coaching costs hundreds of dollars per session
- ⏰ **Scheduling Constraints:** Coordinating practice sessions with others is time-consuming
- 📊 **No Progress Tracking:** Hard to see improvement over time without structured feedback
- 🎯 **Generic Questions:** Most practice resources don't tailor questions to your specific resume or target role

### Our Solution

HireReady leverages OpenAI's GPT-4 to create an intelligent interview coach that's available 24/7. The platform provides:

- **Personalized Interviews:** AI analyzes your resume and job description to ask relevant, role-specific questions
- **Realistic Experience:** Natural conversation flow with follow-up questions based on your responses
- **Flexible Practice:** Choose interview type (Technical/Behavioral/Mixed), difficulty level, and number of questions
- **Progress Tracking:** Complete history of all interview sessions with detailed transcripts
- **Privacy & Convenience:** Practice from home without judgment, at any time that suits you
- **Cost-Effective:** One platform for unlimited practice sessions

### Who Is This For?

- 🎓 **Recent Graduates:** Preparing for first job interviews
- 💼 **Career Switchers:** Transitioning to new industries or roles
- 📈 **Professionals:** Preparing for promotions or senior-level positions
- 🔄 **Active Job Seekers:** Anyone currently interviewing and wanting to improve
- 🧪 **Continuous Learners:** Professionals who want to stay sharp

### How It Works

1. **Sign Up:** Create your free account with a username and password
2. **Upload Resume:** Add your resume (PDF or TXT) for personalized questions
3. **Configure Interview:** Select type (Technical/Behavioral/Mixed), difficulty level, and question count
4. **Practice:** Engage in a natural conversation with the AI interviewer
5. **Review:** Access your complete interview history and track your progress
6. **Improve:** Repeat with different configurations to cover various scenarios

### Key Differentiators

- ✨ **AI-Powered Intelligence:** Uses GPT-4 for natural, contextual conversations
- 📝 **Resume-Aware Questions:** Questions tailored to your actual experience and skills
- 🎯 **Job-Specific Preparation:** Paste job descriptions to practice for specific roles
- 📊 **Complete History:** Never lose track of your practice sessions
- 🖼️ **Professional Profile:** Manage your profile with photo and account settings
- 🔒 **Secure & Private:** Your data is protected with JWT authentication

## Project Status

✅ **Fully Functional** - All core features implemented and operational

- User authentication and authorization with JWT
- AI-powered interview sessions with customizable parameters
- Interview history tracking with detailed message timeline
- Profile management with photo upload and account settings
- Resume upload and management system
- PostgreSQL database integration
- Complete frontend UI with responsive design

## Contributors

- Hemin
- Kavya
- Nithya

## Tech Stack

### Backend

- **Framework:** FastAPI with Uvicorn
- **AI Integration:** OpenAI SDK (GPT-4)
- **Authentication:** PyJWT for JWT token management
- **Database:** PostgreSQL with psycopg2-binary
- **Environment:** python-dotenv for configuration

### Frontend

- **Framework:** React 19 with Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **PDF Processing:** pdfjs-dist for resume parsing
- **Image Handling:** Canvas API for profile photo cropping

## Features

### 🔐 Authentication & Authorization

- **User Registration:** Secure signup with username and password (minimum 6 characters)
- **Login System:** JWT-based authentication with token storage
- **Password Security:** Salted password hashing using SHA-256
- **Protected Routes:** Automatic redirect to login for unauthorized access

### 🎯 AI-Powered Interview Sessions

- **Interview Types:**
  - Technical (coding, algorithms, system design)
  - Behavioral (soft skills, situational questions)
  - Mixed (combination of both)
- **Difficulty Levels:**
  - Entry Level
  - Mid Level
  - Senior Level
- **Customization:**
  - Variable question count (3-10 questions)
  - Resume-based personalization
  - Optional job description for targeted practice
- **Real-time Interaction:**
  - Chat-style interface with AI interviewer
  - Context-aware follow-up questions
  - Automatic session completion detection
  - Streaming responses for natural conversation flow

### 📊 History & Analytics

- **Session History:** View all past interview sessions
- **Detailed Timeline:** Expandable message history for each session
- **Statistics Dashboard:** Track your interview practice progress
- **Session Metadata:** Date, time, interview type, difficulty, and status

### 👤 Profile Management

- **Account Settings:**
  - Update username
  - Change password
  - Delete account with confirmation
- **Profile Photo:**
  - Upload custom profile image
  - Client-side image cropping with zoom and pan
  - Circular 256×256 output for consistent display
  - Base64 storage in database

### 📄 Resume Management

- **Multi-Format Support:**
  - PDF upload with text extraction (via pdfjs-dist)
  - Plain text (.txt) file support
- **Resume Library:**
  - Store multiple resumes
  - View resume content
  - Delete unwanted resumes
- **Interview Integration:** Select resume for context-aware interview questions

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

### Authentication Endpoints

- **`POST /auth/signup`** - Register new user
  - Body: `{ username, password }`
  - Returns: JWT token and username
- **`POST /auth/login`** - Authenticate user
  - Body: `{ username, password }`
  - Returns: JWT token and username

### Interview Endpoints

- **`POST /interview/start`** - Create new interview session
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ interview_type, difficulty, num_questions, resume_text?, job_description? }`
  - Returns: `{ session_id, message }`
- **`POST /interview/chat`** - Interactive chat with AI interviewer
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ session_id, messages[], interview_type, difficulty, num_questions, resume_text?, job_description? }`
  - Returns: Streaming AI response
- **`POST /interview/message`** - Add message to session history
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ session_id, role, content }`
  - Returns: Success confirmation
- **`PATCH /interview/session/{session_id}/status`** - Update session status
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ status: "completed" | "in_progress" }`
  - Returns: Success confirmation

### History Endpoints

- **`GET /history/sessions`** - Retrieve all user sessions
  - Headers: `Authorization: Bearer <token>`
  - Returns: Array of session objects with metadata
- **`GET /history/session/{session_id}`** - Get specific session details
  - Headers: `Authorization: Bearer <token>`
  - Returns: Session data with full message history
- **`GET /history/stats`** - Get user statistics
  - Headers: `Authorization: Bearer <token>`
  - Returns: Total sessions, completed count, and recent activity

### Profile Endpoints

- **`GET /profile`** - Get user profile information
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ username, profile_photo? }`
- **`PUT /profile/username`** - Update username
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ new_username }`
  - Returns: New JWT token
- **`PUT /profile/password`** - Change password
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ current_password, new_password }`
  - Returns: Success confirmation
- **`POST /profile/photo`** - Upload profile photo
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ photo: "data:image/jpeg;base64,..." }`
  - Returns: Success confirmation
- **`DELETE /profile`** - Delete user account
  - Headers: `Authorization: Bearer <token>`
  - Returns: Success confirmation

### Resume Endpoints

- **`GET /profile/resumes`** - List all user resumes
  - Headers: `Authorization: Bearer <token>`
  - Returns: Array of resume metadata (id, name, upload date)
- **`POST /profile/resumes`** - Upload new resume
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ name, content }`
  - Returns: `{ resume_id }`
- **`GET /profile/resumes/{resume_id}`** - Get specific resume content
  - Headers: `Authorization: Bearer <token>`
  - Returns: Resume text content
- **`DELETE /profile/resumes/{resume_id}`** - Delete resume
  - Headers: `Authorization: Bearer <token>`
  - Returns: Success confirmation

## Database Schema

Tables are automatically created by `InterviewDatabase.init_database()` on application startup:

### `users`

- `user_id` (SERIAL, PRIMARY KEY) - Unique user identifier
- `username` (TEXT, UNIQUE, NOT NULL) - Unique username
- `password_hash` (TEXT) - SHA-256 hashed password
- `salt` (TEXT) - Random salt for password hashing
- `profile_photo` (TEXT) - Base64-encoded profile image
- `created_at` (TIMESTAMP WITH TIME ZONE) - Account creation timestamp (UTC)

### `interview_sessions`

- `session_id` (SERIAL, PRIMARY KEY) - Unique session identifier
- `user_id` (INTEGER, FOREIGN KEY) - References users(user_id)
- `interview_type` (TEXT) - Type: Technical, Behavioral, or Mixed
- `difficulty` (TEXT) - Level: Entry, Mid, or Senior
- `num_questions` (INTEGER) - Number of questions in session
- `started_at` (TIMESTAMP WITH TIME ZONE) - Session start time (UTC)
- `completed_at` (TIMESTAMP WITH TIME ZONE) - Session completion time (UTC)
- `status` (TEXT) - Session status: 'in_progress' or 'completed'

### `chat_messages`

- `message_id` (SERIAL, PRIMARY KEY) - Unique message identifier
- `session_id` (INTEGER, FOREIGN KEY) - References interview_sessions(session_id)
- `role` (TEXT) - Message sender: 'user' or 'assistant'
- `content` (TEXT) - Message content
- `timestamp` (TIMESTAMP WITH TIME ZONE) - Message timestamp (UTC)

### `resumes`

- `resume_id` (SERIAL, PRIMARY KEY) - Unique resume identifier
- `user_id` (INTEGER, FOREIGN KEY) - References users(user_id)
- `name` (TEXT) - Resume file name
- `content` (TEXT) - Extracted text content from resume
- `uploaded_at` (TIMESTAMP WITH TIME ZONE) - Upload timestamp (UTC)

All timestamp fields use UTC timezone for consistency across different server locations.

## Frontend Pages

### `/login` - Login.jsx

- Tab-based interface for login and signup
- Form validation (minimum 6 character password, password confirmation)
- Error handling with user-friendly messages
- Modern design with hero section and branding
- Auto-navigation to home on successful authentication

### `/` - Interview.jsx

- Main interview interface
- Interview configuration panel:
  - Type selector (Technical/Behavioral/Mixed)
  - Difficulty selector (Entry/Mid/Senior)
  - Question count slider (3-10)
  - Resume selection dropdown
  - Job description text area
- Real-time chat interface with AI interviewer
- Message history display
- Session management and completion detection
- Responsive design for mobile and desktop

### `/history` - History.jsx

- List of all past interview sessions
- Session cards with metadata:
  - Interview type and difficulty
  - Date and time
  - Number of questions
  - Completion status
- Expandable message timeline for each session
- Session statistics dashboard
- Empty state for new users

### `/profile` - Profile.jsx

- User information display
- Profile photo management:
  - Upload with drag-and-drop or file picker
  - Interactive crop tool with zoom and pan
  - Circular output preview
- Account settings:
  - Username update
  - Password change
  - Account deletion with confirmation
- Resume management section:
  - Upload PDF or TXT files
  - View uploaded resumes
  - Delete resumes
  - PDF text extraction preview
- Modern tabbed interface with smooth transitions

### Shared Components

#### `Layout.jsx`

- Navigation bar with logo and user menu
- Responsive navigation menu
- Logout functionality
- Consistent layout wrapper for all protected routes

## Architecture & Design Decisions

### Backend Architecture

- **FastAPI Framework:** Chosen for high performance, automatic API documentation, and modern Python async support
- **PostgreSQL Database:** Scalable, reliable ACID-compliant database for production-ready data storage
- **JWT Authentication:** Stateless authentication enabling horizontal scaling
- **OpenAI Integration:** Direct API integration for real-time AI responses
- **Modular Design:** Separation of concerns with `database.py` handling all data operations

### Frontend Architecture

- **React 19:** Latest React features with improved performance and developer experience
- **Vite Build Tool:** Lightning-fast development server and optimized production builds
- **Tailwind CSS:** Utility-first CSS for rapid UI development and consistent design
- **React Router:** Client-side routing for seamless navigation
- **Axios:** HTTP client with interceptors for automatic token injection

### Security Considerations

- **Password Hashing:** SHA-256 with unique salts per user
- **JWT Tokens:** Secure token-based authentication with expiration
- **Protected Routes:** Frontend and backend route guards
- **CORS Configuration:** Restricted to specific origins
- **Environment Variables:** Sensitive keys stored in `.env` files

### User Experience Decisions

- **Streaming Responses:** Real-time AI responses for natural conversation feel
- **Session History:** Complete interview transcripts for review and learning
- **Profile Customization:** Personal profile photos for user engagement
- **Responsive Design:** Mobile-friendly interface for practice on-the-go
- **Resume Integration:** Context-aware questions based on uploaded resumes

## Known Behavior & Implementation Details

### Interview Completion Detection

- Interview is marked as complete when AI response contains both "thank you" and "overall"
- This heuristic approach detects when the interviewer provides closing remarks
- Users can also manually end sessions

### Authentication Flow

- Frontend stores JWT token in `localStorage` on successful login
- Token is automatically included in all API requests via Axios interceptors
- Expired or missing tokens redirect users to login page
- Token contains username and expiration information

### Resume Processing

- PDF files are processed using `pdfjs-dist` library for text extraction
- Plain text (.txt) files are stored directly
- Resume content is used to generate personalized interview questions
- Multiple resumes can be stored per user

### Database Best Practices

- All timestamps stored in UTC for consistency
- Foreign key constraints maintain referential integrity
- Indexes on user_id and session_id for query performance
- Cascading deletes ensure clean data removal

## Future Enhancements

### Planned Features

- 🎤 **Voice Interview Mode:** Practice with speech-to-text and text-to-speech
- 📊 **Advanced Analytics:** Performance metrics, improvement trends, and weak areas identification
- 🤖 **AI Feedback:** Detailed feedback on answer quality, communication style, and areas to improve
- 📱 **Mobile App:** Native iOS and Android applications
- 🌐 **Multi-language Support:** Interviews in multiple languages
- 👥 **Collaborative Features:** Share sessions with mentors or coaches for review
- 🎯 **Industry Templates:** Pre-configured interview templates for specific industries
- 📧 **Email Notifications:** Session reminders and progress reports
- 💡 **Smart Recommendations:** AI-suggested areas to focus on based on performance
- 🏆 **Gamification:** Achievement badges and progress milestones

### Technical Improvements

- Containerization with Docker for easier deployment
- CI/CD pipeline for automated testing and deployment
- Rate limiting and API throttling
- Caching layer for improved performance
- WebSocket support for real-time collaboration
- Export interview sessions to PDF
- Integration with calendar apps
- OAuth authentication (Google, LinkedIn, GitHub)

## Contributing

We welcome contributions! This project was developed as a collaborative effort to help job seekers worldwide. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development Notes

### Frontend Development

- Lint code:

```bash
cd frontend
npm run lint
```

- Build for production:

```bash
cd frontend
npm run build
```

- Preview production build:

```bash
cd frontend
npm run preview
```

### Backend Development

- Run with auto-reload:

```bash
cd backend
uvicorn main:app --reload --port 8000
```

- Access API documentation:
  - Swagger UI: `http://localhost:8000/docs`
  - ReDoc: `http://localhost:8000/redoc`

### Database Management

- Connect to PostgreSQL:

```bash
psql -U username -d database_name
```

- View tables:

```sql
\dt
```

- View table schema:

```sql
\d table_name
```

## License

This project is open-source and available for educational purposes.

## Support & Contact

If you encounter any issues or have questions:

- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation in this README

---

**Made with ❤️ by Hemin, Kavya, and Nithya**

_Empowering job seekers to nail their next interview, one practice session at a time._
