import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

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
        <header className="header">
            <div className="logo">
                <Link to="/">EXVNOC</Link> {/* 可替换为 <img src="logo.png" alt="Logo" /> */}
            </div>

            <nav className="nav">
                <Link to="/">首页</Link>
                <Link to="/categories" >分类</Link>
                <Link to="/subscription">订阅</Link>
                <Link to="/about">关于</Link>
            </nav>

            <div className="search">
                <input
                    onChange={handleInputChange}
                    type="text"
                    value={inputValue}
                    placeholder="Search..."
                />
                <button onClick={handleButtonClick}>Search</button>
            </div>

            <div className="user">
                <Link to="/profile">登录/注册</Link>
            </div>
        </header>
    );
};

export default Header;
