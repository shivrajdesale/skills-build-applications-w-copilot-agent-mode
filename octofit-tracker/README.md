# OctoFit Tracker - Multi-Tier Application

A modern multi-tier fitness tracking application with user authentication, activity logging, team management, and competitive leaderboard features.

## Project Structure

```
octofit-tracker/
├── backend/          # Express + TypeScript server
│   ├── src/
│   │   └── server.ts  # Main server entry point
│   ├── package.json
│   └── tsconfig.json
└── frontend/         # React 19 + Vite client
    ├── src/
    │   ├── App.jsx   # Main React component with routing
    │   └── ...
    ├── package.json
    └── vite.config.js
```

## Technology Stack

### Frontend (Port 5173)
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Bootstrap** - CSS framework

### Backend (Port 8000)
- **Node.js** (LTS) - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Mongoose** - MongoDB ODM

### Data Tier (Port 27017)
- **MongoDB** - NoSQL database

## Getting Started

### Prerequisites
- Node.js LTS
- npm or yarn
- MongoDB running locally or accessible

### Installation

#### Backend Setup
```bash
cd octofit-tracker/backend
npm install
```

#### Frontend Setup
```bash
cd octofit-tracker/frontend
npm install
```

## Running the Application

### Start MongoDB
```bash
mongod --port 27017
```

### Start Backend Server
```bash
cd octofit-tracker/backend
npm run dev
```
The backend will start at `http://localhost:8000`

### Start Frontend Development Server
```bash
cd octofit-tracker/frontend
npm run dev
```
The frontend will start at `http://localhost:5173`

## Available Scripts

### Backend
- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Features (In Development)

- ✅ User authentication and profiles
- ✅ Activity logging and tracking
- ✅ Team creation and management
- ✅ Competitive leaderboard
- ✅ Personalized workout suggestions

## API Endpoints

### Health Check
- `GET /api/health` - Backend health check

## Environment Configuration

### Ports
- Frontend: `5173`
- Backend: `8000`
- MongoDB: `27017`

## Development Notes

- The backend uses TypeScript for type safety
- The frontend uses ES modules with Vite for fast HMR
- Bootstrap is included for quick UI development
- MongoDB connection uses Mongoose ODM for schema management

## Contributing

Follow the guidelines in the `.github/instructions/` directory for this project.

## License

ISC
