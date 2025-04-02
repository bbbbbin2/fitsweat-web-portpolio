// PasswordResetConfirmation.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordResetConfirmation.css';

function PasswordResetConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="password-reset-confirmation confirmation-container">
      <div className="confirmation-box">
        {/* 로고 이미지 - public 폴더의 logo.png 사용 */}
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="logo" />
        
        {/* 비밀번호 변경 확인 메시지 */}
        <p className="confirmation-message">사용자의 비밀번호가 변경되었습니다.</p>
        
        {/* 로그인 페이지로 이동 버튼 */}
        <button className="login-button" onClick={() => navigate('/')}>로그인 페이지로 이동</button>
      </div>
    </div>
  );
}

export default PasswordResetConfirmation;
