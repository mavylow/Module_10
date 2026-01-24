import { createContext, useEffect, useState, type ReactNode } from "react";
import { USERS } from "./TestConsts";

interface IAuthContext {
  userId: string;
  signIn: (userId: string) => void;
  signUp: (userId: string) => void;
  logOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  userId: "",
  signIn: () => {},
  signUp: () => {},
  logOut: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUserId = localStorage.getItem("userId");

    if (!currentUserId) {
      console.log("userId not in LS");
      setIsLoading(false);
      return;
    }
    const userExists = USERS.some((user) => user.userId === currentUserId);

    if (userExists) {
      console.log("User found, signing in");
      setUserId(currentUserId);
    } else {
      console.log("User not found in USERS, clearing LS");
      localStorage.removeItem("userId");
    }

    setIsLoading(false);
  }, []);

  //   window.addEventListener("storage", (e) => {
  //     if (e.key === "userId") {
  //       if (e.newValue === "") {
  //         logOut();
  //       }
  //     }
  //   });

  const signIn = (email: string) => {
    const userExists = USERS.filter((user) => user.email === email)[0];

    if (userExists) {
      setUserId(userExists.userId);
      localStorage.setItem("userId", userExists.userId);
      console.log("Signed in successfully");
    } else {
      console.error("User not found");
    }
  };

  const signUp = (email: string) => {
    const userExists = USERS.filter((user) => user.email === email)[0];
    //логика на добавление
    setUserId(userId);
    localStorage.setItem("userId", userExists.userId);
    console.log("Signed up successfully");
  };

  const logOut = () => {
    setUserId("");
    localStorage.removeItem("userId");
    console.log("Logged out");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ userId, signIn, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
