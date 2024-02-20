import { useNavigate } from "react-router-dom";
import { Question } from "../types";
import * as moment from "moment";

function Section({
  title,
  questions,
}: {
  title: string;
  questions: Array<Question>;
}) {
  const navigate = useNavigate();
  const onQuestionClick = (id: string) => {
    navigate(`/question/${id}`);
  };
  return (
    <div className="section">
      <h1 className="sectionHeader">{title}</h1>
      <div className="sectionBody">
        {questions
          .sort((a, b) => a.timestamp - b.timestamp)
          ?.map((question) => (
            <div
              className="section-box"
              onClick={() => onQuestionClick(question.id)}
            >
              <span className="section-box-author">{question.author}</span>
              <span className="section-box-timestamp">
                {moment
                  .unix(question.timestamp / 1000)
                  .format("h:mm | DD/MM/YYYY")}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Section;
