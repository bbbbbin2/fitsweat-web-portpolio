import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import './App.css';
import SignUp from './SignUp.js';
import ForgotPassword from './ForgotPassword.js';
import ForgotId from './ForgotId.js';
import MainPage from './MainPage.js';
import PersonalProfile from './PersonalProfile.js';
import CommunityBoard from './CommunityBoard.js';
import NewPost from './NewPost.js';
import MyPost from './MyPost.js';
import Modify from './Modify.js';
import ViewComment from './ViewComment.js';
import FitnessRecord from './FitnessRecord';
import NewRecord from './NewRecord';
import Stretching from './Stretching';
import Bodyweight from './Bodyweight';
import Weight from './Weight';
import ProfileEditPage from './ProfileEditPage';

function Login({ onLogin }) {
    const [username, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();

                // 로그인 성공 시 userId를 localStorage에 저장
                localStorage.setItem('userId', data.id);

                // 로그인 상태 갱신 및 메인 페이지로 이동
                onLogin();
                navigate('/main');
            } else {
                const errorData = await response.text();
                setError('로그인에 실패했습니다. 다시 확인해 주세요.');
            }
        } catch (error) {
            console.error('로그인 에러:', error);
            setError('서버 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src="/logo.png" alt="Fitsweat Logo" className="logo" />
                <form onSubmit={handleSubmit} className="login-form">
                    <label htmlFor="username">아이디</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="아이디를 입력하세요"
                        required
                    />
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                        required
                    />
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? '로딩 중...' : '로그인'}
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}

                <div className="signup">
                    계정이 없으신가요? <Link to="/sign-up">회원가입</Link>
                </div>

                <hr className="divider" />

                <div className="extra-buttons">
                    <button className="extra-button" onClick={() => navigate('/forgot-id')}>아이디 찾기</button>
                    <button className="extra-button" onClick={() => navigate('/forgot-password')}>비밀번호 찾기</button>
                </div>
                <button className="main-button" onClick={() => navigate('/main')}>메인 페이지</button>
            </div>
        </div>
    );
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('userId'); // 로그아웃 시 userId 제거
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login onLogin={handleLogin} />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/forgot-id" element={<ForgotId />} />
                <Route path="/main" element={<MainPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
                <Route path="/personal-profile" element={<PersonalProfile />} />
                <Route path="/community-board" element={<CommunityBoard isLoggedIn={isLoggedIn} />} />
                <Route path="/new-post" element={<NewPost />} />
                <Route path="/my-post" element={<MyPost />} />
                <Route path="/modify/:post_id" element={<Modify />} />
                <Route path="/post/:postId" element={<ViewComment />} />
                <Route path="/view-comment/:postId" element={<ViewComment />} />
                <Route path="/fitness-record" element={<FitnessRecord />} />
                <Route path="/new-record" element={<NewRecord />} />

                <Route path="/Stretching" element={<Stretching />} />
                <Route path="/Bodyweight" element={<Bodyweight />} />
                <Route path="/Weight" element={<Weight />} />
                <Route path="/profile/edit" element={<ProfileEditPage />} />
            </Routes>
        </Router>
    );
}

export default App;
