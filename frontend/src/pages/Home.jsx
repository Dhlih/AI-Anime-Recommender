import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [anime, setAnime] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/generate", {
        anime,
      });
      const data = await response.data;
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl text-green-300 mb-2 font-semibold">
          Ai Anime Recommender
        </h1>
        <p>Find some anime that similar to your favorite anime</p>
        <div className="form-group mt-6">
          <input
            type="text"
            placeholder="Enter title..."
            value={anime}
            onChange={(e) => setAnime(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && anime !== "") {
                const response = await handleSearch();
                const data = response.anime;
                console.log(data);
                navigate("/search", { state: { posters: data } });
              }
            }}
            className="bg-white rounded-md mr-4 py-1 px-3 text-black outline-none"
          />
          <button className="bg-green-300 text-black py-1 px-3 rounded-md">
            Filter
          </button>
        </div>
        {loading && <p className="mt-4">Please wait a minute...</p>}
      </div>
    </div>
  );
};

export default Home;
