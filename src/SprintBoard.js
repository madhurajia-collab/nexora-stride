import React, { useState } from 'react';

function SprintBoard({ setCurrentPage }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Setup auth module", assignee: "Rahul", status: "done", priority: "high" },
    { id: 2, title: "Build API endpoints", assignee: "Priya", status: "inprogress", priority: "high" },
    { id: 3, title: "Fix payment bug", assignee: "Amit", status: "blocked", priority: "critical" },
    { id: 4, title: "Design dashboard UI", assignee: "Sara", status: "done", priority: "medium" },
    { id: 5, title: "Write unit tests", assignee: "Rahul", status: "inprogress", priority: "medium" },
    { id: 6, title: "Setup database", assignee: "Priya", status: "todo", priority: "high" },
    { id: 7, title: "Deploy to staging", assignee: "Amit", status: "todo", priority: "low" },
    { id: 8, title: "Code review", assignee: "Sara", status: "todo", priority: "medium" },
  ]);

  const columns = [
    { id: "todo", label: "To Do", color: "#8B949E", count: tasks.filter(t => t.status === "todo").length },
    { id: "inprogress", label: "In Progress", color: "#6D28D9", count: tasks.filter(t => t.status === "inprogress").length },
    { id: "blocked", label: "Blocked", color: "#DC2626", count: tasks.filter(t => t.status === "blocked").length },
    { id: "done", label: "Done", color: "#16A34A", count: tasks.filter(t => t.status === "done").length },
  ];

  const getPriorityColor = (priority) => {
    if (priority === "critical") return "#DC2626";
    if (priority === "high") return "#EA580C";
    if (priority === "medium") return "#6D28D9";
    if (priority === "low") return "#16A34A";
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div style={{
      backgroundColor: '#0D1117',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#FFFFFF'
    }}>

      {/* Navbar */}
      <div style={{
        backgroundColor: '#161B22',
        borderBottom: '1px solid #30363D',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#6D28D9', fontWeight: 'bold', fontSize: '12px', letterSpacing: '2px' }}>NEXORA</span>
          <span style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '20px' }}>Stride</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span
  onClick={() => setCurrentPage('sprintboard')}
  style={{ color: '#8B949E', fontSize: '14px', cursor: 'pointer' }}>
  Sprint Board
</span>
          <span style={{ color: '#6D28D9', fontSize: '14px', fontWeight: 'bold', borderBottom: '2px solid #6D28D9', paddingBottom: '2px' }}>Sprint Board</span>
          <span
  onClick={() => setCurrentPage('team')}
  style={{ color: '#8B949E', fontSize: '14px', cursor: 'pointer' }}>
  Team
</span>
          <div style={{ backgroundColor: '#6D28D9', borderRadius: '20px', padding: '6px 16px', fontSize: '14px' }}>
            👤 John's Team
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '32px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Sprint Board</h1>
            <p style={{ color: '#8B949E', margin: '0' }}>Sprint 12 · 6 days remaining</p>
          </div>
          <button style={{
            backgroundColor: '#6D28D9',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            + Add Task
          </button>
        </div>

        {/* Kanban Board */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px'
        }}>
          {columns.map(column => (
            <div key={column.id} style={{
              backgroundColor: '#161B22',
              border: '1px solid #30363D',
              borderRadius: '12px',
              padding: '16px'
            }}>

              {/* Column Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: column.color
                  }}/>
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{column.label}</span>
                </div>
                <span style={{
                  backgroundColor: '#30363D',
                  borderRadius: '999px',
                  padding: '2px 8px',
                  fontSize: '12px',
                  color: '#8B949E'
                }}>
                  {column.count}
                </span>
              </div>

              {/* Tasks */}
              {tasks
                .filter(task => task.status === column.id)
                .map(task => (
                  <div key={task.id} style={{
                    backgroundColor: '#0D1117',
                    border: '1px solid #30363D',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '8px'
                  }}>
                    {/* Priority Badge */}
                    <div style={{
                      display: 'inline-block',
                      backgroundColor: getPriorityColor(task.priority),
                      color: '#FFFFFF',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      marginBottom: '8px',
                      textTransform: 'uppercase'
                    }}>
                      {task.priority}
                    </div>

                    {/* Task Title */}
                    <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.4' }}>
                      {task.title}
                    </p>

                    {/* Assignee */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        backgroundColor: '#30363D',
                        borderRadius: '999px',
                        padding: '4px 10px',
                        fontSize: '12px',
                        color: '#8B949E'
                      }}>
                        👤 {task.assignee}
                      </span>

                      {/* Move Button */}
                      {column.id !== 'done' && (
                        <button
                          onClick={() => moveTask(task.id, column.id === 'todo' ? 'inprogress' : column.id === 'inprogress' ? 'done' : 'done')}
                          style={{
                            backgroundColor: '#6D28D9',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '4px 10px',
                            fontSize: '11px',
                            cursor: 'pointer'
                          }}>
                          Move →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SprintBoard;