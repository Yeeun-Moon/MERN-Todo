import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:8000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // Fetching
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await axios.post(API, { text });
    setText('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1>My Todo App</h1>

      <form onSubmit={addTodo} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a todo..."
          style={{ flex: 1, padding: '8px 12px', fontSize: '14px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Add</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;