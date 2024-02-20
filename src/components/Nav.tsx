import { Link } from "react-router-dom";
import { authedUserSelector } from "../reducers/authedUser";
import { useAppSelector } from "../store";

const Nav = () => {
  const { id: authedUserId } = useAppSelector(authedUserSelector);

  return authedUserId ? (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/leaderboard">leaderboard</Link>
        </li>
        <li>
          <Link to="/add">new Poll</Link>
        </li>
        <li>
          <Link to="/login">Logout</Link>
        </li>
      </ul>
    </nav>
  ) : (
    <></>
  );
};

export default Nav;
