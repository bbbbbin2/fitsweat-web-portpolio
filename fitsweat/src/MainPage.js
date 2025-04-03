import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

function MainPage({ isLoggedIn, onLogout }) {
  const [showSubMenu, setShowSubMenu] = useState({ Fitness: false, Community: false, MyProfile: false });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const images = [`${process.env.PUBLIC_URL}/운동1.webp`, `${process.env.PUBLIC_URL}/운동2.webp`,`${process.env.PUBLIC_URL}/러닝.jpg`];

  const handleMouseEnter = (menu) => {
    setShowSubMenu((prev) => ({ ...prev, [menu]: true }));
  };

  const handleMouseLeave = (menu) => {
    setShowSubMenu((prev) => ({ ...prev, [menu]: false }));
  };

  const handleLogout = () => {
    alert('로그아웃 되셨습니다.');
    onLogout();
    navigate('/');
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // 2초마다 이미지 슬라이드 자동 전환
  useEffect(() => {
    const intervalId = setInterval(handleNextImage, 2000); // 2000ms = 2초

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  // 비로그인 시 화면
  if (!isLoggedIn) {
    return (
      <div className="main-container">
        <header className="main-header">
          <div className="logo-container">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="logo" />
          </div>
          <div className="search-container"></div>
          <div className="user-options">
            <span onClick={() => navigate('/sign-up')}>회원가입</span> / 
            <span onClick={() => navigate('/')}> 로그인</span>
          </div>
        </header>

        <div className="notice">
          회원가입 시 더 많은 서비스를 즐길 수 있습니다.
        </div>

        <nav
          className="community-nav"
          onMouseEnter={() => handleMouseEnter('Community')}
          onMouseLeave={() => handleMouseLeave('Community')}
        >
          Community
          {showSubMenu.Community && (
            <div className="sub-menu">
              <div className="sub-menu-item" onClick={() => navigate('/community-board')}>Board</div>
            </div>
          )}
        </nav>

        <div className="slider-container">
          <button className="slider-button left" onClick={handlePreviousImage}>{'<'}</button>
          <img src={images[currentImageIndex]} alt="광고 이미지" className="ad-image" />
          <button className="slider-button right" onClick={handleNextImage}>{'>'}</button>
        </div>

        {/* Footer 추가 */}
        <footer className="main-footer">
          <p>&copy; 2024 Fitsweat. All rights reserved.</p>
          <p>S/W Project 문사모: 노수진, 강재용, 연정호, 이혜빈, 박규나</p>
        </footer>
      </div>
    );
  }

  // 로그인 시 화면
  return (
    <div className="main-container">
      <header className="main-header">
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="logo" />
        </div>
        <div className="search-container"></div>
        <div className="user-options" onClick={handleLogout}>
          로그아웃
        </div>
      </header>

      <nav className="nav-bar">
        <div 
          className="nav-item" 
          onMouseEnter={() => handleMouseEnter('Fitness')} 
          onMouseLeave={() => handleMouseLeave('Fitness')}
        >
          Fitness
          {showSubMenu.Fitness && (
            <div className="sub-menu">
              <div className="sub-menu-item" onClick={() => navigate('/Stretching')}>Stretching</div>
              <div className="sub-menu-item" onClick={() => navigate('/Bodyweight')}>Bodyweight</div>
              <div className="sub-menu-item" onClick={() => navigate('/Weight')}>Weight</div>
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
              <div className="sub-menu-item" onClick={() => navigate('/community-board')}>Board</div>
              <div className="sub-menu-item" onClick={() => navigate('/my-post')}>My Posts</div>
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
              <div className="sub-menu-item" onClick={() => navigate('/personal-profile')}>My Profile</div>
              <div className="sub-menu-item"onClick={() => navigate('/fitness-record')}>My Fitness</div>
            </div>
          )}
        </div>
      </nav>

      <div className="slider-container">
        <button className="slider-button left" onClick={handlePreviousImage}>{'<'}</button>
        <img src={images[currentImageIndex]} alt="광고 이미지" className="ad-image" />
        <button className="slider-button right" onClick={handleNextImage}>{'>'}</button>
      </div>

      {/* Footer 추가 */}
      <footer className="main-footer">
        <p>&copy; 2024 Fitsweat. All rights reserved.</p>
        <p>S/W Project 문사모: 노수진, 박규나,강재용, 연정호, 이혜빈</p>
       
      </footer>
    </div>
  );
}

export default MainPage;
