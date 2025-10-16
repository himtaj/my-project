// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ The fetch URL MUST point to the backend's port (5000)
    fetch('http://localhost:5000/api/data') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setData({ message: 'Failed to fetch data. Check server logs.' });
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React & Express CORS Example</h1>
        {loading ? (
          <p>Loading data from backend...</p>
        ) : (
          <p>Backend Message: **{data ? data.message : 'No Data'}**</p>
        )}
      </header>
    </div>
  );
}

export default App;