import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import Poll from "./Poll";
import NewPoll from "./NewPoll";
import Login from "./Login";
import SecureRoute from "./Secure";
import { NotFound } from "./NotFound";

function App() {
  return (
    <div className="container">
      <Nav />
      {
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<SecureRoute />}>
            <Route path="/" index element={<Home />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/question/:id" element={<Poll />} />
            <Route path="/add" element={<NewPoll />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Route>
        </Routes>
      }
    </div>
  );
}

export default App;
