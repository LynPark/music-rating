import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyPage = () => {
    const [ratings, setRatings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await axios.get('/api/mypage', { withCredentials: true });
                setRatings(response.data.ratings); // 별점 기록만 설정
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user data');
            }
        };

        fetchRatings();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!ratings.length) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>My Ratings</h2>
            <ul>
                {ratings.map((rating) => (
                    <li key={rating.id}>
                        {rating.trackName}: {rating.rating} stars
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyPage;