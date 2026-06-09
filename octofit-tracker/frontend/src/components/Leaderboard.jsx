import { useState, useEffect } from 'react';
import { makeApiRequest } from '../api/config';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await makeApiRequest('/leaderboard');
        
        // Handle both paginated and array responses
        const leaderboardList = data.leaderboard || data.data || data;
        setLeaderboard(Array.isArray(leaderboardList) ? leaderboardList : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Competitive Leaderboard</h1>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Category</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.id || entry._id || index} className={index < 3 ? 'table-success' : ''}>
                <td>
                  <strong>
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && entry.rank}
                  </strong>
                </td>
                <td>{entry.team || 'Unknown Team'}</td>
                <td><span className="badge bg-info">{entry.category || 'General'}</span></td>
                <td><strong>{entry.points || entry.totalPoints || 0}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {leaderboard.length === 0 && <p className="text-muted">No leaderboard data available.</p>}
    </div>
  );
}
