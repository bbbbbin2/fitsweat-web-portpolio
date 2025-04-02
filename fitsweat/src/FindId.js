// FindId.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindId.css';

function FindId() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState(''); // 전화번호 입력 상태 관리
  const [email, setEmail] = useState(''); // 이메일 입력 상태 관리

  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    // 아이디 찾기 로직 (예: 서버에 요청)
    // 찾은 아이디를 기반으로 결과 페이지로 이동합니다.
    navigate('/find-id/result', { state: { userId: 'munsamo' } });
  };

  return (
    <div className="find-id-page find-id-container">
      <form className="find-id-form" onSubmit={handleSubmit}>
        {/* 로고 이미지 - public 폴더의 logo.png 사용 */}
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="logo" />
        
        {/* 전화번호 입력 필드 */}
        <label htmlFor="phone">전화번호</label>
        <input 
          type="tel" 
          id="phone" 
          placeholder="전화번호를 입력하세요" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)} // 전화번호 입력 값 업데이트
        />
        
        {/* 이메일 입력 필드 */}
        <label htmlFor="email">이메일</label>
        <input 
          type="email" 
          id="email" 
          placeholder="이메일을 입력하세요" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} // 이메일 입력 값 업데이트
        />
        
        {/* 아이디 찾기 버튼 */}
        <button type="submit" className="find-id-button">아이디 찾기</button>
      </form>
    </div>
  );
}

export default FindId;
