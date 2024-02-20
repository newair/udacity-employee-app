import { useCallback, useMemo } from "react";
import { useGetUsersQuery } from "../api/api";
import { User, Users } from "../types";

function LeaderBoard() {
  const { data: users } = useGetUsersQuery();

  const numberOfAnswers = (user: User) => {
    return Object.keys(user.answers).length;
  };

  const numberOfQuestions = (user: User) => {
    return user.questions.length;
  };

  const sortUsers = useCallback((users?: Users) => {
    return users
      ? Object.keys(users)
          .sort((a, b) => {
            const userA = users[a];
            const userB = users[b];
            const numberOfAnswersA = numberOfAnswers(userA);
            const numberOfAnswersB = numberOfAnswers(userB);
            const numberOfQuestionsA = numberOfQuestions(userA);
            const numberOfQuestionsB = numberOfQuestions(userB);

            return numberOfAnswersA + numberOfQuestionsA <
              numberOfAnswersB + numberOfQuestionsB
              ? 1
              : -1;
          })
          .map((userId) => users[userId])
      : [];
  }, []);

  const sortedUsers = useMemo(() => sortUsers(users), [users, sortUsers]);

  return (
    <div className="leaderboard">
      {users ? (
        <section className="section">
          <header className="header">
            <div className="col">Users</div>
            <div className="col">Profile</div>
            <div className="col">Answered</div>
            <div className="col">Created</div>
          </header>
          {sortedUsers.map((user) => (
            <div className="row">
              <div className="col">{user.name}</div>
              <div className="col">
                <img
                  src={user.avatarURL}
                  width="25px"
                  height="25px"
                  alt="not found"
                ></img>
              </div>
              <div className="col">{numberOfAnswers(user)}</div>
              <div className="col">{numberOfQuestions(user)}</div>
            </div>
          ))}
        </section>
      ) : (
        <></>
      )}
    </div>
  );
}

export default LeaderBoard;
