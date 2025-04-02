// PasswordResetStep1.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordResetStep1.css';

function PasswordResetStep1() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/password-reset-step2'); // Step2로 이동
  };

  return (
    <div className="password-reset-step1 password-reset-container">
      <div className="password-reset-box">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="logo" />
        <form className="password-reset-form" onSubmit={handleSubmit}>
          <label htmlFor="phone">전화번호</label>
          <input type="text" id="phone" placeholder="전화번호를 입력하세요" />
          <label htmlFor="id">아이디</label>
          <input type="text" id="id" placeholder="아이디를 입력하세요" />
          <button type="submit" className="reset-button">비밀번호 변경</button>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetStep1;
