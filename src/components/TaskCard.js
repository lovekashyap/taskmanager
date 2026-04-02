function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '16px', marginBottom: '12px' }}>
      <h4 style={{ margin: '0 0 6px', textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
        {task.title}
      </h4>
      <p style={{ margin: '0 0 12px', color: '#666', fontSize: '14px' }}>{task.description}</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => onToggle(task._id)}>
          {task.status === 'completed' ? 'Mark pending' : 'Mark complete'}
        </button>
        <button onClick={() => onDelete(task._id)} style={{ color: 'red' }}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;