import responses from "../utils/data.json";

export default class BotService {
  public getBotResponse = (input: string): Promise<string> => {
    return new Promise((resolve) => {
      const clarifyingResponses = responses.clarifyingQuestions
        .map((clarifying) => `${clarifying.question} ${clarifying.response}`)
        .join(" ");

      let response =
        responses.defaultResponse.replace("{input}", input) +
        " " +
        clarifyingResponses;

      //setTimeout to simulate bot's response time
      const nbSeconds = Math.floor(Math.random() * 2) + 1;
      setTimeout(() => {
        const lowerInput = input.toLowerCase();

        // Check for follow-up keywords in responses
        for (const question of responses.questions) {
          const followUpMatch = question.followUpQuestion?.keywords?.some(
            (keyword: string) => lowerInput.includes(keyword.toLowerCase()),
          );
          if (followUpMatch) {
            response = question.followUpQuestion.response;
            break;
          }
        }

        // Check for a matching response
        const foundResponse = responses.questions.find((q) =>
          q.keywords.some((keyword: string) =>
            lowerInput.includes(keyword.toLowerCase()),
          ),
        );

        if (foundResponse) {
          const followUpSuggestions =
            foundResponse.followUpQuestion?.question || "";
          response = `${foundResponse.response}\n\n${followUpSuggestions}`;
        }

        resolve(response);
      }, nbSeconds * 1000);
    });
  };
}
