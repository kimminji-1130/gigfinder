import React from 'react';
// 1. Routes, Route 외에 useLocation 훅을 import
import { Routes, Route, useLocation } from 'react-router-dom'; 

// 2. CSS 및 로고 import
import './App.css'; 
import GigFinderLogo from './assets/logo.png'; 

// 3. 페이지 컴포넌트들 import
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Gigs from './pages/Gigs';
import CreatePost from './pages/CreatePost';
import Chat from './pages/Chat';
import MyPage from './pages/MyPage';
import MyResume from './pages/MyResume';

// 4. 하단 내비게이션 컴포넌트 import
import BottomNav from './components/BottomNav';

function App() {
  // 5. 현재 경로(URL) 정보를 가져옴
  const location = useLocation();

  // 6. 하단 내비와 헤더를 보여주지 않을 경로들
  const noNavPaths = ['/login', '/register'];

  // 7. 현재 경로가 noNavPaths에 포함되지 *않았을* 때만 true
  const showNav = !noNavPaths.includes(location.pathname);

  return (
    <div className="App">
      
      {/* 8. showNav가 true일 때만 헤더(로고)를 보여줌 */}
      {showNav && (
        <header className="App-header">
          <img src={GigFinderLogo} className="App-logo" alt="GigFinder Logo" /> 
        </header>
      )}

      <main>
        {/* 9. 모든 페이지 라우트 설정 */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/gigs" element={<Gigs />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/my-resume" element={<MyResume />} />
        </Routes>
      </main>

      {/* 10. showNav가 true일 때만 BottomNav를 보여줌 */}
      {showNav && <BottomNav />}
    </div>
  );
}

export default App;