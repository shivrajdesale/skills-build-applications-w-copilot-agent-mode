import { useState, useEffect } from 'react';
import { makeApiRequest } from '../api/config';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const data = await makeApiRequest('/workouts');
        
        // Handle both paginated and array responses
        const workoutsList = data.workouts || data.data || data;
        setWorkouts(Array.isArray(workoutsList) ? workoutsList : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Personalized Workouts</h1>
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout.id || workout._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text">{workout.description || 'No description available'}</p>
                <div className="mb-3">
                  <span className="badge bg-warning text-dark me-2">
                    {workout.difficulty || 'Medium'}
                  </span>
                  <span className="badge bg-info">
                    {workout.category || 'General'}
                  </span>
                </div>
                <p className="card-text">
                  <small className="text-muted">⏱️ {workout.durationMinutes || workout.duration || 0} minutes</small>
                </p>
              </div>
              <div className="card-footer bg-light">
                <button className="btn btn-primary btn-sm w-100">Start Workout</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {workouts.length === 0 && <p className="text-muted">No workouts available.</p>}
    </div>
  );
}
