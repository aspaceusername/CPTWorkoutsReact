import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import './LoginForm.css'; // Import the CSS file

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

            const userData = await response.json(); 
            login(userData); 

            window.location.href = '/';

        } catch (error) {
            setError('Invalid login attempt. Please check your credentials.');
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
