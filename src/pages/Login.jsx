import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

export const Login = () => {
  const [credentials, setCredentials] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Load data from JSON file on component mount
  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const response = await fetch('/credentials.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCredentials(data.users); // Update to handle array of users
      } catch (error) {
        setErrorMessage('Error loading credentials.');
      }
    };

    loadCredentials();
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if entered credentials match any user in the list
    const user = credentials.find(
      (cred) => cred.username === username && cred.password === password
    );

    if (user) {
      setIsLoggedIn(true);
      setErrorMessage(''); // Clear any previous error messages
      navigate('/location'); // Redirect to /location
    } else {
      setErrorMessage('Invalid username or password.');
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          {/* Add content for logged-in users here (e.g., profile, protected data) */}
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </div>
      ) : (
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label className='label'>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className='label'>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="btn">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};
