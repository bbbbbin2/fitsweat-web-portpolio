import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewRecord.css';

const NewRecord = () => {
  const [formData, setFormData] = useState({
    date: '',
    exercise_type: '',
    program_name: '',
    exercise_time: 0,
    sets: '',
    notes: '',
    weight: 0,
  });

  const [userId, setUserId] = useState(''); // 로그인된 사용자 ID 저장
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // 로그인된 사용자 정보 가져오기
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
    } else {
      setErrorMessage('로그인이 필요합니다.');
      navigate('/login'); // 로그인 페이지로 이동
    }
  }, [navigate]);

  // 입력 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 몸무게 변경 핸들러
  const handleWeightChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, weight: parseInt(value, 10) });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      userId: userId,
      date: formData.date,
      notes: formData.notes,
      program_name: formData.program_name,
      exercise_type: formData.exercise_type,
      exercise_time: parseInt(formData.exercise_time, 10),
      sets: formData.sets,
      weight: parseInt(formData.weight, 10),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const response = await axios.post('http://localhost:8080/api/exercise-record', dataToSend);
      if (response.status === 201) {
        alert('운동 기록이 성공적으로 저장되었습니다!');
        navigate('/fitness-record');
      }
    } catch (error) {
      console.error('운동 기록 저장 실패:', error.response?.data || error.message);
      setErrorMessage('운동 기록 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="newrecord-container">
      <header className="newrecord-header">
        <div className="newrecord-header-right">
          <span>New record</span>
        </div>
      </header>
      <form className="newrecord-form" onSubmit={handleSubmit}>
        <div className="newrecord-form-group">
          <label>날짜</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="newrecord-form-group">
          <label>운동 카테고리</label>
          <select
            name="exercise_type"
            value={formData.exercise_type}
            onChange={handleChange}
            required
          >
            <option value="">-- 선택 --</option>
            <option value="Stretching">Stretching</option>
            <option value="Bodyweight">Bodyweight</option>
            <option value="Weight">Weight</option>
          </select>
        </div>
        <div className="newrecord-form-group">
          <label>운동 종류</label>
          <input
            type="text"
            name="program_name"
            value={formData.program_name}
            onChange={handleChange}
            placeholder="운동 종류를 입력하세요"
            required
          />
        </div>
        <div className="newrecord-form-group">
          <label>운동 시간 (분)</label>
          <input
            type="number"
            name="exercise_time"
            value={formData.exercise_time}
            onChange={handleChange}
            placeholder="운동 시간을 입력하세요"
            min="0"
            step="1"
            required
          />
        </div>
        <div className="newrecord-form-group">
          <label>운동량</label>
          <input
            type="text"
            name="sets"
            value={formData.sets}
            onChange={handleChange}
            placeholder="예: 5km, 30분, 15개 3세트"
            required
          />
        </div>
        <div className="newrecord-form-group">
          <label>몸무게</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleWeightChange}
            placeholder="몸무게를 입력하세요"
            min="0"
            step="1"
            required
          />
        </div>
        <div className="newrecord-form-group">
          <label>기록</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="예: 오늘은 컨디션이 좋았어요!"
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="newrecord-submit-button">
          기록
        </button>
      </form>
    </div>
  );
};

export default NewRecord;
