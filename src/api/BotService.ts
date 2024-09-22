import { Section, Topic } from "../types/Discussion";
import { botData } from "../utils/constants/botData";
export default class BotService {
  private sections: Section[] | null = null;

  public loadBotData(): void {
    this.sections = botData;
    console.log("botMessages loaded successfully");
  }

  public botTopicSuggestion = (): Topic[] => {
    this.ensureBotDataLoaded();
    return (
      this.sections?.map((section) => ({
        question: section.name,
        code: section.code,
      })) || []
    );
  };

  public getThemes(sectionCode: string): Topic[] {
    const themes =
      this.sections?.find((s) => s.code === sectionCode)?.themes || [];
    return (
      themes?.map((theme) => ({
        question: theme.name,
        code: theme.code,
      })) || []
    );
  }

  // public getThemeResponse(themeCode: string): string | null {
  //   const theme = this.sections?.flatMap(section => section.themes)
  //     .find(t => t.code === themeCode);

  //   return theme ? `Response: ${theme.response}\nMore info: ${theme.link}` : null;
  // }

  public getThemeResponse(themeCode: string): string | null {
    for (const section of this.sections || []) {
      const theme = section.themes.find((t) => t.code === themeCode);
      if (theme) {
        return `Response: ${theme.response}\nMore info: ${theme.link}`;
      }
    }
    return null;
  }

  private ensureBotDataLoaded(): void {
    if (!this.loadBotData) {
      throw new Error("Questionnaire not loaded.");
    }
  }
}
