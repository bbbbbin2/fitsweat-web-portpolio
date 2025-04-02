// MainPageLogged.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPageLogged.css';

function MainPageLogged() {
  const [showSubMenu, setShowSubMenu] = useState({ Fitness: false, Community: false, MyProfile: false });
  const navigate = useNavigate();

  // 서브 메뉴를 표시하는 함수
  const handleMouseEnter = (menu) => {
    setShowSubMenu((prev) => ({ ...prev, [menu]: true }));
  };

  // 서브 메뉴를 숨기는 함수
  const handleMouseLeave = (menu) => {
    setShowSubMenu((prev) => ({ ...prev, [menu]: false }));
  };

  return (
    <div className="main-logged-page main-container">
      <header className="main-header">
        {/* 로고 이미지 */}
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="logo" />
        </div>

        {/* 사용자 옵션 (로그아웃) */}
        <div className="user-options" onClick={() => navigate('/main')}>
          로그아웃
        </div>
      </header>

      {/* 내비게이션 바 */}
      <nav className="nav-bar">
        <div 
          className="nav-item" 
          onMouseEnter={() => handleMouseEnter('Fitness')} 
          onMouseLeave={() => handleMouseLeave('Fitness')}
        >
          Fitness
          {showSubMenu.Fitness && (
            <div className="sub-menu">
              <div className="sub-menu-item" onClick={() => navigate('/Stretching')} >Stretching</div>
              <div className="sub-menu-item" onClick={() => navigate('/Bodyweight')} >Bodyweight</div>
              <div className="sub-menu-item" onClick={() => navigate('/Weight')} >Weight</div>
            </div>
          )}
        </div>
        
        <div 
          className="nav-item" 
          onMouseEnter={() => handleMouseEnter('Community')} 
          onMouseLeave={() => handleMouseLeave('Community')}
        >
          Community
          {showSubMenu.Community && (
            <div className="sub-menu">
              <div className="sub-menu-item" onClick={() => navigate('/CommunityBoard')}>Board</div>
              <div className="sub-menu-item" onClick={() => navigate('/my-post')}>My Post</div>
            </div>
          )}
        </div>

        <div 
          className="nav-item" 
          onMouseEnter={() => handleMouseEnter('MyProfile')} 
          onMouseLeave={() => handleMouseLeave('MyProfile')}
        >
          My Profile
          {showSubMenu.MyProfile && (
            <div className="sub-menu">
              <div className="sub-menu-item" onClick={() => navigate('/profile')}>My Profile</div>
              <div className="sub-menu-item" onClick={() => navigate('/FitnessRecord')}>My Fitness</div>
            </div>
          )}
        </div>
      </nav>

      {/* 광고 슬라이더 */}
      <div className="slider-container">
        <button className="slider-button left">{'<'}</button>
        <div className="ad-image">광고</div>
        <button className="slider-button right">{'>'}</button>
      </div>

      {/* 통합 게시글 섹션 */}
      <div className="content-section">
        <div className="content-box">
          <div className="content-header">
            <h2>통합 게시판</h2>
            <button className="add-button" onClick={() => navigate('/CommunityBoard')} >+</button>
          </div>
          <div className="content-item">게시글 1</div>
          <div className="content-item">게시글 2</div>
          <div className="content-item">게시글 3</div>
        </div>
      </div>
    </div>
  );
}

export default MainPageLogged;
