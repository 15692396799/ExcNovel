import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { authStore } from './stores/auth';

const Header: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [content, setContent] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = () => {
        setContent(inputValue);
        console.log(inputValue);
    };

    return (
<header className="header navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
        <div className="logo navbar-brand">
            <Link to="/">EXVNOC</Link> {/* 可替换为 <img src="logo.png" alt="Logo" /> */}
        </div>

        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
            {/* 导航链接，占 8 列，均匀分布 */}
            <nav className="nav navbar-nav col-6 d-flex justify-content-around" id="navlinks">
                <Link className="nav-link" to="/">首页</Link>
                <Link className="nav-link" to="/categories">分类</Link>
                <Link className="nav-link" to="/subscription">订阅</Link>
                <Link className="nav-link" to="/about">关于</Link>
            </nav>

            {/* 搜索框，占 4 列 */}
            <div className="search d-flex col-4">
                <input
                    className="form-control me-2"
                    onChange={handleInputChange}
                    type="text"
                    value={inputValue}
                    placeholder="Search..."
                />
                <button className="btn btn-outline-success" onClick={handleButtonClick}>Search</button>
            </div>

            {/* 用户信息，占 2 列 */}
            <div className="user navbar-nav col-2 d-flex justify-content-start">
                {authStore.isLoggedIn ? (
                    <Link className="nav-link" to='/profile'>{authStore.username}</Link>
                ) : (
                    <Link className="nav-link" to="/auth">登录/注册</Link>
                )}
            </div>
        </div>
    </div>
</header>
    );
};

export default Header;