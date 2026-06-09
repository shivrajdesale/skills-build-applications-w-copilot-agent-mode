import { useState, useEffect } from 'react';
import { makeApiRequest } from '../api/config';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await makeApiRequest('/users');
        
        // Handle both paginated and array responses
        const usersList = data.users || data.data || data;
        setUsers(Array.isArray(usersList) ? usersList : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h1>Users</h1>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id || user._id}>
                <td>{user.name}</td>
                <td>{user.email || 'N/A'}</td>
                <td><span className="badge bg-info">{user.role}</span></td>
                <td>{user.totalPoints || user.points || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length === 0 && <p className="text-muted">No users found.</p>}
    </div>
  );
}
