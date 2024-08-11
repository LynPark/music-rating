import React, { useState } from 'react';
import './RatingStars.css';

const RatingStars = ({ initialRating, onRate }) => {
    const [rating, setRating] = useState(initialRating);

    const handleClick = (newRating) => {
        setRating(newRating);
        onRate(newRating);  // 부모 컴포넌트에 새로운 별점을 전달
    };

    return (
        <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={star <= rating ? 'star filled' : 'star'}
                    onClick={() => handleClick(star)}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default RatingStars;
