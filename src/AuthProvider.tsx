import { createContext, useEffect, useState, type ReactNode } from "react";
import { USERS, type IUser } from "@/TestConsts";
import Modal from "./components/Modal";

interface IForm {
  email: string;
  password: string;
}

interface IModal {
  isOpen: boolean;
  message: string;
}

interface IAuthContext {
  userId: string;
  signIn: (formData: IForm) => void;
  signUp: (formData: IForm) => void;
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

const modalInitial = {
  isOpen: false,
  message: "",
};

function AuthProvider({ children }: AuthProviderProps) {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [modal, setModal] = useState<IModal>(modalInitial);

  useEffect(() => {
    const currentUserId = localStorage.getItem("userId");

    if (!currentUserId) {
      console.log("userId not in LS");
      setIsLoading(false);
      return;
    }
    const userExists = USERS.some((user) => user.userId === currentUserId);

    if (userExists) {
      showModal({ isOpen: true, message: "Signed in successfully" });
      setUserId(currentUserId);
    } else {
      showModal({ isOpen: true, message: "User not found" });
      localStorage.removeItem("userId");
    }

    setIsLoading(false);
  }, []);

  const signIn = async (form: IForm) => {
    setIsLoading(true);
    setModal(modalInitial);

    const userExists: IUser = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(USERS.filter((user) => user.email === form.email)[0]);
      }, 5000);
    });

    if (userExists) {
      showModal({ isOpen: true, message: "Signed in successfully" });
      setUserId(userExists.userId);
      localStorage.setItem("userId", userExists.userId);
    } else {
      showModal({ isOpen: true, message: "User not found" });
      console.error("User not found");
    }
    setIsLoading(false);
  };

  function showModal(modal: IModal) {
    setModal(modal);
    setTimeout(() => setModal(modalInitial), 2000);
  }

  const signUp = (form: IForm) => {
    const userExists = USERS.filter((user) => user.email === form.email)[0];
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

  return (
    <AuthContext.Provider value={{ userId, signIn, signUp, logOut }}>
      {isLoading && <Modal isOpen={modal.isOpen}>In process</Modal>}
      <Modal isOpen={modal.isOpen}>{modal.message}</Modal>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
