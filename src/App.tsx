import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import StoryDetailPage from './pages/StoryDetailPage.tsx';
import SubscriptionPage from './pages/SubscriptionPage.tsx';
import UserProfilePage from './pages/UserProfilePage.tsx';


import './styles/App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element = {<HomePage/>}></Route>
          <Route path="/story/:id" element={<StoryDetailPage/>}></Route>
          <Route path="/subscription" element={<SubscriptionPage/>}></Route>
          <Route path="/profile" element={<UserProfilePage/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
