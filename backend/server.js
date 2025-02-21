require("dotenv").config();
const cors = require("cors");
const express = require("express");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const fetchPosters = async (animeList) => {
  try {
    const posters = await Promise.all(
      animeList.map(async (anime) => {
        const response = await axios.get(
          `https://api-anime-rouge.vercel.app/aniwatch/search?keyword=${anime}&page=1`
        );
        return response.data.animes[0]; // Mengembalikan URL gambar
      })
    );
    return posters; // Mengembalikan array berisi URL poster
  } catch (error) {
    console.error("Error fetching posters:", error.message);
    throw new Error("Failed to fetch posters");
  }
};

app.post("/api/generate", async (req, res) => {
  const animePrompt = req.body.anime;

  const prompt = `Berikan saya 9 anime dengan cerita yang mirip dengan ${animePrompt} dalam format json. Berikan 
    dalam judul bahasa Jepang , tetapi hanya dalam romaji (alfabet latin) jadi tidak perlu menyertakan judul
    bahasa Inggrisnya dan cukup bahasa Jepangnya saja. Jangan tambahkan apa apa ke dalam jawaban, cukup ikuti format yang saya berikan: 
    "["judul anime", "judul anime", "judul anime", dst]". Anda wajib menghilangkan 
    petik-petik miring (backticks) json di sebelum dan sesudah array`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    const animeList = JSON.parse(responseText);
    const data = await fetchPosters(animeList); // Panggil fetchPosters dan tunggu hasilnya

    console.log("gemini response : " + responseText);
    console.log(data);

    res.json({ success: true, anime: data });
  } catch (error) {
    console.error("Request Error:", error.message);
    res.status(500).json({ success: false, message: "Gagal memperoleh data" });
  }
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
