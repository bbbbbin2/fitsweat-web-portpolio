// LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션 훅 사용

  // 로그인 버튼 클릭 시 호출되는 함수
  const handleLogin = (event) => {
    event.preventDefault();
    // 로그인 로직을 여기에 추가
    navigate('/main-logged'); // 로그인 성공 시 메인 페이지로 이동
  };

  return (
    <div className="login-page login-container">
      <div className="login-box">
        {/* 로고 이미지 - public 폴더의 logo.png 사용 */}
        <img src={`a/logo.png`} alt="Fitsweat Logo" className="logo" />

        {/* 로그인 폼 */}
        <form className="login-form" onSubmit={handleLogin}>
          {/* 아이디 입력 필드 */}
          <label htmlFor="username">아이디</label>
          <input type="text" id="username" placeholder="아이디를 입력하세요" className="input-field" />

          {/* 비밀번호 입력 필드 */}
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호를 입력하세요" className="input-field" />
          
          {/* 로그인 버튼 */}
          <button type="submit" className="login-button">로그인</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
