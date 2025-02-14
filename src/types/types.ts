import { User } from "./classes/User";

export interface UserSignUp {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar: string;
}
export interface NextStep {
  [key: string]: string;
}

export interface Question {
  id: string;
  text: string;
  responses: string[];
  next: NextStep;
}
export interface Result {
  id?: number;
  description: string;
  datetime: string;
  user: {
    id: number | undefined;
  };
  questionnaireId: string | null;
}
export interface Messages {
  [key: string]: string;
}

export interface Questionnaire {
  id: string;
  questions: Question[];
  results: Messages;
  defaultMessage: string;
}

export interface Feedback {
  id?: number;
  title: string;
  content: string;
  publicationDate?: Date;
  user?: User;
}
export interface Blog {
  id?: number;
  title: string;
  content: string;
  creationDate?: Date;
  category?: string;
  image?: File;
  imageUrl?: string;
}
export interface MenuItemLinkProps {
  name: string;
  path: string;
  className?: string;
  onClick?: () => void;
}

export interface FeedbackType {
  _id: string;
  title: string;
  content: string;
  rating: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface FeedbackContextProps {
  title: string;

  content: string;
  warningMessage: string;
  successMessage: string;
  createNewFeedback: () => Promise<void>;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setWarningMessage: React.Dispatch<React.SetStateAction<string>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
}
export interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  errorMessage: string;
  successMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    avatar: string,
  ) => Promise<void>;
  signOut: () => void;
}
export interface BlogType {
  _id: string;
  title: string;
  category: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogContextProps {
  title: string;
  category: string;
  content: string;
  file: File | null;
  warningMessage: string;
  successMessage: string;
  setTitle: (title: string) => void;
  setCategory: (category: string) => void;
  setContent: (content: string) => void;
  setFile: (file: File | null) => void;
  setWarningMessage: React.Dispatch<React.SetStateAction<string>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;

  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateForm: () => boolean;
  createNewPost: () => Promise<void>;
  fetchBlogDetails: (blogId: string) => Promise<void>;
  updatePost: (blogId: string) => Promise<void>;
}
export interface Error {
  statusText?: string;
  message?: string;
}
export interface useremailAndPassword {
  email: string;
  password: string;
}
export interface blogData {
  title: string;
  category: string;
  content: string;
  imageUrl: File | null;
}
