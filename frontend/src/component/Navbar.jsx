import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="bg-green-300 text-black p-4">
        <h1 className="text-xl font-semibold">
          <Link to={"/"}>Home</Link>
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
