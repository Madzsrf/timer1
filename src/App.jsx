import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State initialization with localStorage support
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  // Persist to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  }, [tasks]);

  // Logic functions
  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask = { id: Date.now(), text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Derived state for stats
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="app">
      <h1>Todo List</h1>
      
      {/* Stats Section */}
      <div className="stats">
        <span>Total: {tasks.length}</span>
        <span>Completed: {completedCount}</span>
        <span>Pending: {tasks.length - completedCount}</span>
      </div>

      {/* Input Form */}
      <form onSubmit={addTask}>
        <input 
          type="text"
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Add a new task..." 
        />
        <button type="submit">Add</button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span 
              onClick={() => toggleTask(task.id)} 
              className={task.completed ? 'completed' : ''}
            >
              {task.text}
            </span>
            <button 
              className="delete-btn" 
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
