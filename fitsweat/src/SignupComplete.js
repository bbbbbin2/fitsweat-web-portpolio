// SignupComplete.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupComplete.css';

function SignupComplete() {
  const navigate = useNavigate();

  return (
    <div className="signup-complete-page complete-container">
      <div className="complete-box">
        {/* 로고 이미지 */}
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="complete-logo" />
        
        {/* 회원가입 완료 메시지 */}
        <p className="complete-message">회원가입이 완료되었습니다.</p>
        <p className="complete-submessage">로그인 후 서비스를 이용하세요!</p>
        
        {/* 로그인 페이지로 이동 버튼 */}
        <button className="login-button" onClick={() => navigate('/')}>로그인 페이지로 이동</button>
      </div>
    </div>
  );
}

export default SignupComplete;
