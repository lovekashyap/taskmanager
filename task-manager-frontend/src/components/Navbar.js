import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/dashboard" style={styles.brand}>
        Task Manager
      </Link>
      <button onClick={handleLogout} style={styles.logoutBtn}>
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    background: '#fff',
    borderBottom: '1px solid #eee',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  brand: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#4f46e5',
    textDecoration: 'none',
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #ddd',
    color: '#666',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
  },
};

export default Navbar;