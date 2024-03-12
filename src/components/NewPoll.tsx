import { useEffect, useState } from "react";
import { useSaveQuestionMutation } from "../api/api";
import { authedUserSelector } from "../reducers/authedUser";
import { useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";

function NewPoll() {
  const [optionOneText, setOptionOneText] = useState<string>("");
  const [optionTwoText, setOptionTwoText] = useState<string>("");
  const { id: authedUserId } = useAppSelector(authedUserSelector);
  const [saveQuestion, saveQuestionResult] = useSaveQuestionMutation();

  const navigate = useNavigate();

  useEffect(()=> {
    if(saveQuestionResult.isSuccess) {
      navigate('/');
    }
  }, [saveQuestionResult.isSuccess]);

  const createPoll = () => {
    if (optionOneText && optionTwoText && authedUserId) {
      saveQuestion({
        author: authedUserId,
        optionOneText,
        optionTwoText,
      });
    }
  };

  return (
    <div className="newPoll">
      {saveQuestionResult.isSuccess ? (
        <h3 className="poll-create-success" data-testid="successMsg">
          Successfully created poll
        </h3>
      ) : (
        <></>
      )}

      <h1 className="heading">Would you rather</h1>
      <h2 className="subheading">Create your own poll</h2>

      <div className="poll">
        <input
          value={optionOneText}
          className="option1"
          data-testid="option1-text"
          onChange={(e) => {
            setOptionOneText(e.target.value);
          }}
        />
        <input
          value={optionTwoText}
          className="option2"
          data-testid="option2-text"
          onChange={(e) => {
            setOptionTwoText(e.target.value);
          }}
        />

        <button data-testid="submitBtn" onClick={createPoll}>
          Create
        </button>
      </div>
    </div>
  );
}

export default NewPoll;
