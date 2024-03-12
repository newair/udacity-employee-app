import { _saveQuestionAnswer, _saveQuestion, _login, _getUsers, _getQuestions } from "../_DATA";

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

    it("test _saveQuestion fail for option1 null", async () => {
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

    it("test _saveQuestion fail for option2 null", async () => {
      const input = {
        optionOneText: "option1",
        optionTwoText: null,
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

  describe("test _saveQuestionAnswer", () => {
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

  describe("test _login", () => {
    it("test _login success", async () => {

      const userId = "sarahedo";
      const input = {
        userName: userId,
        password: "password123",
      };
      const result = await _login(input);

      expect(result.id).toBe(userId);
    });

    it("test _login fail for invalid password", async () => {

      const userId = "sarahedo";
      const input = {
        userName: userId,
        password: "password1234",
      };
      const result = await _login(input);

     expect(result).toBe(undefined);
    });

    it("test _login fail for invalid username", async () => {

      const userId = "sarahedoInvalid";
      const input = {
        userName: userId,
        password: "password123",
      };
      const result = await _login(input);

     expect(result).toBe(undefined);
    });
  });

  describe("test _getUsers", () => {
    it("test _getUsers success", async () => {

      const result = await _getUsers();
      expect(result).not.toBe(undefined);
    });

  });

  describe("test _getQuestions", () => {
    it("test _getQuestions success", async () => {

      const result = await _getQuestions();
      expect(result).not.toBe(undefined);
    });

  });
});
