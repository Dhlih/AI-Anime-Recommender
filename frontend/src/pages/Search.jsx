import { useLocation } from "react-router-dom";
import Card from "../component/Card";
import Navbar from "../component/Navbar";

const Search = () => {
  const location = useLocation();
  const result = location.state?.posters || [];
  console.log(result);

  return (
    <div>
      <Navbar />
      <div className="py-[5rem]">
        <div className="flex flex-wrap gap-[2.2rem] max-w-[800px] mx-auto">
          {result.map((el) => (
            <Card anime={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
