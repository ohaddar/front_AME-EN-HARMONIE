import React, { ReactNode, createContext, useContext, useState } from "react";
import { BlogContextProps, BlogType } from "../types/types";

const CreateBlogContext = createContext<BlogContextProps | undefined>(
  undefined
);

export const useCreateBlogContext = () => {
  const context = useContext(CreateBlogContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(""); // Renamed to match backend "category"
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [posts, setPosts] = useState<BlogType[]>([]);

  const addPost = (post: BlogType) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  return (
    <CreateBlogContext.Provider
      value={{
        title,
        category,
        content,
        file,
        posts,
        setTitle,
        setCategory,
        setContent,
        setFile,
        addPost,
        setPosts,
      }}
    >
      {children}
    </CreateBlogContext.Provider>
  );
};
