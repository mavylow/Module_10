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
      showModal("Signed in successfully");
      setUserId(currentUserId);
    } else {
      showModal("User not found");
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
      showModal("Signed in successfully");
      setUserId(userExists.userId);
      localStorage.setItem("userId", userExists.userId);
    } else {
      showModal("User not found");
      console.error("User not found");
    }
    setIsLoading(false);
  };

  function showModal(message: string) {
    setModal({ isOpen: true, message });
    setTimeout(() => setModal(modalInitial), 2000);
  }

  const signUp = (form: IForm) => {
    const userExists = USERS.filter((user) => user.email === form.email)[0];
    if (userExists) {
      showModal("This email is already taken");
      console.log("This email is already taken");
    } else {
      const newUser: IUser = {
        userId: `user_${USERS.length + 1}`,
        ...form,
        profilePhoto: "../public/default_avatar.jpg",
        username: form.email.split("@")[0],
      };
      USERS.push(newUser);
      setUserId(newUser.userId);
      localStorage.setItem("userId", newUser.userId);
      console.log("Signed up successfully");
    }
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
