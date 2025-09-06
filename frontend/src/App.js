import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/items')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Welcome to SynergySphere</h1>
      </header>
      <main>
        <p>This is the React frontend for the SynergySphere application.</p>
        <h2>Items</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)} {item.available ? '' : '(Unavailable)'}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
