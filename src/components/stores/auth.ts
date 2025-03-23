import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class AuthStore {
    isLoggedIn = false;
    username = '';
    email = '';
    token = '';

    constructor() {
        makeAutoObservable(this);
        this.initialize(); // 初始化时恢复状态
    }

    // 初始化方法：从 localStorage 中恢复状态
    initialize() {
        const token = localStorage.getItem('token');
        if (token) {
            this.validateToken(token); // 验证 Token 的有效性
        }
    }

    // 验证 Token 的有效性
    async validateToken(token: string) {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            this.setUser(response.data.user.username, response.data.user.email, token);
        } catch (error) {
            this.clearUser(); // 如果 Token 无效，清除状态
        }
    }

    // 设置用户信息
    setUser(username: string, email: string, token: string) {
        this.isLoggedIn = true;
        this.username = username;
        this.email = email;
        this.token = token;
        localStorage.setItem('token', token); // 存储 Token
    }

    // 清除用户信息
    clearUser() {
        this.isLoggedIn = false;
        this.username = '';
        this.email = '';
        this.token = '';
        localStorage.removeItem('token'); // 清除 Token
    }

    // 登录方法
    async login(username: string, password: string) {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });
            this.setUser(response.data.user.username, response.data.user.email, response.data.token);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Login failed');
        }
    }

    // 注销方法
    logout() {
        this.clearUser();
    }
}

export const authStore = new AuthStore();
