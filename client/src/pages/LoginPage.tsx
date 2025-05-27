import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../apis/dogApi';

/**
 * LoginPage is the entry screen for the application.
 * It collects the user's name and email, then authenticates them
 * using the `loginUser` API call. On success, it stores the user in context
 * and redirects them to the dog search page.
 */
const LoginPage: React.FC = () => {
  // Controlled form state for name and email inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Access AuthContext to store authenticated user
  const { login: loginContext } = useAuth();

  // React Router navigation
  const navigate = useNavigate();

  /**
   * Handles form submission by calling the login API.
   * On success, user context is updated and redirected to `/dogs`.
   * On failure, an error message is shown.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(name, email); // API call to authenticate
      loginContext({ name, email, token: '' }); // Save user in context (token unused)
      navigate('/dogs'); // Redirect to search page
    } catch {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container" style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>🐶 Welcome to Fetch!</h1>

        {/* Name input field */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
          style={styles.input}
        />

        {/* Email input field */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          type="email"
          required
          style={styles.input}
        />

        {/* Submit button */}
        <button type="submit" style={styles.button}>Login</button>

        {/* Display error message if login fails */}
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

// Inline styling for form layout and appearance
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)', // Soft background gradient
  },
  form: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)', // Subtle shadow for depth
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    textAlign: 'center',
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#4f46e5', // Indigo
    color: '#fff',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '0.5rem',
  },
};

export default LoginPage;
