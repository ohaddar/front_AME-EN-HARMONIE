import axios from "axios";
import QuestionService from "../api/QuestionService";
import { Questionnaire } from "../types/types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("QuestionService", () => {
  let service: QuestionService;

  beforeEach(() => {
    service = new QuestionService();
  });

  describe("loadQuestionnaire", () => {
    it("should fetch and return a questionnaire", async () => {
      const mockQuestionnaire: Questionnaire = {
        id: "123",
        questions: [
          {
            id: "0.1",
            text: "First question?",
            responses: ["Yes", "No"],
            next: { Yes: "0.2", No: "0.3" },
          },
        ],
        results: { "0.2": "Result A", "0.3": "Result B" },
        defaultMessage: "Default result",
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockQuestionnaire });

      const result = await service.loadQuestionnaire();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://localhost:8080/questionnaire/show",
      );
      expect(result).toEqual(mockQuestionnaire);
    });

    it("should throw an error if fetching fails", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

      await expect(service.loadQuestionnaire()).rejects.toThrow(
        "Failed to load questionnaire data.",
      );
    });
  });

  describe("getQuestionById", () => {
    it("should return the correct question by ID", async () => {
      const mockQuestionnaire: Questionnaire = {
        id: "123",
        questions: [
          {
            id: "0.1",
            text: "First question?",
            responses: ["Yes", "No"],
            next: { Yes: "0.2", No: "0.3" },
          },
        ],
        results: {},
        defaultMessage: "",
      };

      service["questionnaire"] = mockQuestionnaire;

      const question = service.getQuestionById("0.1");

      expect(question).toEqual(mockQuestionnaire.questions[0]);
    });

    it("should throw an error if the questionnaire is not loaded", () => {
      expect(() => service.getQuestionById("0.1")).toThrow(
        "Questionnaire not loaded.",
      );
    });

    it("should return undefined if the question ID does not exist", () => {
      service["questionnaire"] = {
        id: "123",
        questions: [],
        results: {},
        defaultMessage: "",
      };

      const question = service.getQuestionById("nonexistent-id");

      expect(question).toBeUndefined();
    });
  });

  describe("getNextQuestionById", () => {
    it("should return the next question based on the answer", async () => {
      const mockQuestionnaire: Questionnaire = {
        id: "123",
        questions: [
          {
            id: "0.1",
            text: "First question?",
            responses: ["Yes", "No"],
            next: { Yes: "0.2", No: "0.3" },
          },
          {
            id: "0.2",
            text: "Second question?",
            responses: ["A", "B"],
            next: {},
          },
        ],
        results: {},
        defaultMessage: "",
      };

      service["questionnaire"] = mockQuestionnaire;

      const nextQuestion = service.getNextQuestionById("0.1", "Yes");

      expect(nextQuestion).toEqual(mockQuestionnaire.questions[1]);
    });

    it("should return a result message if the next ID points to a result", () => {
      const mockQuestionnaire: Questionnaire = {
        id: "123",
        questions: [
          {
            id: "0.1",
            text: "First question?",
            responses: ["Yes", "No"],
            next: { Yes: "result-id", No: "0.3" },
          },
        ],
        results: { "result-id": "You finished the questionnaire!" },
        defaultMessage: "",
      };

      service["questionnaire"] = mockQuestionnaire;

      const resultMessage = service.getNextQuestionById("0.1", "Yes");

      expect(resultMessage).toBe("You finished the questionnaire!");
    });

    it("should throw an error if the current question is not found", () => {
      const mockQuestionnaire: Questionnaire = {
        id: "123",
        questions: [],
        results: {},
        defaultMessage: "",
      };

      service["questionnaire"] = mockQuestionnaire;

      expect(() =>
        service.getNextQuestionById("nonexistent-id", "Yes"),
      ).toThrow("Question with ID nonexistent-id not found.");
    });

    it("should throw an error if no next question or result is available", () => {
      const mockQuestionnaire: Questionnaire = {
        id: "123",
        questions: [
          { id: "0.1", text: "First question?", responses: ["Yes"], next: {} },
        ],
        results: {},
        defaultMessage: "",
      };

      service["questionnaire"] = mockQuestionnaire;

      expect(() => service.getNextQuestionById("0.1", "Yes")).toThrow(
        "No next question available for answer: Yes",
      );
    });
  });
});
