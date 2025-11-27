# Evolvion: AI-Driven Personal Mentor & Productivity Companion

Evolvion is an integrated, intelligent platform designed to act as your personal AI mentor. It solves the fragmentation of modern digital tools by unifying task management, dynamic learning, intelligent scheduling, and personal analytics into a single, cohesive ecosystem.

Instead of offering static courses or simple to-do lists, Evolvion's AI agents proactively identify your skill gaps, generate personalized learning paths, and intelligently schedule your tasks and study sessions within your defined working hours.

---

## 🚀 Features (Phase 1 Implemented)

### 🔐 User Authentication
- Secure Sign-Up & Login: Supports both Google OAuth 2.0 and traditional Email/Password authentication.
- Session Management: Robust JWT-based session handling with a global AuthContext for seamless state management across the application.
- Role-Based Access Control (RBAC): Foundation laid for different user roles (User, Admin).

### ✅ Full-Featured Task Management
- Comprehensive CRUD: Create, Read, Update, and Delete tasks with rich details.
- Detailed Attributes: Manage tasks with Title, Description, Priority ('low', 'medium', 'high', 'urgent'), Status ('pending', 'completed'), Deadline, and Estimated Duration.
- Inline Editing: A smooth, intuitive UI allows for editing task details directly within the list view.
- Smart Filtering: View tasks organized by status and priority.

### 🎓 Learning & Skill Foundation
- Learning Paths: Create and manage high-level learning goals (e.g., "Become a Data Scientist") with objectives.
- Skill Tracking: Add and track specific skills (e.g., "Python", "React") with proficiency levels and confidence scores.
- Visual Progress: Skill proficiency is visualized with dynamic progress bars.

### 💻 Modern UI/UX
- Responsive Design: Fully responsive layout built with Tailwind CSS that works on desktop and mobile.
- Dark/Light Mode: A global theme toggle that persists user preference.
- Professional Layout: A persistent MainLayout with an animated Sidebar and Header for a seamless user experience.

---

## 🏗️ System Architecture

Evolvion is built using a modern, scalable Microservices-inspired Architecture.

### Frontend
- Framework: React (v18+) with Vite
- Language: TypeScript
- Styling: Tailwind CSS
- State Management: React Context API (AuthContext, ThemeContext)
- Routing: React Router v6
- HTTP Client: Axios (with interceptors for JWT handling)

### Backend (Core API)
- Runtime: Node.js
- Framework: Express.js
- Language: TypeScript
- Authentication: Passport.js (Google Strategy), bcryptjs, jsonwebtoken
- Database Driver: pg (node-postgres)

### Database
- System: PostgreSQL (v16+)
- Extensions:
    - pgvector: For storing vector embeddings (future AI features).
    - pgcrypto: For generating UUIDs.
- Design: BCNF-compliant schema with tables for users, tasks, skills, user_skills, learning_paths, and more.

### Infrastructure
- Containerization: Docker & Docker Compose used for orchestrating the PostgreSQL database and RabbitMQ message broker.
- Messaging: RabbitMQ (configured for future async AI agent communication).

---

## 🛠️ Installation & Setup

Follow these steps to run Evolvion locally on your machine.

### Prerequisites
- Node.js (v18 or higher)
- Docker & Docker Desktop
- Git

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/evolvion.git](https://github.com/yourusername/evolvion.git)
cd evolvion
```

### 2. Start Infrastructure (Database & Queue)
Make sure Docker Desktop is running, then start the services:
```bash
docker-compose up -d
```
This will start PostgreSQL (with pgvector) and RabbitMQ.

### 3. Backend Setup
Open a new terminal and navigate to the backend directory:
```bash
cd backend-api

# Install dependencies
npm install

# Create a .env file
cp .env.example .env
# Update .env with your DB credentials and Google OAuth keys

# Start the server
npm run dev
```
The backend API will start running at http://localhost:3001.

### 4. Frontend Setup
Open another terminal and navigate to the frontend directory:
```bash
cd frontend-web

# Install dependencies
npm install

# Start the development server
npm run dev
```
The application will be available at http://localhost:5173.

---

## 🔮 Future Roadmap (Phase 2: AI Integration)

The current version establishes the robust manual foundation. The next phase focuses on activating the Multi-Agent AI System:

- 🤖 Scheduler Agent: An intelligent agent (Python/FastAPI) that automatically schedules tasks within your defined working hours, avoiding calendar conflicts.
- 🧠 Skill-Gap Agent: Analyzes your goals and current skills to identify exactly what you need to learn next.
- 📚 Content Generator Agent: Dynamically generates personalized course curriculums, reading materials, and quizzes tailored to your skill gaps.
- 💬 Chat Companion Agent: A context-aware chatbot (using RAG with pgvector) that can answer questions based on your notes and learning materials.
- 📊 Analytics Dashboard: Visual insights into your productivity trends and learning velocity.

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author
George Paul Tony C  
Department of Computer Science and Engineering  
Saveetha Engineering College, Chennai

Email
