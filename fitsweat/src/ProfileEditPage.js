import React, { useState, useEffect } from 'react';
import './ProfileEditPage.css';
import { useNavigate } from 'react-router-dom';

function ProfileEditPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [preferredExercise, setPreferredExercise] = useState("");
  const [goal, setGoal] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [profile_image, setprofile_image] = useState(null);
  const [is_public, setis_public] = useState(true);
  const navigate = useNavigate();

  // 로컬스토리지에서 userId 가져오기
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      console.error('userId가 없습니다. 로그인 상태를 확인하세요.');
      navigate('/login'); // userId가 없으면 로그인 페이지로 리디렉션
      return;
    }

    // 프로필 데이터 로드
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setName(data.name || "");
          setUsername(data.username || "");
          setPreferredExercise(data.preferredExercise || "");
          setGoal(data.goal || "");
          setHeight(data.height || "");
          setWeight(data.weight || "");
          setBmi(data.bmi || "");
          setprofile_image(data.profileImage || null);
          setis_public(data.isPublic !== undefined ? data.isPublic : true);
        } else {
          console.error("프로필 데이터를 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProfileData();
  }, [userId, navigate]);

  // BMI 계산
  useEffect(() => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    if (heightInMeters > 0 && weightInKg > 0) {
      const calculatedBmi = (weightInKg / (heightInMeters ** 2)).toFixed(2);
      setBmi(calculatedBmi);
    }
  }, [height, weight]);

  // 프로필 저장
  const handleSave = async () => {
    if (!userId) {
      console.error('userId가 없습니다. 프로필 저장을 중단합니다.');
      return;
    }

    const profileData = {
      name,
      username,
      preferredExercise,
      goal,
      height: parseFloat(height) || null,
      weight: parseFloat(weight) || null,
      bmi: parseFloat(bmi) || null,
      profileImage: profile_image,
      isPublic: is_public,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        navigate('/personal-profile');
      } else {
        console.error('프로필 정보를 저장하는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 프로필 이미지 변경
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setprofile_image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-edit-page profile-page-container">
      <header className="profile-header">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Fitsweat Logo"
          className="logo"
          onClick={() => navigate('/main')}
        />
        <span className="logout" onClick={() => navigate('/main')}>로그아웃</span>
      </header>

      <div className="profile-main-content">
        <div className="profile-card">
          <div className="profile-picture">
            <div className="picture-placeholder">
              {profile_image ? (
                <img src={profile_image} alt="Profile" className="profile-image" />
              ) : (
                <span className="picture-text">사진 없음</span>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleImageChange} className="upload-input" />
          </div>
          <div className="profile-details">
            <label className="profile-label">이름</label>
            <input
              type="text"
              className="profile-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="profile-label">사용자 이름</label>
            <input
              type="text"
              className="profile-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="profile-visibility">
              <label className="profile-label">프로필 공개 설정</label>
              <div className="visibility-options">
                <label>
                  <input
                    type="radio"
                    value="public"
                    checked={is_public}
                    onChange={() => setis_public(true)}
                  />
                  공개
                </label>
                <label>
                  <input
                    type="radio"
                    value="private"
                    checked={!is_public}
                    onChange={() => setis_public(false)}
                  />
                  비공개
                </label>
              </div>
            </div>
            <button className="save-button" onClick={handleSave}>저장</button>
          </div>
        </div>

        <div className="profile-info-section">
          <div className="fitness-info card">
            <h3 className="section-title">Fitness Preferences</h3>
            <label className="profile-label">선호운동</label>
            <input
              type="text"
              className="profile-input"
              value={preferredExercise}
              onChange={(e) => setPreferredExercise(e.target.value)}
            />
            <label className="profile-label">목표</label>
            <input
              type="text"
              className="profile-input"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <div className="physical-info card">
            <h3 className="section-title">Physical Information</h3>
            <label className="profile-label">키 (cm)</label>
            <input
              type="text"
              className="profile-input"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <label className="profile-label">몸무게 (kg)</label>
            <input
              type="text"
              className="profile-input"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <label className="profile-label">BMI</label>
            <input
              type="text"
              className="profile-input"
              value={bmi}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditPage;
