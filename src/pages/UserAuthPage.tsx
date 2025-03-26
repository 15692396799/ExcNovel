import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authStore } from '../stores/auth';
import { useNavigate } from 'react-router-dom';

const UserAuthPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<{ username: string; email: string } | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const navigate = useNavigate();

    // 自动重定向已登录用户
    // useEffect(() => {
    //     if (authStore.isLoggedIn) {
    //         navigate('/redirect');
    //     }
    // }, [authStore.isLoggedIn, navigate]);

    //处理登录
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setMessage({ text: 'Please enter username and password', type: 'error' });
            return;
        }

        try {
            await authStore.login(username, password);
            setMessage({ text: 'Login successful!', type: 'success' });
            navigate('/redirect');
        } catch (error) {
            setMessage({
                text: error instanceof Error ? error.message : 'Login failed',
                type: 'error'
            });
        }
    };

    // 处理注册
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password || !email) {
            setMessage({ text: 'Please fill in all fields', type: 'error' });
            return;
        }

        try {
            // 假设你的 authStore 有 register 方法
            await authStore.register(username, email, password);
            setMessage({ text: 'Registration successful!', type: 'success' });
            navigate('/redirect');
        } catch (error) {
            setMessage({
                text: error instanceof Error ? error.message : 'Registration failed',
                type: 'error'
            });
        }
    };

    // 切换登录/注册表单
    const toggleAuthMode = () => {
        setIsRegistering(!isRegistering);
        setMessage(null);
        setUsername('');
        setPassword('');
        setEmail('');
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
                        {/* <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button> */}
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

export default UserAuthPage;