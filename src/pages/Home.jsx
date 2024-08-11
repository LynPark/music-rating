
import React, { useState, useEffect } from 'react';
import Auth from '../components/Auth';
import Search from '../components/Search';
import Rating from '../components/Rating';

const Home = () => {
    const [user, setUser] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [ratedSongs, setRatedSongs] = useState([]);

    useEffect(() => {
        // Load rated songs from localStorage
        const storedRatings = JSON.parse(localStorage.getItem('ratedSongs')) || [];
        setRatedSongs(storedRatings);
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleSearch = (results) => {
        setSearchResults(results);
    };

    const handleRating = (rating, song) => {
        const newRating = { ...song, rating };
        setSearchResults(prevResults => 
            prevResults.map(result => 
                result.id === song.id ? newRating : result
            )
        );
        
        const updatedRatedSongs = [...ratedSongs.filter(s => s.id !== song.id), newRating];
        setRatedSongs(updatedRatedSongs);
        localStorage.setItem('ratedSongs', JSON.stringify(updatedRatedSongs));
    };

    return (
        <div className="home-container">
            {!user ? (
                <Auth onLogin={handleLogin} />
            ) : (
                <div>
                    <h2>Welcome, {user.username}</h2>
                    <Search onSearch={handleSearch} />
                    <div className="search-results">
                        {searchResults.length > 0 ? (
                            searchResults.map(result => (
                                <div key={result.id} className="search-item">
                                    <img src={result.cover} alt={result.album} className="album-cover" />
                                    <div className="music-info">
                                        <p>{result.title} - {result.artist}</p>
                                        <p><i>{result.album}</i></p>
                                    </div>
                                    <Rating 
                                        onRate={(rating) => handleRating(rating, result)} 
                                    />
                                    <p>Your rating: {result.rating} stars</p>
                                </div>
                            ))
                        ) : (
                            <p>No results found</p>
                        )}
                    </div>

                    <h3>Your Rated Songs</h3>
                    <div className="rated-songs">
                        {ratedSongs.length > 0 ? (
                            ratedSongs.map(song => (
                                <div key={song.id} className="rated-item">
                                    <img src={song.cover} alt={song.album} className="album-cover" />
                                    <div className="music-info">
                                        <p>{song.title} - {song.artist}</p>
                                        <p><i>{song.album}</i></p>
                                    </div>
                                    <p>Your rating: {song.rating} stars</p>
                                </div>
                            ))
                        ) : (
                            <p>You have not rated any songs yet.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
