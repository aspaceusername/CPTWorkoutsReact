import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext); // Use login function from context

  const handleLogin = async () => {
    const data = { Email: email, Password: password };
    try {
      const response = await fetch('https://cptworkouts20240701174748.azurewebsites.net/api/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Assuming response.ok means login successful
      const userData = await response.json(); // Extract user data from response
      login(userData); // Call login function to set user in context

      // Redirect or handle success as needed
      window.location.href = '/'; // Redirect to home page after successful login

    } catch (error) {
      setError('Invalid login attempt. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
