import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RateButton({ songId }) {
    const navigate = useNavigate();

    const handleRate = async (rating) => {
        try {
            const response = await axios.post(`/api/rate`, { songId, rating });
            if (response.status === 200) {
                alert('평점이 기록되었습니다.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login'); // 로그인 페이지로 리디렉션
            } else {
                console.error('평점 기록 중 오류 발생:', error);
            }
        }
    };

    return (
        <button onClick={() => handleRate(5)}>별점 주기</button>
    );
}
