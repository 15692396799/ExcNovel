import React from 'react';

import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="bg-beige mt-5">
      <div className="container py-5">
        <div className="row">
          {/* 网站简介 */}
          <div className="col-md-4 mb-4">
            <h5>关于我们</h5>
            <p className="text-muted">
              我们是一个专注于提供优质小说内容的平台，致力于为读者带来丰富的阅读体验。无论你是喜欢言情、科幻还是悬疑，这里总有一本书适合你。
            </p>
          </div>

          {/* 社交媒体链接 */}
          <div className="col-md-4 mb-4">
            <h5>关注我们</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://facebook.com" className="text-muted text-decoration-none">
                  <i className="bi bi-facebook me-2"></i>Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-muted text-decoration-none">
                  <i className="bi bi-twitter me-2"></i>Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-muted text-decoration-none">
                  <i className="bi bi-instagram me-2"></i>Instagram
                </a>
              </li>
              <li>
                <a href="https://weibo.com" className="text-muted text-decoration-none">
                  <i className="bi bi-weibo me-2"></i>微博
                </a>
              </li>
            </ul>
          </div>

          {/* 联系方式和隐私政策 */}
          <div className="col-md-4 mb-4">
            <h5>联系我们</h5>
            <ul className="list-unstyled">
              <li>
                <a href="mailto:support@novelwebsite.com" className="text-muted text-decoration-none">
                  <i className="bi bi-envelope me-2"></i>support@novelwebsite.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-muted text-decoration-none">
                  <i className="bi bi-telephone me-2"></i>+1 234 567 890
                </a>
              </li>
            </ul>
            <h5 className="mt-4">隐私政策</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/privacy-policy" className="text-muted text-decoration-none">
                  隐私政策
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-muted text-decoration-none">
                  服务条款
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="text-center py-3 border-top">
          <p className="mb-0 text-muted">
            &copy; {new Date().getFullYear()} 小说网站. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;