import { Link } from "react-router-dom";
import Login from "./Login";

const Home = () => {
  return (
    <>
      <h1>Pages:</h1>
      <section className="flex flex-col max-w-lg">
        <Link className="border-2 border-indigo-300" to="/login">
          Go to Login page
        </Link>
        <Link className="border-2 border-orange-300" to="/register">
          Go to Register page
        </Link>
      </section>
    </>
  );
};
export default Home;
