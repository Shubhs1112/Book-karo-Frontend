import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import '../components/admin/AdminLandingPage'
import '../resources/Login.css'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the payload
        const payload = {
            username: username,
            password: password,
        };

        try {
            const response = await fetch(`http://localhost:8080/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message); // Display success message
                // Handle successful login
                let user = data;
                dispatch(login(user.username));

                if(user.role === 'Customer') navigate('/');
                else navigate('/admin');

            } else {
                const errorData = await response.json(); // Parse error JSON
                setMessage(errorData.error || 'Login failed');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-header">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-form-group">
                    <label htmlFor="username" className="login-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                        required
                    />
                </div>
                <div className="login-form-group">
                    <label htmlFor="password" className="login-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            {message && <p className="login-message">{message}</p>}
            {/* Signup link */}
            <p className="signup-link">
                Don't have an account? <Link to="/register">Sign up here</Link>
            </p>
        </div>
    );
};

export default Login;
