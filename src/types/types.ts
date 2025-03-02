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
    firstname: string;
    lastname: string;
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
  imageBlob?: string;
  imageUrl?: string;
}
export interface MenuItemLinkProps {
  name: string;
  path: string;
  className?: string;
  onClick?: () => void;
}

export interface AuthContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  errorMessage: string;
  successMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
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

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  firstname: string;
  lastname: string;
  avatar: string;
}

export interface User extends UserRegister {
  id?: number;
  role: string;
  token?: string;
}
export interface TestResult {
  datetime: string;
  description: string;
}
