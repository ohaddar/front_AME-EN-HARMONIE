import { User } from "./classes/User";

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
export interface Contact {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  objet: string;
  sujet: string;
}
export interface Feedback {
  id?: number;
  title: string;
  content: string;
  rating: number;
  image?: string;
  publicationDate?: Date;
  user?: User;
  imageUrl?: string;
}
export interface Blog {
  id?: number;
  title: string;
  content: string;
  creationDate?: Date;
  category?: string;
  image?: string;
  imageUrl?: string;
}
export interface MenuItemLinkProps {
  name: string;
  path: string;
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
  rating: number;
  content: string;
  file: File | null;
  setTitle: (title: string) => void;
  setRating: (rating: number) => void;
  setContent: (content: string) => void;
  setFile: (file: File | null) => void;
  posts: FeedbackType[];
  setPosts: React.Dispatch<React.SetStateAction<FeedbackType[]>>;
  addPost: (post: FeedbackType) => void;
}
export interface AuthContextType {
  isUserAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  currentUser: User | null;

  setAuthStatus: (role: "user" | "admin", authStatus: boolean) => void;
  blog: () => void;
  feedback: () => void;
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
  setTitle: (title: string) => void;
  setCategory: (category: string) => void;
  setContent: (content: string) => void;
  setFile: (file: File | null) => void;
  posts: BlogType[];
  setPosts: React.Dispatch<React.SetStateAction<BlogType[]>>;
  addPost: (post: BlogType) => void;
}
export interface Error {
  statusText?: string;
  message?: string;
}
