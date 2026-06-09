import { useState, useEffect } from 'react';
import { makeApiRequest } from '../api/config';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const data = await makeApiRequest('/activities');
        
        // Handle both paginated and array responses
        const activitiesList = data.activities || data.data || data;
        setActivities(Array.isArray(activitiesList) ? activitiesList : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Activities</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Calories Burned</th>
              <th>Distance (km)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id || activity._id}>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes || activity.duration || 0}</td>
                <td>{activity.caloriesBurned || activity.calories || 0}</td>
                <td>{activity.distanceKm || activity.distance || 'N/A'}</td>
                <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {activities.length === 0 && <p className="text-muted">No activities found.</p>}
    </div>
  );
}
