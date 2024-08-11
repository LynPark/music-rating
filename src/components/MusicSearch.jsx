import React, { useState } from "react";
import axios from "axios";
import RatingStars from "./RatingStars";
import "./MusicSearch.css";

const MusicSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          searchTerm
        )}&limit=10&media=music&entity=musicTrack&country=kr`
      );
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching data from iTunes API:", error);
    }
  };

  const handleRating = async (trackId, rating) => {
    try {
      const response = await axios.post("/api/rate", { trackId, rating }, { withCredentials: true });
      if (response.status === 200) {
          alert("별점이 성공적으로 기록되었습니다.");
      }
    } catch (error) {
      console.error("별점 기록 중 오류 발생:", error);
    }
  };

  return (
    <div className="music-search-container">
      <h1>음악 검색</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="아티스트 또는 곡 이름 입력"
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div className="search-results">
        {results.length > 0 ? (
          <ul>
            {results.map((track) => (
              <li key={track.trackId} className="track-card">
                <img src={track.artworkUrl100} alt={track.trackName} />
                <div className="track-info">
                  <p className="track-name">{track.trackName}</p>
                  <p className="artist-name">by {track.artistName}</p>
                  <p className="album-name">{track.collectionName}</p>
                  <RatingStars
                    initialRating={0} // 초기 별점 설정 (0점으로 시작)
                    onRate={(rating) => handleRating(track.trackId, rating)}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>결과가 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default MusicSearch;
