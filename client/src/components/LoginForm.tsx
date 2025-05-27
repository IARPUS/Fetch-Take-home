import React, { useState } from 'react';

// Props definition for the LoginForm component
interface LoginFormProps {
  onLogin: (name: string, email: string) => void; // Callback to pass credentials to parent
}

/**
 * LoginForm is a controlled form component that collects a user's name and email.
 * When submitted, it calls the `onLogin` function passed in via props.
 * 
 * - Input values are managed with React state.
 * - Validation is done using native `required` attributes.
 */
const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  // Controlled input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Handles form submission and calls the parent handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();           // Prevents page reload
    onLogin(name, email);         // Triggers login action in parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name input field */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />

      {/* Email input field */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      {/* Submit button */}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
