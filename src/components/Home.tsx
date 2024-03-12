import { Question } from "../types";
import Section from "./Section";
import { useEffect, useState } from "react";
import { authedUserSelector } from "../reducers/authedUser";
import { useGetQuestionsQuery } from "../api/api";
import { useAppSelector } from "../store";

interface QuestionCategories {
  answeredQuestions: Array<Question>;
  unAnsweredQuestions: Array<Question>;
}

function Home() {
  const { data: questions, error, isError, isSuccess } = useGetQuestionsQuery();

  const { id: authedUserId } = useAppSelector(authedUserSelector);

  const [categorizedQuestions, setCategorizedQuestions] =
    useState<QuestionCategories>();

  useEffect(() => {
    const answeredQuestions: Array<Question> = [];
    const unAnsweredQuestions: Array<Question> = [];

    if (isError) {
      alert("Error fetching questions");
    }

    if (authedUserId && isSuccess && questions) {
      Object.values(questions)?.forEach((question: Question) => {
        if (
          question.optionOne.votes.includes(authedUserId) ||
          question.optionTwo.votes.includes(authedUserId)
        ) {
          answeredQuestions.push(question);
        } else {
          unAnsweredQuestions.push(question);
        }
      });

      setCategorizedQuestions({
        answeredQuestions,
        unAnsweredQuestions,
      });
    }
  }, [questions, authedUserId, isSuccess, isError, error]);

  const [showNewQuestions, setShowNewQuestions] = useState<boolean>(true);

  const toggleChange = () => {
    setShowNewQuestions(!showNewQuestions);
  };

  return categorizedQuestions ? (
    <div className="home">
      <div className="questionStateDisplayToggle">
        <label className="label" htmlFor="toggleNewQuestions">
          Show New Questions
        </label>
        <input
          className="checkBox"
          type="checkbox"
          id="toggleNewQuestions"
          onChange={toggleChange}
          name="show New Questions"
          checked={showNewQuestions}
        />
      </div>
      {showNewQuestions && (
        <Section
          title="New Questions"
          questions={categorizedQuestions.unAnsweredQuestions}
        ></Section>
      )}
      {!showNewQuestions && (
        <Section
          title="Done"
          questions={categorizedQuestions.answeredQuestions}
        ></Section>
      )}
    </div>
  ) : (
    <></>
  );
}

export default Home;
