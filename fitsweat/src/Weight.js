import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios 추가
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import './Weight.css';

function Weight() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const [exerciseData, setExerciseData] = useState([]);  // 운동 목록 상태
  const [selectedExercise, setSelectedExercise] = useState(null);  // 선택된 운동 상태
  const [loading, setLoading] = useState(true);  // 로딩 상태
  const [error, setError] = useState(null);  // 에러 상태

  // 운동 목록 데이터 가져오기
  const fetchExerciseData = async () => {
    try {
      // 운동 목록 데이터
      const exercises = [
        { programName: '덤벨 레터럴 레이즈(사이드 레터럴 레이즈)' },
        { programName: '덤벨 해머 컬' },
        { programName: '덤벨 리어 델트 레이즈(벤트 오버 레터럴 레이즈)' },
        { programName: '덤벨 인클라인 컬' },
        { programName: '덤벨 인클라인 벤치프레스' },
        { programName: '덤벨 스티프 레그 데드리프트' },
        { programName: '덤벨 숄더프레스' },
        { programName: '덤벨 트라이셉 익스텐션' },
        { programName: '원 암 덤벨 로우' },
        { programName: '라잉 덤벨 풀오버' },
        { programName: '덤벨 바이셉 컬' },
        { programName: '바벨 바이셉 컬' },
        { programName: '바벨 라잉 트라이셉스 익스텐션(스컬크러셔)' },
        { programName: '바벨 플랫 벤치프레스' },
        { programName: '데드리프트' },
        { programName: '바벨 업라이트 로우' },
        { programName: '바벨 인클라인 벤치 프레스' },
        { programName: '바벨 로우(ベント 오버 바벨 로우)' },
        { programName: '바벨 리버스 컬' },
        { programName: '프리쳐 컬' },
        { programName: '바벨 숄더 프레스(오버헤드 프레스, 밀리터리 프레스)' },
        { programName: '바벨 스쿼트' },
        { programName: '스미스머신 오버헤드 숄더 프레스' },
        { programName: '스미스머신 인클라인 벤치프레스' },
        { programName: '스미스머신 스쿼트' },
        { programName: '스미스머신 바벨 로우' },
        { programName: '스미스머신 벤치프레스' },
        { programName: '스미스머신 런지' },
        { programName: '스미스머신 카프레이즈' },
        { programName: '스미스머신 비하인드 넥프레스' },
        { programName: '밴드 해머 컬' },
        { programName: '밴드 데드리프트' },
        { programName: '밴드 체스트 프레스' },
        { programName: '밴드 친 업' },
        { programName: '밴드 글루트 킥 백(밴드 힙 익스텐션)' },
        { programName: '밴드 풀 업' },
        { programName: '밴드 페이스 풀' },
        { programName: '밴드 프론트 레이즈' },
        { programName: '밴드 레터럴 레이즈' },
        { programName: '밴드 리어 델트 로우' },
        { programName: '밴드 레그 사이드 킥' },
        { programName: '싱글 레그 밴드 킥백' },
        { programName: '머신 인클라인 벤치 프레스' },
        { programName: '머신 체스트 프레스' },
        { programName: '머신 크런치' },
        { programName: '머신 딥스' },
        { programName: '레그 익스텐션' },
        { programName: '머신 랫 풀 다운' },
        { programName: '라잉 레그 컬' },
        { programName: '시티드 레그 컬' },
        { programName: '레그 프레스' },
        { programName: '머신 레그 프레스' },
        { programName: '케이블 바이셉 컬' },
        { programName: '케이블 헤머 컬' },
        { programName: '케이블 리버스 컬' },
        { programName: '벤치 케이블 플라이' },
        { programName: '케이블 크로스오버 플라이' },
        { programName: '케이블 스트레이트 암 풀 다운' },
        { programName: '랫 풀 다운' },
        { programName: '케이블 시티드 로우' },
        { programName: '케이블 오버헤드 트라이셉 익스텐션' },
        { programName: '케이블 V-bar 트라이셉 푸시 다운' }
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
      <div className="header">
        <h1>Weight Training</h1>

       
      </div>
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
              onClick={() => handleExerciseClick(exercise.programName)}
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

export default Weight;
