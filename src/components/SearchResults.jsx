import React from 'react';
import './SearchResults.css';

function SearchResults({ results }) {
    return (
        <div className="search-results">
            {results.map((result, index) => (
                <div key={index} className="search-result-item">
                    <img src={result.albumCover} alt={`${result.title} album cover`} className="album-cover" />
                    <div className="music-info">
                        <h3>{result.title}</h3>
                        <p>{result.artist}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SearchResults;
