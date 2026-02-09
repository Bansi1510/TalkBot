import React, { createContext, useEffect, useState } from "react";
import type { User, UserContextType, UserProviderProps } from "../types";
import { askToAssistantAPI, getUserAPI } from "../../APIs/user.api";

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [assistantName, setAssistantName] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserAPI();

      if (res) {
        setUser(res);

      }
      setLoading(false)
    };
    fetchUser();
  }, []);

  const askToAssistant = async (command: string) => {

    const res = await askToAssistantAPI(command);

    if (!res) {
      return null;
    }
    return res;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated: !!user,
        selectedImage,
        setSelectedImage,
        assistantName,
        setAssistantName,
        uploadedFile,
        setUploadedFile,
        askToAssistant

      }}
    >
      {children}
    </UserContext.Provider>
  );
};
