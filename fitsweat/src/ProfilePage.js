// ProfilePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();

  // 로그아웃 함수
  const handleLogout = () => {
    navigate('/main'); // 로그아웃 후 메인 페이지로 이동
  };

  // 편집 버튼 클릭 시 프로필 수정 페이지로 이동
  const handleEdit = () => {
    navigate('/profile/edit'); // ProfileEditPage로 이동
  };

  return (
    <div className="profile-page profile-page-container">
      <header className="profile-header">
        {/* 로고 이미지 클릭 시 메인 페이지로 이동 */}
        <img src={`${process.env.PUBLIC_URL}/logo.png`} onClick={() => navigate('/main-logged')} alt="Fitsweat Logo" className="logo" />
        {/* 로그아웃 버튼 */}
        <span className="logout" onClick={handleLogout}>로그아웃</span>
      </header>

      <div className="profile-main-content">
        <div className="profile-card">
          {/* 프로필 사진 */}
          <div className="profile-picture">
            <div className="picture-placeholder">
              <span className="picture-text">사진 없음</span>
            </div>
          </div>
          {/* 프로필 세부 정보 */}
          <div className="profile-details">
            <div className="profile-name">문사모</div>
            <div className="profile-username">@munsamo</div>
            <button className="edit-button" onClick={handleEdit}>프로필 편집</button>
          </div>
        </div>

        {/* 추가 정보 섹션 */}
        <div className="profile-info-section">
          <div className="fitness-info card">
            <h3 className="section-title">Fitness Preferences</h3>
            <div className="info-row">
              <span className="info-label">선호운동</span>
              <span className="info-value">조깅</span>
            </div>
            <div className="info-row">
              <span className="info-label">목표</span>
              <span className="info-value">10km 달리기</span>
            </div>
          </div>

          <div className="physical-info card">
            <h3 className="section-title">Physical Information</h3>
            <div className="info-item">
              <span className="info-title">키</span>
              <span className="info-value">170cm</span>
            </div>
            <div className="info-item">
              <span className="info-title">몸무게</span>
              <span className="info-value">70kg</span>
            </div>
            <div className="info-item">
              <span className="info-title">BMI</span>
              <span className="info-value">24.22</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
