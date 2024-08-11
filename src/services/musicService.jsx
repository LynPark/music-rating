import axios from "axios";

export const searchMusic = async (searchTerm) => {
  const response = await axios.get(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      searchTerm
    )}&limit=10&media=music&entity=musicTrack&country=kr`
  );
  return response.data;
};

export const rateMusic = async (trackId, rating) => {
  const response = await axios.post("/api/music/rate", { trackId, rating });
  return response.data;
};
