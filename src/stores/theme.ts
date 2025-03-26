// /store/theme.ts
import { makeAutoObservable } from 'mobx';

class ThemeStore {
    private readonly THEME_KEY = 'app_theme';
    isDarkMode = false;

    constructor() {
        makeAutoObservable(this);
        this.initializeTheme();
    }

    private initializeTheme() {
        // 1. 检查 localStorage
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        
        // 2. 检查系统偏好
        const systemPrefersDark = window.matchMedia 
            && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // 优先级: localStorage > 系统偏好 > 默认light
        this.isDarkMode = savedTheme 
            ? savedTheme === 'dark'
            : systemPrefersDark;
        
        this.applyTheme();
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        this.persistTheme();
    }

    private applyTheme() {
        // 切换 body 类名
        if (this.isDarkMode) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
            document.documentElement.setAttribute('data-bs-theme', 'light');
        }
        
        // 更新 Bootstrap 主题变量
        this.updateBootstrapTheme();
    }

    private persistTheme() {
        localStorage.setItem(this.THEME_KEY, this.isDarkMode ? 'dark' : 'light');
    }

    private updateBootstrapTheme() {
        // 更新 Bootstrap CSS 变量
        const root = document.documentElement;
        
        if (this.isDarkMode) {
            root.style.setProperty('--bs-body-bg', '#212529');
            root.style.setProperty('--bs-body-color', '#f8f9fa');
            root.style.setProperty('--bs-primary', '#6ea8fe');
            root.style.setProperty('--bs-secondary', '#adb5bd');
            // 添加更多需要覆盖的变量...
        } else {
            root.style.removeProperty('--bs-body-bg');
            root.style.removeProperty('--bs-body-color');
            root.style.removeProperty('--bs-primary');
            root.style.removeProperty('--bs-secondary');
            // 移除覆盖的变量，恢复默认值
        }
    }
}

export const themeStore = new ThemeStore();