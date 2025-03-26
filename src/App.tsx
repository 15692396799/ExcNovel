import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import StoryDetailPage from './pages/StoryDetailPage.tsx';
import SubscriptionPage from './pages/SubscriptionPage.tsx';
import UserAuthPage from './pages/UserAuthPage.tsx';
import UserProfilePage from './pages/UserProfilePage.tsx';
import RedirectPage from './pages/RedirectPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

import { authStore } from './stores/auth.ts';
import { useEffect } from 'react';
import axios from 'axios';


import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Categories from './components/Categories.tsx';

import Header from './components/Header.tsx';

import './styles/App.css';

function Layout() {
  return (
    <>
      <Header />
      <div className="content-container">
        <Outlet />
      </div>
    </>
  );
}

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/categories" element={<Categories />}></Route>
            <Route path="/story/:id" element={<StoryDetailPage />}></Route>
            <Route path="/subscription" element={<SubscriptionPage />}></Route>
            {/* 受保护的路由 */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/auth" element={<UserAuthPage />}></Route>
            <Route path="/redirect" element={<RedirectPage />}></Route>
            <Route path="*" element={<h1>Not Found</h1>}></Route>
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
