import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../stores/auth';

const RedirectPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      // 模拟异步检查登录状态
      const checkAuth = async () => {
          await new Promise((resolve) => setTimeout(resolve, 500)); // 模拟延迟
          setIsLoading(false);
      };

      checkAuth();
  }, []);

  useEffect(() => {
      if (!isLoading) {
          const timer = setInterval(() => {
              setCountdown((prevCountdown) => prevCountdown - 1);
          }, 1000);

          const redirectTimer = setTimeout(() => {
              navigate('/');
          }, 3000);

          return () => {
              clearInterval(timer);
              clearTimeout(redirectTimer);
          };
      }
  }, [isLoading, navigate]);

  const handleClick = () => {
      navigate('/');
  };

  if (isLoading) {
      return <p>加载中...</p>;
  }

  return (
      <div>
          <p>正在跳转至首页，还剩 {countdown} 秒...</p>
          <p>
              如果不想等待，可以
              <a href="/" onClick={handleClick}>
                  点击这里
              </a>
              立即跳转。
          </p>
          {authStore.isLoggedIn ? (
              <p>欢迎回来，{authStore.user?.username}！</p>
          ) : (
              <p>请先登录或注册。</p>
          )}
      </div>
  );
};

export default RedirectPage;