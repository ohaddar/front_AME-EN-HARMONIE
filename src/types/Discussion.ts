export interface Discussion {
  Messages: Message[];
}

export interface Message {
  Content: string;
  Sender: Sender;
}

export interface Sender {
  Name: "User" | "Bot";
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

// Example of the simplified botData type
export type BotData = Section[];

export interface DefaultBotResponses {
  defaultResponse: string;
}
export interface Topic {
  code: string;
  question: string;
}
