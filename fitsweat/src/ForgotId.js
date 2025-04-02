import React, { useState } from 'react';
import axios from 'axios';
import './ForgotId.css';

const ForgotId = () => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');

    const handleInitialSubmit = (event) => {
        event.preventDefault();
        setStep(2);
    };

    const handleIdRetrieval = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:8080/api/users/find-id', {
                params: { phone, email },
            });
            setMessage(`아이디는 ${response.data}입니다.`);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setMessage("아이디를 찾을 수 없습니다.");
            } else {
                setMessage("오류가 발생했습니다. 다시 시도해 주세요.");
            }
        }
    };

    return (
        <div className="forgot-id-container">
            <div className="forgot-id-form">
                <img src="/logo.png" alt="Fitsweat Logo" className="logo" />
                {step === 1 ? (
                    <form onSubmit={handleInitialSubmit}>
                        <label htmlFor="phone">전화번호</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="전화번호를 입력하세요"
                            required
                        />
                        <label htmlFor="email">이메일</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일을 입력하세요"
                            required
                        />
                        <button type="submit" className="forgot-id-button">아이디 찾기</button>
                    </form>
                ) : (
                    <form onSubmit={handleIdRetrieval} className="forgot-id-result-box">
                        <button type="submit" className="forgot-id-button">아이디 확인하기</button>
                    </form>
                )}

                {message && <p className="result-message">{message}</p>}
            </div>
        </div>
    );
};

export default ForgotId;
