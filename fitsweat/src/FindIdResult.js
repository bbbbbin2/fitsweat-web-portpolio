// FindIdResult.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FindIdResult.css';

function FindIdResult() {
  const location = useLocation(); // 이전 페이지에서 전달된 상태 정보 수신
  const navigate = useNavigate(); // 페이지 이동을 위해 네비게이션 훅 사용
  const { userId } = location.state || { userId: '' }; // userId를 location에서 가져옴

  return (
    <div className="find-id-result-page find-id-result-container">
      <div className="find-id-result-box">
        {/* 로고 이미지 - public 폴더의 logo.png 사용 */}
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="logo" />
        
        {/* 아이디 결과 메시지 */}
        <p className="result-message">
          사용자의 아이디는 <span className="user-id">{userId}</span> 입니다.
        </p>
        
        {/* 로그인 페이지로 돌아가기 버튼 */}
        <button 
          className="back-button" 
          onClick={() => navigate('/')}
        >
          로그인 페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default FindIdResult;
