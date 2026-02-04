import React, { createContext, useEffect, useState } from "react";
import type { User, UserContextType, UserProviderProps } from "../types";
import { getUserAPI } from "../../APIs/user.api";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserAPI();
      console.log(res)
      if (res) {
        setUser(res);
        navigate("/customize")
      }
      setLoading(false)
    };
    fetchUser();
  }, []);


  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated: !!user,
        selectedImage,
        setSelectedImage

      }}
    >
      {children}
    </UserContext.Provider>
  );
};
