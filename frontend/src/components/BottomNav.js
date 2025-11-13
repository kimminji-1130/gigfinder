import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBriefcase, FaPlusSquare, FaComments, FaUser } from 'react-icons/fa';
import './BottomNav.css';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        <FaHome />
        <span>홈</span>
      </NavLink>
      
      <NavLink 
        to="/gigs" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        <FaBriefcase />
        <span>공고</span>
      </NavLink>

      <NavLink 
        to="/create" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        <FaPlusSquare />
        <span>글쓰기</span>
      </NavLink>

      <NavLink 
        to="/chat" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        <FaComments />
        <span>채팅</span>
      </NavLink>

      <NavLink 
        to="/mypage" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        <FaUser />
        <span>마이페이지</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;