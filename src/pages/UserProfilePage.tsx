import React, { useState } from 'react';
import axios from 'axios';

const UserProfilePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<{ username: string; email: string } | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    // 处理登录
    const handleLogin = async () => {
        if (!username || !password) {
            setMessage({ text: 'Please enter username and password', type: 'error' });
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });

            // 存储 JWT 到 localStorage
            localStorage.setItem('token', response.data.token);

            // 更新用户状态
            setUser({ username: response.data.user.username, email: response.data.user.email });
            setIsLoggedIn(true);
            setMessage({ text: 'Login Successfully!', type: 'success' });
        } catch (err) {
            setMessage({ text: (err as any).response?.data?.message || 'Login failed', type: 'error' });
        }
    };

    // 处理注册
    const handleRegister = async () => {
        if (!username || !password || !email) {
            setMessage({ text: 'Please fill in all fields', type: 'error' });
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                email,
                password,
            });

            // 存储 JWT 到 localStorage
            localStorage.setItem('token', response.data.token);

            // 更新用户状态
            setUser({ username: response.data.user.username, email: response.data.user.email });
            setIsLoggedIn(true);
            setMessage({ text: 'Registration Successfully!', type: 'success' });
        } catch (err) {
            setMessage({ text: (err as any).response?.data?.message || 'Registration failed', type: 'error' });
        }
    };

    // 处理注销
    const handleLogout = () => {
        // 清除 localStorage 中的 JWT
        localStorage.removeItem('token');

        // 重置状态
        setIsLoggedIn(false);
        setUser(null);
        setUsername('');
        setPassword('');
        setEmail('');
        setMessage(null);
    };

    return (
        <div className="container mt-5">
            {isLoggedIn ? (
                <div className="card p-4">
                    <h2 className="card-title">User Profile</h2>
                    <div className="card-body">
                        <p className="card-text">
                            <strong>Username:</strong> {user?.username}
                        </p>
                        <p className="card-text">
                            <strong>Email:</strong> {user?.email}
                        </p>
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <div className="card p-4">
                    <h2 className="card-title">{isRegistering ? 'Register' : 'Login'}</h2>
                    <div className="card-body">
                        {message && (
                            <div
                                className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}
                                role="alert"
                            >
                                {message.text}
                            </div>
                        )}
                        {isRegistering && (
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password:
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            className="btn btn-primary me-2"
                            onClick={isRegistering ? handleRegister : handleLogin}
                        >
                            {isRegistering ? 'Register' : 'Login'}
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setIsRegistering(!isRegistering)}
                        >
                            {isRegistering ? 'Switch to Login' : 'Switch to Register'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfilePage;