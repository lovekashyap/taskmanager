import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import TaskCard from '../components/TaskCard';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch all tasks on page load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        // Token expired or invalid — send to login
        localStorage.removeItem('token');
        navigate('/login');
      }
      setError('Failed to load tasks');
    }
  };

  // Create a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await API.post('/tasks', { title, description });
      setTasks([res.data, ...tasks]); // add to top of list
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to add task');
    }
  };

  // Toggle task status
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

  // Delete a task
  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ margin: 0 }}>My Tasks</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Error message */}
      {error && (
        <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>
      )}

      {/* Add task form */}
      <form onSubmit={handleAddTask} style={{ marginBottom: '24px' }}>
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '10px', boxSizing: 'border-box' }}
        />
        <input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '10px', boxSizing: 'border-box' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px' }}>
          Add Task
        </button>
      </form>

      {/* Filter buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['all', 'pending', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid #ddd',
              background: filter === f ? '#000' : 'transparent',
              color: filter === f ? '#fff' : '#000',
              cursor: 'pointer'
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task count */}
      <p style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>
        {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
      </p>

      {/* Task list */}
      {filteredTasks.length === 0 ? (
        <p style={{ color: '#aaa', textAlign: 'center', marginTop: '40px' }}>
          No tasks here. Add one above.
        </p>
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
  );
}

export default Dashboard;