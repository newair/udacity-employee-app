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
  const {
    data: questions,
    error,
    isError,
    isFetching,
    isSuccess,
  } = useGetQuestionsQuery();

  const { id: authedUserId } = useAppSelector(authedUserSelector);

  const [categorizedQuestions, setCategorizedQuestions] =
    useState<QuestionCategories>();

  console.log({
    questions,
    authedUserId,
    error,
    isError,
    isFetching,
    isSuccess,
  });
  useEffect(() => {
    const answeredQuestions: Array<Question> = [];
    const unAnsweredQuestions: Array<Question> = [];

    if (authedUserId && questions) {
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
  }, [questions, authedUserId]);

  return categorizedQuestions ? (
    <div className="home">
      <Section
        title="New Questions"
        questions={categorizedQuestions.unAnsweredQuestions}
      ></Section>
      <Section
        title="Done"
        questions={categorizedQuestions.answeredQuestions}
      ></Section>
    </div>
  ) : (
    <></>
  );
}

export default Home;
