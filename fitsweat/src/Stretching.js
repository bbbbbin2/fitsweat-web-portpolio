import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Stretching.css';

function Stretching() {
  const navigate = useNavigate();
  const [exerciseData, setExerciseData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExerciseData = async () => {
    try {
      const exercises = [
        { programName: '요가' },
        { programName: '필라테스 크랩' },
        { programName: '필라테스 크런치' },
        { programName: '어깨스트레칭' },
        { programName: '등스트레칭' },
        { programName: '햄스트링 스트레칭' },
        { programName: '종아리 폼롤러' },
        { programName: '등 폼롤러' },
        { programName: '허리돌리기' },
        { programName: '골반 스트레칭' },
      ];
      setExerciseData(exercises);
      setLoading(false);
    } catch (error) {
      console.error('운동 데이터를 가져오는 데 실패했습니다:', error);
      setError('운동 데이터를 불러오는 데 실패했습니다.');
    }
  };

  const handleExerciseClick = async (programName) => {
    console.log(`클릭한 운동: ${programName}`);
    try {
      const response = await axios.get(`http://localhost:8080/api/exercises/${programName}`);
      console.log('운동 상세 데이터:', response.data);
      setSelectedExercise(response.data);
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
    fetchExerciseData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="stretching-container">
      <h1>Stretching Page</h1>
      
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

export default Stretching;
