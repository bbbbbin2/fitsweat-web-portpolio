import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트
import './Bodyweight.css';

function Bodyweight() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 초기화

  const [exerciseData, setExerciseData] = useState([]);  // 운동 목록 상태
  const [selectedExercise, setSelectedExercise] = useState(null);  // 선택된 운동 상태
  const [loading, setLoading] = useState(true);  // 로딩 상태
  const [error, setError] = useState(null);  // 에러 상태

  // 운동 목록 데이터 가져오기
  const fetchExerciseData = async () => {
    try {
      const exercises = [
        { programName: '박스 점프' },
        { programName: '줄넘기' },
        { programName: '팔 벌려뛰기' },
        { programName: '마운틴 클라이머' },
        { programName: '러시안 트위스트' },
        { programName: '시티드 니 업' },
        { programName: '싯 업' },
        { programName: '토즈 투 바' },
        { programName: '백 익스텐션' },
        { programName: '슈퍼맨' },
        { programName: '버피' },
        { programName: '싸이클' },
        { programName: '일립티컬머신' },
        { programName: '야외러닝' },
        { programName: '스테퍼' },
        { programName: '트레드밀 러닝' },
        { programName: '워킹' },
        { programName: '배틀 로프' },
        { programName: '계단 오르기' },
        { programName: '스프린트' }
      ];

      setExerciseData(exercises);  // 운동 목록 상태 업데이트
      setLoading(false);
    } catch (error) {
      console.error('운동 데이터를 가져오는 데 실패했습니다:', error);
      setError('운동 데이터를 불러오는 데 실패했습니다.');
    }
  };

  // 운동 클릭 시 상세 정보 가져오기
  const handleExerciseClick = async (programName) => {
    console.log(`클릭한 운동: ${programName}`);  
    try {
      // DB에서 운동 상세 정보를 가져오기
      const response = await axios.get(`http://localhost:8080/api/exercises/${programName}`);
      console.log('운동 상세 데이터:', response.data);
      setSelectedExercise(response.data);  // 선택된 운동 정보를 저장
    } catch (err) {
      console.error('운동 정보를 불러오는 데 실패했습니다:', err);
      setError('운동 정보를 불러오는 데 실패했습니다.');
    }
  };

  const getYouTubeVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&]\S*)?/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    fetchExerciseData();  // 페이지 로딩 시 운동 목록을 불러옴
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="stretching-container">
      <h1>BodyWeight Training</h1>
     
      <div 
        className="logo-container" 
        onClick={() => navigate('/main')} // 로고 클릭 시 메인 페이지로 이동
        style={{ cursor: 'pointer' }} // 클릭 가능한 스타일 추가
      >
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="logo" />
      </div>
      <div className="exercise-list">
        {exerciseData.length > 0 ? (
          exerciseData.map((exercise, index) => (
            <div 
              key={index} 
              className="exercise-item"
              onClick={() => handleExerciseClick(exercise.programName)} // 운동 클릭 시 상세 정보 불러오기
            >
              <p>{exercise.programName}</p>
            </div>
          ))
        ) : (
          <p>운동 목록을 불러오는 데 실패했습니다.</p>
        )}
      </div>

      {selectedExercise && (
        <div className="exercise-details">
          <h2>{selectedExercise.programName}</h2>
          <p>{selectedExercise.description}</p>
          {selectedExercise.difficulty && (
            <p><strong>난이도:</strong> {selectedExercise.difficulty}</p>
          )}
          {selectedExercise.exerciseVideo && (
            <div>
              <strong>운동 영상:</strong>
              {getYouTubeVideoId(selectedExercise.exerciseVideo) ? (
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedExercise.exerciseVideo)}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>유효한 비디오 URL이 아닙니다.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Bodyweight;
