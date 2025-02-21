const Card = ({ anime }) => {
  console.log(anime.name);

  return (
    <div className="w-[30%] rounded-md overflow-hidden">
      <img
        src={anime.img}
        className="w-full h-[200px] object-cover object-center"
        alt=""
      />
      <div className="bg-[#D9D9D9] text-black px-3 py-4 h-[100px]">
        <h1 className="text-lg font-semibold">
          {anime.name.replace(/\b(The|Movie)\b/gi, "").trim().length > 24
            ? `${anime.name
                .replace(/\b(The|Movie)\b/gi, "")
                .trim()
                .slice(0, 22)}...`
            : anime.name.replace(/\b(The|Movie)\b/gi, "").trim()}
        </h1>
        <p>Episodes : {anime.episodes.eps ? anime.episodes.eps : "unknown"}</p>
      </div>
    </div>
  );
};

export default Card;
