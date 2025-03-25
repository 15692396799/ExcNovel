import React from 'react';
import { authStore } from '../components/stores/auth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 清除 localStorage 中的 JWT
        localStorage.removeItem('token');

        //更新mobx状态
        authStore.logout();

        // 重定向
        navigate('/redirect');
    };

    return (
        <div>
            <div>
                <h1>个人信息</h1>
                <p>用户名: {authStore.user?.username}</p>
                <p>邮箱: {authStore.user?.email}</p>
                {/* 其他个人信息 */}
            </div>
            <button className="btn btn-danger" onClick={handleLogout}>
                Logout
            </button>
        </div>

    );
};

export default Profile;