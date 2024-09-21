import { questionnaireData } from "../utils/constants/questionnaire";
import { Questionnaire, Question } from "../types/types";

export default class QuestionService {
  private questionnaire: Questionnaire | null = null;

  public loadQuestionnaire(): void {
    this.questionnaire = questionnaireData;
    console.log("Questionnaire loaded successfully");
  }

  public getQuestionById(id: string): Question | undefined {
    this.ensureQuestionnaireLoaded();
    return this.questionnaire?.questions.find((q) => q.id === id);
  }

  public getNextQuestionById(
    id: string,
    answer: string
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

    return this.getQuestionById(nextId) || this.questionnaire?.messages[nextId];
  }

  private ensureQuestionnaireLoaded(): void {
    if (!this.questionnaire) {
      throw new Error("Questionnaire not loaded.");
    }
  }
}
