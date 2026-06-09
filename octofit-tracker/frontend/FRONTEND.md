# OctoFit Tracker Frontend - React 19 with Vite

A modern React 19 presentation tier for the OctoFit Tracker multi-tier application, built with Vite for fast development and optimized production builds.

## Project Structure

```
src/
├── api/
│   └── config.js          # API configuration with Codespaces support
├── components/
│   ├── Users.jsx          # Users list component
│   ├── Teams.jsx          # Teams showcase component
│   ├── Activities.jsx     # Activities log component
│   ├── Leaderboard.jsx    # Competitive leaderboard component
│   └── Workouts.jsx       # Workout suggestions component
├── App.jsx                # Main router and layout
├── main.jsx               # Application entry point
├── App.css                # Application styles
└── index.css              # Global styles
```

## Environment Configuration

### Codespaces Deployment

1. Create a `.env.local` file in the `frontend/` directory:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

Replace `your-codespace-name` with your actual Codespace name (e.g., `octofit-abc123def456`).

2. The frontend will automatically use the API endpoint:
```
https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api
```

### Local Development

1. Leave `.env.local` empty or unset `VITE_CODESPACE_NAME`:

```bash
VITE_CODESPACE_NAME=
```

2. The frontend will use the localhost endpoint:
```
http://localhost:8000/api
```

## Key Features

### API Configuration (`src/api/config.js`)

- **Automatic URL Resolution**: Detects Codespaces environment and adjusts API base URL
- **Safe Fallback**: Defaults to localhost if `VITE_CODESPACE_NAME` is undefined or "undefined"
- **Flexible Endpoint Handling**: Supports both paginated and array responses

```javascript
import { makeApiRequest, getApiBaseUrl, getEndpointUrl } from './api/config'

// Get the current API base URL
const baseUrl = getApiBaseUrl() // Returns: https://codespace-name-8000.app.github.dev/api OR http://localhost:8000/api

// Make API requests
const data = await makeApiRequest('/users')

// Get full endpoint URL
const url = getEndpointUrl('/teams')
```

### Components

All components follow a consistent pattern:

1. **Data Fetching**: Uses `useEffect` to fetch data on mount
2. **Error Handling**: Displays error messages if requests fail
3. **Loading State**: Shows spinner while loading
4. **Response Compatibility**: Handles both paginated (`data.users`, `data.data`) and array responses
5. **Fallback Display**: Shows "No data" message when empty

#### Users Component
- Displays list of users in a table
- Shows: Name, Email, Role, Total Points

#### Teams Component
- Displays teams as cards
- Shows: Name, Description, Member count, Total Points

#### Activities Component
- Shows activity log in table format
- Shows: Type, Duration, Calories, Distance, Date

#### Leaderboard Component
- Competitive rankings with medals (🥇🥈🥉)
- Shows: Rank, Team Name, Category, Points
- Highlights top 3 teams

#### Workouts Component
- Personalized workout suggestions as cards
- Shows: Name, Description, Difficulty, Category, Duration
- Interactive "Start Workout" button

## Development

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Server runs at `http://localhost:5173` by default.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Technologies

- **React 19**: Modern UI library with latest features
- **Vite**: Lightning-fast build tool
- **React Router DOM**: Client-side routing
- **Bootstrap**: CSS framework for styling
- **Vite Environment Variables**: Runtime configuration support

## API Endpoints

All endpoints are prefixed with the base URL (Codespaces or localhost):

- `GET /api/users` - List of users
- `GET /api/teams` - List of teams
- `GET /api/activities` - List of activities
- `GET /api/leaderboard` - Competitive leaderboard
- `GET /api/workouts` - Personalized workouts

## Response Format Compatibility

The components automatically handle both response formats:

**Paginated Format:**
```json
{
  "users": [...],
  "pagination": { "page": 1, "total": 100 }
}
```

**Array Format:**
```json
{
  "data": [...]
}
```

**Direct Array:**
```json
[...]
```

## Troubleshooting

### API Connection Issues

1. **Check environment variable**: Verify `VITE_CODESPACE_NAME` is set correctly
2. **Check backend status**: Ensure backend is running on port 8000
3. **Check network**: Verify Codespaces ports are properly forwarded
4. **Browser console**: Check for detailed error messages

### CORS Issues

Ensure the backend has proper CORS configuration for the frontend URL.

### Undefined API URL

If you see `https://undefined-8000...`, the `VITE_CODESPACE_NAME` environment variable is not set. Update `.env.local` with your actual Codespace name.

## Contributing

Follow the guidelines in the `.github/instructions/` directory for this project.
