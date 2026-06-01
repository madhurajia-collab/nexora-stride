import React from 'react';
import Navbar from './Navbar';

function SprintBoard({ setCurrentPage, tasks, moveTask }) {

  const columns = [
    { id: 'todo',       label: 'To Do',       color: '#8B949E' },
    { id: 'inprogress', label: 'In Progress',  color: '#6D28D9' },
    { id: 'blocked',    label: 'Blocked',      color: '#DC2626' },
    { id: 'done',       label: 'Done',         color: '#16A34A' },
  ];

  const getPriorityColor = (priority) => {
    if (priority === 'critical') return '#DC2626';
    if (priority === 'high')     return '#EA580C';
    if (priority === 'medium')   return '#6D28D9';
    if (priority === 'low')      return '#16A34A';
  };

  const getNextStatus = (currentStatus) => {
    if (currentStatus === 'todo')       return 'inprogress';
    if (currentStatus === 'inprogress') return 'done';
    if (currentStatus === 'blocked')    return 'done';
    return 'done';
  };

  return (
    <div style={{
      backgroundColor: '#0D1117',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#FFFFFF'
    }}>

      <Navbar currentPage="sprintboard" setCurrentPage={setCurrentPage} />

      <div style={{ padding: '32px' }}>

        <div style={{
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
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
                  {tasks.filter(t => t.status === column.id).length}
                </span>
              </div>

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

                    <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.4' }}>
                      {task.title}
                    </p>

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

                      {column.id !== 'done' && (
                        <button
                          onClick={() => moveTask(task.id, getNextStatus(task.status))}
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