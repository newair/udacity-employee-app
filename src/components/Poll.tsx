import { Question } from "../types";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import avatar from "../assets/images/avatar1.png"; // Tell webpack this JS file uses this image
import {
  useGetQuestionsQuery,
  useGetUsersQuery,
  useSaveQuestionAnswerMutation,
} from "../api/api";
import { authedUserSelector } from "../reducers/authedUser";
import { useAppSelector } from "../store";

interface PollState {
  author: string;
  avatarUrl: string;
  question: Question;
}
function Poll() {
  const { id: qid } = useParams();

  const { data: questions } = useGetQuestionsQuery();
  const { data: users } = useGetUsersQuery();

  const [poll, setPoll] = useState<PollState>();
  const { id: authedUserId } = useAppSelector(authedUserSelector);

  const optionOneVotes = poll?.question?.optionOne?.votes;
  const optionTwoVotes = poll?.question?.optionTwo?.votes;

  const optionOneVoteCount = optionOneVotes?.length ?? 0;
  const optionTwoVoteCount = optionTwoVotes?.length ?? 0;

  const votedOptionOne = useMemo(() => {
    if (!authedUserId) {
      return false;
    }
    return optionOneVotes?.includes(authedUserId) ? "voted" : "";
  }, [optionOneVotes, authedUserId]);

  const votedOptionTwo = useMemo(() => {
    if (!authedUserId) {
      return "";
    }
    return optionTwoVotes?.includes(authedUserId) ? "voted" : "";
  }, [optionTwoVotes, authedUserId]);

  const optionOnePct = useMemo(() => {
    return (
      (optionOneVoteCount / (optionOneVoteCount + optionTwoVoteCount)) *
      100
    ).toFixed(2);
  }, [optionOneVoteCount, optionTwoVoteCount]);

  const optionTwoPct = useMemo(() => {
    return (
      (optionTwoVoteCount / (optionOneVoteCount + optionTwoVoteCount)) *
      100
    ).toFixed(2);
  }, [optionOneVoteCount, optionTwoVoteCount]);

  useEffect(() => {
    if (
      qid &&
      questions &&
      Object.keys(questions).length &&
      users &&
      Object.keys(users).length
    ) {
      const question = questions[qid];
      const author = question?.author;
      const user = users[author];

      setPoll({ author, avatarUrl: user.avatarURL, question });
    }
  }, [questions, qid, users]);

  const [saveQuestionAnswer, { isError }] = useSaveQuestionAnswerMutation();

  return (
    <div className="poll">
      {isError && <span>Error saving the answer</span>}
      <div className="authorName"> {poll?.author}</div>
      <div className="authorImage">
        {<img src={poll?.avatarUrl ?? avatar} alt="No avatar"></img>}
      </div>
      <h2>Would you rather?</h2>

      <div className="options">
        <div className={`option ${votedOptionOne}`}>
          <div className="text">{poll?.question.optionOne.text}</div>
          <button
            className="vote-button"
            onClick={() => {
              qid &&
                saveQuestionAnswer({
                  qid,
                  answer: "optionOne",
                  authedUser: authedUserId,
                });
            }}
          >
            First Option
          </button>
          <span className="votes">{optionOneVoteCount} votes</span>
          <span className="votes">{optionOnePct} % answered</span>
        </div>

        <div className={`option ${votedOptionTwo}`}>
          <div className="text">{poll?.question.optionTwo.text}</div>
          <button
            className="vote-button"
            onClick={() => {
              qid &&
                saveQuestionAnswer({
                  qid,
                  answer: "optionTwo",
                  authedUser: authedUserId,
                });
            }}
          >
            Second Option
          </button>
          <span className="votes">{optionTwoVoteCount} votes</span>
          <span className="votes">{optionTwoPct} % answered</span>
        </div>
      </div>
    </div>
  );
}

export default Poll;
