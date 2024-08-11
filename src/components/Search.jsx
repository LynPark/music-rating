
import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query) {
            setLoading(true);
            try {
                const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music`);
                const data = await response.json();
                const results = data.results.map(item => ({
                    id: item.trackId,
                    title: item.trackName,
                    artist: item.artistName,
                    album: item.collectionName,
                    cover: item.artworkUrl100,  // Album cover image
                    rating: 0
                }));
                onSearch(results);
            } catch (error) {
                console.error("Error fetching data from iTunes API", error);
                alert("An error occurred while searching. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for music..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default Search;
