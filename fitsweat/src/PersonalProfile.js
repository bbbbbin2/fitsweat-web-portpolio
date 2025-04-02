import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalProfile.css';

function PersonalProfile() {
  const navigate = useNavigate();

  // 상태 관리
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    preferredExercise: '',
    goal: '',
    height: '',
    weight: '',
    bmi: '',
    profileImage: null,
  });

  // 로그인 시 로컬스토리지에 저장된 사용자 ID를 가져옵니다.
  const userId = localStorage.getItem('userId'); 

  // 프로필 데이터 로드
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("프로필 데이터:", data); // 데이터 확인
          setProfile({
            name: data.name || '',
            username: data.username || '',
            preferredExercise: data.preferredExercise || '',
            goal: data.goal || '',
            height: data.height || '',
            weight: data.weight || '',
            bmi: data.bmi || '',
            profileImage: data.profileImage || null,
          });
        } else {
          console.error('프로필 데이터를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchProfile();
  }, [userId]);
  

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('userId'); // 로그아웃 시 userId 삭제
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
        <div
          className="logo-container"
          onClick={() => navigate('/main')} // 로고 클릭 시 메인 페이지로 이동
          style={{ cursor: 'pointer' }} // 클릭 가능한 스타일 추가
        >
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="logo" />
        </div>
      
      </header>

      <div className="profile-main-content">
        <div className="profile-card">
          {/* 프로필 사진 */}
          <div className="profile-picture">
            <div className="picture-placeholder">
              {profile.profileImage ? (
                <img src={profile.profileImage} alt="Profile" className="profile-image" />
              ) : (
                <span className="picture-text">사진 없음</span>
              )}
            </div>
          </div>
          {/* 프로필 세부 정보 */}
          <div className="profile-details">
            <div className="profile-name">{profile.name || '이름 없음'}</div>
            <div className="profile-username">@{profile.username || '사용자 이름 없음'}</div>
            <button className="edit-button" onClick={handleEdit}>프로필 편집</button>
          </div>
        </div>

        {/* 추가 정보 섹션 */}
        <div className="profile-info-section">
          <div className="fitness-info card">
            <h3 className="section-title">Fitness Preferences</h3>
            <div className="info-row">
              <span className="info-label">선호운동</span>
              <span className="info-value">{profile.preferredExercise || '정보 없음'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">목표</span>
              <span className="info-value">{profile.goal || '정보 없음'}</span>
            </div>
          </div>

          <div className="physical-info card">
            <h3 className="section-title">Physical Information</h3>
            <div className="info-item">
              <span className="info-title">키</span>
              <span className="info-value">{profile.height ? `${profile.height}cm` : '정보 없음'}</span>
            </div>
            <div className="info-item">
              <span className="info-title">몸무게</span>
              <span className="info-value">{profile.weight ? `${profile.weight}kg` : '정보 없음'}</span>
            </div>
            <div className="info-item">
              <span className="info-title">BMI</span>
              <span className="info-value">{profile.bmi || '정보 없음'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalProfile;
