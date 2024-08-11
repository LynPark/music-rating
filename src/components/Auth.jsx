
import React, { useState } from 'react';

const Auth = ({ onLogin }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            // Signup logic
            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(user => user.username === username)) {
                alert('Username already exists');
            } else {
                users.push({ username, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Signup successful, please log in.');
                setIsSignup(false);
            }
        } else {
            // Login logic
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                onLogin({ username });
            } else {
                alert('Invalid username or password');
            }
        }
        setUsername('');
        setPassword('');
    };

    return (
        <div className="auth-container">
            <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
            </form>
            <button onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
        </div>
    );
};

export default Auth;
