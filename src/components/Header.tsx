import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
    Navbar,
    Container,
    Nav,
    Form,
    Button,
    NavDropdown,
    Offcanvas,
    Row,
    Col
} from 'react-bootstrap';
import { authStore } from '../stores/auth';
import { themeStore } from '../stores/theme';
import '../styles/Header.css';
import { observer } from 'mobx-react-lite';

const Header: React.FC = observer(() => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const navigate = useNavigate();

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    const handleLogout = () => {
        authStore.logout();
        navigate('/');
        setShowOffcanvas(false);
    };

    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);

    return (
        <Navbar
            bg={themeStore.isDarkMode ? 'dark' : 'light'}
            variant={themeStore.isDarkMode ? 'dark' : 'light'}
            data-bs-theme={themeStore.isDarkMode ? 'dark' : 'light'}
            expand="lg"
            sticky="top"
            className="shadow-sm"
        >
            <Container fluid>
                {/* 品牌 Logo */}
                <Navbar.Brand as={Link} to="/" className="fw-bold me-4 col-1">
                    EXVNOC
                </Navbar.Brand>

                {/* 移动端菜单按钮 */}
                <Navbar.Toggle
                    aria-controls="offcanvasNavbar"
                    onClick={handleShowOffcanvas}
                    className="d-lg-none"
                />

                {/* 桌面端导航内容 - 使用 Row 和 Col 控制比例 */}
                <Navbar.Collapse id="navbar-nav" className="flex-grow-1">
                    <Row className="w-100 align-items-center">
                        {/* 导航链接 - 占4份 */}
                        <Col lg={4} className="pe-0">
                            <Nav className="w-100 justify-content-between">
                                <Nav.Link
                                    as={NavLink}
                                    to="/"
                                    className="position-relative px-2 text-center"
                                    onClick={() => setShowOffcanvas(false)}
                                >
                                    首页
                                    <span className="nav-indicator" />
                                </Nav.Link>
                                <Nav.Link
                                    as={NavLink}
                                    to="/categories"
                                    className="position-relative px-2 text-center"
                                    onClick={() => setShowOffcanvas(false)}
                                >
                                    分类
                                    <span className="nav-indicator" />
                                </Nav.Link>
                                <Nav.Link
                                    as={NavLink}
                                    to="/subscription"
                                    className="position-relative px-2 text-center"
                                    onClick={() => setShowOffcanvas(false)}
                                >
                                    订阅
                                    <span className="nav-indicator" />
                                </Nav.Link>
                                <Nav.Link
                                    as={NavLink}
                                    to="/about"
                                    className="position-relative px-2 text-center"
                                    onClick={() => setShowOffcanvas(false)}
                                >
                                    关于
                                    <span className="nav-indicator" />
                                </Nav.Link>
                            </Nav>
                        </Col>

                        {/* 搜索框 - 占3份 */}
                        <Col lg={4} className="px-2">
                            <Form
                                className="d-flex"
                                onSubmit={handleSearchSubmit}
                            >
                                <Form.Control
                                    type="search"
                                    placeholder="搜索..."
                                    className="me-2"
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button variant="outline-success" type="submit">
                                    搜索
                                </Button>
                            </Form>
                        </Col>

                        {/* 主题切换 - 占1份 */}
                        <Col lg={1} className="text-center px-0">
                            <Button
                                variant={themeStore.isDarkMode ? 'outline-light' : 'outline-dark'}
                                onClick={() => themeStore.toggleTheme()}
                                size="sm"
                                className="mx-1"
                            >
                                {themeStore.isDarkMode ? '🌙' : '☀️'}
                            </Button>
                        </Col>

                        {/* 用户信息 - 占2份 */}
                        <Col lg={2} className="ps-2">
                            <div className="d-flex justify-content-end">
                                {authStore.isLoggedIn ? (
                                    <NavDropdown
                                        title={authStore.user?.username || '用户'}
                                        align="end"
                                        id="user-dropdown"
                                        menuVariant={themeStore.isDarkMode ? 'dark' : 'light'}
                                    >
                                        <NavDropdown.Item
                                            as={NavLink}
                                            to="/profile"
                                            onClick={() => setShowOffcanvas(false)}
                                        >
                                            个人资料
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}>
                                            退出登录
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <Button
                                        as={NavLink}
                                        to="/auth"
                                        variant="outline-primary"
                                        onClick={() => setShowOffcanvas(false)}
                                        className="ms-2"
                                    >
                                        登录/注册
                                    </Button>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Navbar.Collapse>

                {/* 移动端 Offcanvas 菜单 */}
                <Offcanvas
                    show={showOffcanvas}
                    onHide={handleCloseOffcanvas}
                    placement="end"
                    bg={themeStore.isDarkMode ? 'dark' : 'light'}
                    variant={themeStore.isDarkMode ? 'dark' : 'light'}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>菜单</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column">
                            <Nav.Link
                                as={NavLink}
                                to="/"
                                onClick={handleCloseOffcanvas}
                                className="mb-2"
                            >
                                首页
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/categories"
                                onClick={handleCloseOffcanvas}
                                className="mb-2"
                            >
                                分类
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/subscription"
                                onClick={handleCloseOffcanvas}
                                className="mb-2"
                            >
                                订阅
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/about"
                                onClick={handleCloseOffcanvas}
                                className="mb-2"
                            >
                                关于
                            </Nav.Link>

                            <hr />

                            <Form
                                className="d-flex mb-3"
                                onSubmit={handleSearchSubmit}
                            >
                                <Form.Control
                                    type="search"
                                    placeholder="搜索..."
                                    className="me-2"
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button variant="outline-success" type="submit">
                                    搜索
                                </Button>
                            </Form>

                            {authStore.isLoggedIn ? (
                                <>
                                    <Nav.Link
                                        as={NavLink}
                                        to="/profile"
                                        onClick={handleCloseOffcanvas}
                                        className="mb-2"
                                    >
                                        个人资料
                                    </Nav.Link>
                                    <Button
                                        variant="danger"
                                        onClick={handleLogout}
                                        className="w-100 mb-3"
                                    >
                                        退出登录
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    as={NavLink}
                                    to="/auth"
                                    variant="primary"
                                    onClick={handleCloseOffcanvas}
                                    className="w-100 mb-3"
                                >
                                    登录/注册
                                </Button>
                            )}

                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <span>主题切换:</span>
                                <Button
                                    variant={themeStore.isDarkMode ? 'outline-light' : 'outline-dark'}
                                    onClick={() => themeStore.toggleTheme()}
                                    size="sm"
                                >
                                    {themeStore.isDarkMode ? '🌙' : '☀️'}
                                </Button>
                            </div>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            </Container>
        </Navbar>
    );
});

export default Header;