import { Questionnaire, Question } from "../types/types";
import axios from "axios";

export default class QuestionService {
  private questionnaire: Questionnaire | null = null;

  public async loadQuestionnaire(): Promise<Questionnaire> {
    try {
      const response = await axios.get<Questionnaire>(
        "http://localhost:8080/questionnaire/show",
      );
      this.questionnaire = response.data;
      return this.questionnaire;
    } catch (error) {
      throw new Error("Failed to load questionnaire data.");
    }
  }
  public getQuestionById(id: string): Question | undefined {
    if (!this.questionnaire) {
      throw new Error("Questionnaire not loaded.");
    }

    return this.questionnaire?.questions?.find((q) => q.id === id);
  }

  public getNextQuestionById(
    id: string,
    answer: string,
  ): Question | string | undefined {
    const currentQuestion = this.getQuestionById(id);
    if (!currentQuestion) {
      throw new Error(`Question with ID ${id} not found.`);
    }

    const nextId =
      currentQuestion.next[answer] || currentQuestion.next["default"];
    if (!nextId) {
      throw new Error(`No next question available for answer: ${answer}`);
    }

    return this.getQuestionById(nextId) || this.questionnaire?.results[nextId];
  }
}
