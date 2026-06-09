import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'
import { getApiBaseUrl } from './api/config'

function Home() {
  const apiBaseUrl = getApiBaseUrl()
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  return (
    <div className="container mt-5">
      <h1>Welcome to OctoFit Tracker</h1>
      <p className="lead">Track your fitness journey with your team</p>
      
      {codespaceName && (
        <div className="alert alert-info mb-4">
          <strong>Codespace Detected:</strong> Using API endpoint: <code>{apiBaseUrl}</code>
        </div>
      )}
      {!codespaceName && (
        <div className="alert alert-warning mb-4">
          <strong>Local Development:</strong> Using API endpoint: <code>{apiBaseUrl}</code>
        </div>
      )}

      <div className="row mt-4">
        <div className="col-md-6">
          <h5>Quick Navigation</h5>
          <nav className="nav flex-column">
            <Link to="/users" className="nav-link">👥 Users</Link>
            <Link to="/teams" className="nav-link">🏆 Teams</Link>
            <Link to="/activities" className="nav-link">📊 Activities</Link>
            <Link to="/leaderboard" className="nav-link">📈 Leaderboard</Link>
            <Link to="/workouts" className="nav-link">💪 Workouts</Link>
          </nav>
        </div>
        <div className="col-md-6">
          <h5>About OctoFit Tracker</h5>
          <ul>
            <li>User authentication and profiles</li>
            <li>Activity logging and tracking</li>
            <li>Team creation and management</li>
            <li>Competitive leaderboard</li>
            <li>Personalized workout suggestions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/">🐙 OctoFit Tracker</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">Teams</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">Activities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">Workouts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>

      <footer className="bg-dark text-light mt-5 py-4">
        <div className="container text-center">
          <p className="mb-0">© 2026 OctoFit Tracker. Powered by React + Vite.</p>
        </div>
      </footer>
    </Router>
  )
}

export default App
