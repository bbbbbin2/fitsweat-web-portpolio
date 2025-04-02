import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FitnessRecord.css';

const FitnessRecord = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 표시 여부
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); // 로그인한 사용자 ID 가져오기

  // 달의 첫 날짜와 마지막 날짜 계산
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
  const getLastDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  // 운동 기록 불러오기
  useEffect(() => {
    const fetchRecords = async () => {
      if (!userId) {
        setErrorMessage('로그인이 필요합니다.');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/exercise-record?userId=${userId}`, {
          withCredentials: true,
        });
        setRecords(response.data);
      } catch (error) {
        console.error('운동 기록을 불러오는 중 오류가 발생했습니다:', error);
        setErrorMessage('운동 기록을 불러오는 중 오류가 발생했습니다.');
      }
    };
    fetchRecords();
  }, [currentDate, userId]);

  // 특정 날짜 클릭 시 이벤트 핸들러
  const handleDateClick = (date) => {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const recordsForDate = records.filter((record) => record.date === formattedDate);
    setSelectedDate(formattedDate);
    setSelectedRecords(recordsForDate);
    setIsModalVisible(!isModalVisible); // 모달 표시 여부 토글
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // 모달 닫기
  };

  // 달력 날짜 생성
  const generateCalendarDates = () => {
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const lastDayOfMonth = getLastDayOfMonth(currentDate);
    const startDay = firstDayOfMonth.getDay();

    const dates = [];
    for (let i = 0; i < startDay; i++) {
      dates.push(null); // 이전 월의 빈 칸
    }

    let current = new Date(firstDayOfMonth);
    while (current <= lastDayOfMonth) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  // 특정 날짜에 운동 기록이 있는지 확인
  const hasRecords = (date) => {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return records.some((record) => record.date === formattedDate);
  };

  return (
    <div className="fitsweat-fitness-record-container">
      <header className="fitsweat-header">
      <div 
        className="go-home-button" 
        onClick={() => navigate('/main')} // 로고 클릭 시 메인 페이지로 이동
        style={{ cursor: 'pointer' }} // 클릭 가능한 스타일 추가
      >
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="logo" />
      </div>
        <div className="fitsweat-header-right button-group">
          
          <button className="new-record-button" onClick={() => navigate('/new-record')}>New Record +</button>
        </div>
      </header>
      <div className="calendar-container">
        <div className="month-navigation">
          <button className="arrow-button" onClick={handlePrevMonth}>{'<'}</button>
          <span className="month-title">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </span>
          <button className="arrow-button" onClick={handleNextMonth}>{'>'}</button>
        </div>
        <div className="calendar-grid">
          <div className="weekday">일</div>
          <div className="weekday">월</div>
          <div className="weekday">화</div>
          <div className="weekday">수</div>
          <div className="weekday">목</div>
          <div className="weekday">금</div>
          <div className="weekday">토</div>
          {generateCalendarDates().map((date, index) => (
            <div
              key={index}
              className={`day ${date && date.getMonth() === currentDate.getMonth() ? 'current-month' : 'empty'} ${
                date && hasRecords(date) ? 'has-records' : ''
              }`}
              onClick={() => date && date.getMonth() === currentDate.getMonth() && handleDateClick(date)}
            >
              <div>{date ? date.getDate() : ''}</div>
            </div>
          ))}
        </div>
      </div>
      {isModalVisible && selectedDate && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedDate} 운동 기록</h3>
            {selectedRecords.length > 0 ? (
              <ul>
                {selectedRecords.map((record, index) => (
                  <li key={index}>
                    {record.program_name} - {record.exercise_time}분 - {record.sets}
                  </li>
                ))}
              </ul>
            ) : (
              <p>운동 기록이 없습니다.</p>
            )}
            <button onClick={handleCloseModal}>닫기</button>
          </div>
        </div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default FitnessRecord;
