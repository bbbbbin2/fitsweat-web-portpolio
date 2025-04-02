// PasswordResetStep2.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordResetStep2.css';

function PasswordResetStep2() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/password-reset-confirmation'); // Confirmation 페이지로 이동
  };

  return (
    <div className="password-reset-step2 password-reset-container">
      <div className="password-reset-box">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="logo" />
        <form className="password-reset-form" onSubmit={handleSubmit}>
          <label htmlFor="new-password">새 비밀번호</label>
          <input type="password" id="new-password" placeholder="새 비밀번호를 입력하세요" />
          <button type="submit" className="reset-button">비밀번호 변경</button>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetStep2;
