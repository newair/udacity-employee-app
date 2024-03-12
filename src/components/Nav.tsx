import { Link } from "react-router-dom";
import { authedUserSelector } from "../reducers/authedUser";
import { useAppSelector } from "../store";
import Profile from "./Profile";

const Nav = () => {
  const { id: authedUserId } = useAppSelector(authedUserSelector);

  return authedUserId ? (
    <div className="menu-header">
      <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/leaderboard">leaderboard</Link>
          <Link to="/add">new Poll</Link>
          <Link to="/login">Logout</Link>
      </div>

      <div className="profile">
        <Profile />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Nav;
