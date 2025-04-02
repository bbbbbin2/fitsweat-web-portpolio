import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

const InputField = ({ label, type, id, value, onChange, required, name, placeholder }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
  </div>
);

const SelectField = ({ label, id, value, onChange, options, name }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <select id={id} name={name} value={value} onChange={onChange} className="gender-select" required>
      <option value="">선택하세요</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    name: '',
    gender: '',
    birth_date: '',
  });

  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [usernameCheckMessage, setUsernameCheckMessage] = useState('');
  const [usernameInputError, setUsernameInputError] = useState('');
  const [showInputError, setShowInputError] = useState(false);
  const [isSignupComplete, setIsSignupComplete] = useState(false); // 회원가입 완료 상태 추가

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'username') {
      setUsernameInputError('');
    }
  };

  const checkUsernameAvailability = async () => {
    if (!formData.username) {
      setIsUsernameAvailable(true);
      setUsernameCheckMessage('');
      setUsernameInputError('아이디를 입력하세요.'); 
      setShowInputError(true);
      setTimeout(() => setShowInputError(false), 1000);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/users/check-username?username=${formData.username}`);
      if (response.data) {
        setIsUsernameAvailable(true);
        setUsernameCheckMessage('사용 가능한 아이디입니다.');
        setUsernameInputError('');
      } else {
        setIsUsernameAvailable(false);
        setUsernameCheckMessage('아이디가 이미 사용 중입니다.');
        setUsernameInputError('');
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
      setUsernameCheckMessage('중복 확인 중 오류가 발생했습니다.');
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validatePassword(formData.password)) {
      setPasswordError('비밀번호는 8자 이상이며 특수문자를 하나 이상 포함해야 합니다.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (isUsernameAvailable) {
      try {
        const response = await axios.post('http://localhost:8080/api/users/register', formData);
        console.log('회원가입 성공:', response.data);
        setIsSignupComplete(true); // 회원가입 완료 상태 업데이트
        setTimeout(() => {
          navigate('/'); // 2초 후 홈으로 이동
        }, 2000);
      } catch (error) {
        console.error('회원가입 오류:', error);
        alert('회원가입 중 오류가 발생했습니다.');
      }
    } else {
      alert('아이디가 이미 사용 중입니다.');
    }
  };

  if (isSignupComplete) {
    return (
      <div className="complete-container">
        <div className="complete-box">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="complete-logo" />
          <p className="complete-message">회원가입이 완료되었습니다.</p>
          <p className="complete-submessage">로그인 후 서비스를 이용하세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">아이디</label>
          <div className="input-group">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="아이디를 입력하세요"
            />
            <button
              type="button"
              onClick={checkUsernameAvailability}
              className="check-button"
            >
              중복 확인
            </button>
          </div>
          {usernameCheckMessage && (
            <div className={isUsernameAvailable ? 'success-message' : 'error-message'}>
              {usernameCheckMessage}
            </div>
          )}
          {usernameInputError && showInputError && (
            <div className="error-message" style={{ fontSize: 'small', marginTop: '5px' }}>{usernameInputError}</div>
          )}
        </div>

        <InputField
          label="비밀번호"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => {
            handleChange(e);
            setPasswordError('');
          }}
          required
          placeholder="비밀번호를 입력하세요"
        />
        <InputField
          label="비밀번호 확인"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          placeholder="비밀번호를 다시 입력하세요"
        />
        <InputField
          label="이메일"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="이메일을 입력하세요"
        />
        <InputField
          label="전화번호"
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="전화번호를 입력하세요"
        />
        <div className="name-gender-group">
          <InputField
            label="이름"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="이름을 입력하세요"
          />
          <SelectField
            label="성별"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={[
              { value: 'male', label: '남성' },
              { value: 'female', label: '여성' },
              { value: 'other', label: '기타' },
            ]}
          />
        </div>
        <InputField
          label="생년월일"
          type="date"
          id="birth_date"
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
          required
        />
        {passwordError && <div className="error-message">{passwordError}</div>}
        <button type="submit" className="signup-button">회원가입</button>
      </form>
    </div>
  );
}

export default SignUp;
