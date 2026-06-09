import { useState, useEffect } from 'react';
import { makeApiRequest } from '../api/config';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const data = await makeApiRequest('/teams');
        
        // Handle both paginated and array responses
        const teamsList = data.teams || data.data || data;
        setTeams(Array.isArray(teamsList) ? teamsList : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Teams</h1>
      <div className="row">
        {teams.map((team) => (
          <div key={team.id || team._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description || 'No description'}</p>
                <div className="d-flex justify-content-between">
                  <span className="badge bg-primary">Members: {team.members?.length || 0}</span>
                  <span className="badge bg-success">Points: {team.totalPoints || team.points || 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {teams.length === 0 && <p className="text-muted">No teams found.</p>}
    </div>
  );
}
