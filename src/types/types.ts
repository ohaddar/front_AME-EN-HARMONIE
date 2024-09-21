// types.ts
export interface NextStep {
  [key: string]: string;
}

export interface Question {
  id: string;
  text: string;
  responses: string[];
  next: NextStep;
}

export interface Messages {
  [key: string]: string;
}

export interface Questionnaire {
  questions: Question[];
  results: Messages;
  defaultMessage: string;
}
