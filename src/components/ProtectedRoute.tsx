import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authStore } from './stores/auth';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    // 如果用户未登录，重定向到登录页面，并保存当前路径以便登录后跳转
    if (!authStore.isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 如果用户已登录，渲染子组件
    return children;
};

export default ProtectedRoute;