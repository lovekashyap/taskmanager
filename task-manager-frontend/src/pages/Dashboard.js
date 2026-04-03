import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../src/api';
import TaskCard from '../../src/components/TaskCard';
import Navbar from '../../src/components/Navbar';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError('Failed to load tasks');
    }
    setLoading(false);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await API.post('/tasks', { title, description });
      setTasks([res.data, ...tasks]);
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const handleToggle = async (id) => {
    try {
      const task = tasks.find(t => t._id === id);
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      const res = await API.put(`/tasks/${id}`, { status: newStatus });
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Navbar />

      <div style={styles.container}>

        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <p style={styles.statNum}>{tasks.length}</p>
            <p style={styles.statLabel}>Total tasks</p>
          </div>
          <div style={styles.statCard}>
            <p style={{ ...styles.statNum, color: '#ca8a04' }}>{pendingCount}</p>
            <p style={styles.statLabel}>Pending</p>
          </div>
          <div style={styles.statCard}>
            <p style={{ ...styles.statNum, color: '#16a34a' }}>{completedCount}</p>
            <p style={styles.statLabel}>Completed</p>
          </div>
        </div>

        {/* Add task form */}
        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>Add a new task</h3>
          {error && <div style={styles.error}>{error}</div>}
          <form onSubmit={handleAddTask}>
            <input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ marginBottom: '10px' }}
              required
            />
            <input
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginBottom: '14px' }}
            />
            <button type="submit" style={styles.addBtn}>
              Add Task
            </button>
          </form>
        </div>

        {/* Filter buttons */}
        <div style={styles.filterRow}>
          {['all', 'pending', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                background: filter === f ? '#4f46e5' : '#fff',
                color: filter === f ? '#fff' : '#666',
                border: filter === f ? '1px solid #4f46e5' : '1px solid #ddd',
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <span style={styles.taskCount}>
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Task list */}
        {loading ? (
          <p style={styles.empty}>Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p style={styles.empty}>No tasks here. Add one above.</p>
        ) : (
          filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '640px',
    margin: '0 auto',
    padding: '24px 16px',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '20px',
  },
  statCard: {
    background: '#fff',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    border: '1px solid #eee',
  },
  statNum: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#4f46e5',
    margin: '0 0 4px',
  },
  statLabel: {
    fontSize: '12px',
    color: '#888',
    margin: 0,
  },
  formCard: {
    background: '#fff',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    border: '1px solid #eee',
  },
  formTitle: {
    fontSize: '15px',
    fontWeight: '500',
    marginBottom: '14px',
    color: '#444',
  },
  addBtn: {
    width: '100%',
    padding: '12px',
    background: '#4f46e5',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '500',
  },
  filterRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '7px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '500',
  },
  taskCount: {
    fontSize: '13px',
    color: '#aaa',
    marginLeft: 'auto',
  },
  error: {
    background: '#fef2f2',
    color: '#dc2626',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    marginBottom: '14px',
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: '60px',
    fontSize: '15px',
  },
};

export default Dashboard;