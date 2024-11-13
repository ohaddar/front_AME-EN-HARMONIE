import React, { ReactNode, createContext, useContext, useState } from "react";
import { FeedbackContextProps, FeedbackType } from "../../types/types";

const CreateFeedbackContext = createContext<FeedbackContextProps | undefined>(
  undefined
);

export const useCreateFeedbackContext = () => {
  const context = useContext(CreateFeedbackContext);
  if (!context) {
    throw new Error(
      "useCreateFeedbackContext must be used within a FeedbackProvider"
    );
  }
  return context;
};

interface FeedbackProviderProps {
  children: ReactNode;
}

export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({
  children,
}) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState<number>(0); // Set rating as a number to match backend
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [posts, setPosts] = useState<FeedbackType[]>([]);

  const addPost = (post: FeedbackType) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  return (
    <CreateFeedbackContext.Provider
      value={{
        title,
        rating,
        content,
        file,
        posts,
        setTitle,
        setRating,
        setContent,
        setFile,
        addPost,
        setPosts,
      }}
    >
      {children}
    </CreateFeedbackContext.Provider>
  );
};
