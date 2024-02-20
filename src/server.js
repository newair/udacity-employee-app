// src/server.js
import { createServer } from "miragejs"
import { _getQuestions, _getUsers, _login, _saveQuestion, _saveQuestionAnswer } from "./_DATA.js"

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    routes() {

      this.get("users", async () => {
        const users = await _getUsers();
        return users;
      });

      this.get("auth", async () => {
        const users = await _getUsers();
        return users;
      });

      this.get("questions", async () => {
        console.log('called questions');

        let questions = [];
        try {
           questions = await _getQuestions();
        } catch(e) {

          console.log('error', e);
        }
        console.log('called questions finished', {questions});

        return questions;
      })

      this.post("login", async (schema, request) => {
        const user = await _login(JSON.parse(request.requestBody));
        return user;
      })

      this.post("questionanswer", async (schema, request) => {
        const questions = await _saveQuestionAnswer(JSON.parse(request.requestBody));
        return questions;
      })

      this.post("saveQuestion", async (schema, request) => {
        const questions = await _saveQuestion(JSON.parse(request.requestBody));
        return questions;
      })

    },
  })

  return server
}