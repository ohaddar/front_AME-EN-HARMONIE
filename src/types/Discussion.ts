export interface Discussion {
  Messages: Message[];
}

export interface Message {
  Content: string;
  Sender: "User" | "Bot";
  Avatar: string | undefined;
}

export interface Theme {
  code: string;
  name: string;
  response: string;
  link: string;
  relatedThemes: string[];
}

export interface Section {
  code: string;
  name: string;
  themes: Theme[];
}

export type BotData = Section[];

export interface DefaultBotResponses {
  defaultResponse: string;
}
export interface Topic {
  code: string;
  question: string;
}
export interface TopicDetails {
  subCode: string;
  subQuestion: string;
}
