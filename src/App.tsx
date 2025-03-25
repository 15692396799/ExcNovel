import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import StoryDetailPage from './pages/StoryDetailPage.tsx';
import SubscriptionPage from './pages/SubscriptionPage.tsx';
import UserAuthPage from './pages/UserAuthPage.tsx';
import UserProfilePage from './pages/UserProfilePage.tsx';
import RedirectPage from './pages/RedirectPage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

import { authStore } from './components/stores/auth';
import { useEffect } from 'react';
import axios from 'axios';


import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Categories from './components/Categories.tsx';

function App() {

  // useEffect(() => {
  //   const savedUser = localStorage.getItem('user');
  //   if (savedUser) {
  //     authStore.setAuthState(JSON.parse(savedUser));
  //   }
  // }, []);

  return (
    <>
      <Router>
        <Routes>
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
        </Routes>
      </Router>
    </>
  )
}

export default App
