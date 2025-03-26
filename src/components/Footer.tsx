import React from 'react';
import { 
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  ListGroup
} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { themeStore } from '../stores/theme';
import '../styles/Footer.css';

const Footer = observer(() => {
  // 根据主题选择文字类名
  const textClass = themeStore.isDarkMode ? 'text-light' : 'text-dark';
  const mutedTextClass = themeStore.isDarkMode ? 'text-light opacity-75' : 'text-muted';
  
  return (
    <footer className={`mt-5 ${themeStore.isDarkMode ? 'bg-dark' : 'bg-light'}`}>
      <Container className="py-5">
        <Row>
          {/* 网站简介 */}
          <Col md={4} className="mb-4">
            <h5 className={textClass}>关于我们</h5>
            <p className={mutedTextClass}>
              我们是一个专注于提供优质小说内容的平台，致力于为读者带来丰富的阅读体验。
              无论你是喜欢言情、科幻还是悬疑，这里总有一本书适合你。
            </p>
          </Col>

          {/* 社交媒体链接 */}
          <Col md={4} className="mb-4">
            <h5 className={textClass}>关注我们</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className={`bg-transparent border-0 ps-0 ${mutedTextClass}`}>
                <a href="https://facebook.com" className={`text-decoration-none ${mutedTextClass}`}>
                  <i className="bi bi-facebook me-2"></i>Facebook
                </a>
              </ListGroup.Item>
              <ListGroup.Item className={`bg-transparent border-0 ps-0 ${mutedTextClass}`}>
                <a href="https://twitter.com" className={`text-decoration-none ${mutedTextClass}`}>
                  <i className="bi bi-twitter me-2"></i>Twitter
                </a>
              </ListGroup.Item>
              <ListGroup.Item className={`bg-transparent border-0 ps-0 ${mutedTextClass}`}>
                <a href="https://instagram.com" className={`text-decoration-none ${mutedTextClass}`}>
                  <i className="bi bi-instagram me-2"></i>Instagram
                </a>
              </ListGroup.Item>
              <ListGroup.Item className={`bg-transparent border-0 ps-0 ${mutedTextClass}`}>
                <a href="https://weibo.com" className={`text-decoration-none ${mutedTextClass}`}>
                  <i className="bi bi-weibo me-2"></i>微博
                </a>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* 联系方式和隐私政策 */}
          <Col md={4} className="mb-4">
            <h5 className={textClass}>联系我们</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className={`bg-transparent border-0 ps-0 ${mutedTextClass}`}>
                <a href="mailto:support@novelwebsite.com" className={`text-decoration-none ${mutedTextClass}`}>
                  <i className="bi bi-envelope me-2"></i>support@novelwebsite.com
                </a>
              </ListGroup.Item>
              <ListGroup.Item className={`bg-transparent border-0 ps-0 ${mutedTextClass}`}>
                <a href="tel:+1234567890" className={`text-decoration-none ${mutedTextClass}`}>
                  <i className="bi bi-telephone me-2"></i>+1 234 567 890
                </a>
              </ListGroup.Item>
            </ListGroup>
            
            <h5 className={`mt-4 ${textClass}`}>隐私政策</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className={`bg-transparent border-0 ps-0 ${mutedTextClass}`}>
                <a href="/privacy-policy" className={`text-decoration-none ${mutedTextClass}`}>
                  隐私政策
                </a>
              </ListGroup.Item>
              <ListGroup.Item className={`bg-transparent border-0 ps-0 ${mutedTextClass}`}>
                <a href="/terms-of-service" className={`text-decoration-none ${mutedTextClass}`}>
                  服务条款
                </a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        {/* 版权信息 */}
        <div className={`text-center py-3 border-top ${themeStore.isDarkMode ? 'border-secondary' : ''}`}>
          <p className={`mb-0 ${mutedTextClass}`}>
            &copy; {new Date().getFullYear()} 小说网站. 保留所有权利.
          </p>
        </div>
      </Container>
    </footer>
  );
});

export default Footer;