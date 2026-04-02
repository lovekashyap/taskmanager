import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #eee' }}>
      <Link to="/dashboard" style={{ fontWeight: '500', textDecoration: 'none' }}>
        Task Manager
      </Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;