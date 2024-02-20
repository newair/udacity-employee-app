import { _saveQuestionAnswer, _saveQuestion } from "../src/_DATA";

describe("Testing data file", () => {
  describe("test _saveQuestion", () => {
    it("test _saveQuestion success", async () => {
      const author = "sarahedo";
      const optionOneText = "option1";
      const optionTwoText = "option2";

      const input = { optionOneText, optionTwoText, author };
      const result = await _saveQuestion(input);

      expect(result.author).toBe(author);
      expect(result.optionOne.text).toBe(optionOneText);
      expect(result.optionTwo.text).toBe(optionTwoText);
    });

    it("test _saveQuestion fail", async () => {
      const input = {
        optionOneText: null,
        optionTwoText: "option2",
        author: "author",
      };

      try {
        await _saveQuestion(input);
        fail("should throw error");
      } catch (error) {
        expect(error).toBe(
          "Please provide optionOneText, optionTwoText, and author"
        );
      }
    });
  });

  describe("test _saveQuestion", () => {
    it("test _saveQuestionAnswer success", async () => {
      const input = {
        authedUser: "sarahedo",
        qid: "8xf0y6ziyjabvozdd253nd",
        answer: "optionOne",
      };
      const result = await _saveQuestionAnswer(input);

      expect(result).toBe(true);
    });

    it("test _saveQuestionAnswer fail", async () => {
      const input = {
        authedUser: null,
        qid: "8xf0y6ziyjabvozdd253nd",
        answer: "optionOne",
      };

      try {
        await _saveQuestionAnswer(input);
        fail("should throw error");
      } catch (error) {
        expect(error).toBe("Please provide authedUser, qid, and answer");
      }
    });
  });
});
