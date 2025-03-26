import { makeAutoObservable } from 'mobx';
import axios, { AxiosError } from 'axios';
// import api from '../../utils/api';

interface UserData {
  username: string;
  email: string;
  avatar?: string;
}

const AUTH_STORAGE_KEY = 'auth';


class AuthStore {
  isLoggedIn: boolean = false;
  user: UserData | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.initializeAuth();
  }

  // 初始化：从本地存储恢复非敏感数据
  private initializeAuth() {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!savedAuth) return;

    try {
      const { user, isLoggedIn } = JSON.parse(savedAuth);
      
      // 只恢复有效数据
      if (user && typeof isLoggedIn === 'boolean') {
        this.user = user;
        this.isLoggedIn = isLoggedIn;
        
        // 如果已登录，验证会话有效性
        if (isLoggedIn) {
          this.validateSession();
        }
      }
    } catch (error) {
      console.error('Failed to parse auth data:', error);
      this.clearAuthState();
    }
  }

  // 验证服务端会话（通过 HTTP-only Cookie）
  private async validateSession() {
    this.isLoading = true;
    try {
      const response = await axios.get<{ user: UserData }>(
        '/api/auth/me',
        { withCredentials: true } // 自动发送 Cookie
      );
      this.setAuthState(response.data.user);
    } catch (error) {
      this.handleAuthError(error as AxiosError);
      this.clearAuthState();
    } finally {
      this.isLoading = false;
    }
  }

  private persistAuthState() {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
      user: this.user,
      isLoggedIn: this.isLoggedIn,
    }));
  }

  // 设置认证状态
  public setAuthState(user: UserData) {
    this.isLoggedIn = true;
    this.user = user;
    this.error = null;
    this.persistAuthState();
  }

  // 清除认证状态
  private clearAuthState() {
    this.isLoggedIn = false;
    this.user = null;
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  // 统一错误处理
  private handleAuthError(error: AxiosError) {
    const errorMessage = (error.response?.data as { message?: string })?.message;
    this.error = errorMessage || 'Authentication failed';
  }

  // 登录（使用 Cookie 存储凭证）
  async login(username: string, password: string) {
    this.isLoading = true;
    try {
      const response = await axios.post<{ user: UserData }>(
        '/api/auth/login',
        { username, password },
        { withCredentials: true } // 确保接收 Set-Cookie
      );
      this.setAuthState(response.data.user);
    } catch (error) {
      this.handleAuthError(error as AxiosError);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async register(username: string, email: string, password: string) {
    this.isLoading = true;
    try {
      const response = await axios.post<{ user: UserData }>(
        '/api/auth/register',
        { username, email, password },
        { withCredentials: true }
      );
      this.setAuthState(response.data.user);
    } catch (error) {
      this.handleAuthError(error as AxiosError);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  // 登出（清除服务端会话和本地数据）
  async logout() {
    try {
      await axios.post(
        '/api/auth/logout',
        {},
        { withCredentials: true }
      );
    } finally {
      this.clearAuthState(); // 无论 API 是否成功都清除本地状态
    }
  }
}

export const authStore = new AuthStore();