import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyPage.css';

const MyPage = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/mypage', { withCredentials: true });
                setUserData(response.data);
            } catch (error) {
                console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login'); // 인증되지 않은 경우 로그인 페이지로 리디렉션
                }
            }
        };
        fetchUserData();
    }, [navigate]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>{userData.username}님의 마이페이지</h1>
            <div className="user-info">
                <h2>회원 정보</h2>
                <p>이메일: {userData.email}</p>
                <h2>별점 기록</h2>
                <ul className="rating-list">
                    {userData.ratings.map((rating) => (
                        <li key={rating.id} className="rating-item">
                            <p>{rating.trackName}: {rating.rating}점</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyPage;
