import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');

    const handleInitialSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8080/api/users/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone, username }),
        });

        if (response.ok) {
            setStep(2);
        } else {
            setMessage('전화번호와 아이디가 일치하지 않습니다.');
        }
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8080/api/users/change-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, newPassword }),
        });

        if (response.ok) {
            setMessage('사용자의 비밀번호가 변경되었습니다.');

            setTimeout(() => {
                navigate('/');
            }, 3000);
        } else {
            setMessage('비밀번호 변경 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="password-reset-container">
            <div className="password-reset-box">
                <img src="/logo.png" alt="Fitsweat Logo" className="logo" />

                {step === 1 ? (
                    <form onSubmit={handleInitialSubmit} className="password-reset-form">
                        <label htmlFor="phone">전화번호</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="전화번호를 입력하세요"
                            required
                        />
                        <label htmlFor="username">아이디</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="아이디를 입력하세요"
                            required
                        />
                        <button type="submit" className="reset-button">비밀번호 변경</button>
                    </form>
                ) : (
                    <form onSubmit={handlePasswordSubmit} className="password-reset-form">
                        <label htmlFor="newPassword">새 비밀번호</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="새 비밀번호"
                            required
                        />
                        <button type="submit" className="reset-button">변경</button>
                    </form>
                )}

                {message && (
                    <div className="confirmation-container">
                        <div className="confirmation-box">
                            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="logo" />
                            <p className="confirmation-message">{message}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
