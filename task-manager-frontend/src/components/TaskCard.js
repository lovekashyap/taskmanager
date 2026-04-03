function TaskCard({ task, onDelete, onToggle }) {
  const isCompleted = task.status === 'completed';

  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <div style={styles.left}>
          <div
            onClick={() => onToggle(task._id)}
            style={{
              ...styles.checkbox,
              background: isCompleted ? '#4f46e5' : '#fff',
              borderColor: isCompleted ? '#4f46e5' : '#ddd',
            }}
          >
            {isCompleted && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <div>
            <p style={{
              ...styles.title,
              textDecoration: isCompleted ? 'line-through' : 'none',
              color: isCompleted ? '#aaa' : '#1a1a1a',
            }}>
              {task.title}
            </p>
            {task.description && (
              <p style={styles.desc}>{task.description}</p>
            )}
          </div>
        </div>
        <span style={{
          ...styles.badge,
          background: isCompleted ? '#f0fdf4' : '#fefce8',
          color: isCompleted ? '#16a34a' : '#ca8a04',
        }}>
          {isCompleted ? 'Completed' : 'Pending'}
        </span>
      </div>

      <div style={styles.actions}>
        <button
          onClick={() => onToggle(task._id)}
          style={styles.toggleBtn}
        >
          {isCompleted ? 'Mark pending' : 'Mark complete'}
        </button>
        <button
          onClick={() => onDelete(task._id)}
          style={styles.deleteBtn}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    border: '1px solid #eee',
    borderRadius: '12px',
    padding: '16px 20px',
    marginBottom: '12px',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '14px',
  },
  left: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    flex: 1,
  },
  checkbox: {
    width: '22px',
    height: '22px',
    borderRadius: '6px',
    border: '2px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    marginTop: '2px',
    transition: 'all 0.2s',
  },
  title: {
    fontSize: '15px',
    fontWeight: '500',
    marginBottom: '4px',
  },
  desc: {
    fontSize: '13px',
    color: '#888',
  },
  badge: {
    fontSize: '11px',
    fontWeight: '500',
    padding: '4px 10px',
    borderRadius: '20px',
    flexShrink: 0,
    marginLeft: '12px',
  },
  actions: {
    display: 'flex',
    gap: '8px',
    borderTop: '1px solid #f0f0f0',
    paddingTop: '12px',
  },
  toggleBtn: {
    background: '#f5f3ff',
    color: '#4f46e5',
    padding: '7px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
  },
  deleteBtn: {
    background: '#fef2f2',
    color: '#dc2626',
    padding: '7px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
  },
};

export default TaskCard;