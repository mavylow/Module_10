import { createContext, useEffect, useState, type ReactNode } from "react";
import { type IUser } from "@/TestConsts";
import { useNavigate } from "react-router";
import Modal from "./components/Modal";
import { fetchData } from "./apiUtil";

interface IForm {
  email: string;
  password: string;
}

interface IModal {
  isOpen: boolean;
  message: string;
}

interface IAuthContext {
  user: IUser | null;
  signIn: (formData: IForm) => void;
  signUp: (formData: IForm) => void;
  logOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
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
  const [user, setUser] = useState(null);
  let navigate = useNavigate();
  const [modal, setModal] = useState<IModal>(modalInitial);

  useEffect(() => {
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    try {
      const user = await fetchData("/api/me", "GET");

      if (user) {
        showModal("Signed in successfully");
        setUser(user);
        navigate("/home");
      } else {
        showModal("User not found");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      showModal("Authentication failed");
      localStorage.removeItem("token");
    }
  };

  const signIn = async (form: IForm) => {
    setModal(modalInitial);
    try {
      const { token, user } = await fetchData("/api/login", "POST", {
        email: form.email,
        password: form.password,
      });
      if (user) {
        showModal("Signed in successfully");
        setUser(user);
        localStorage.setItem("token", token);
        navigate("/home");
      }
    } catch {
      showModal("User not found");
    }
  };

  function showModal(message: string) {
    setModal({ isOpen: true, message });
    setTimeout(() => setModal({ isOpen: false, message }), 2000);
  }

  const signUp = async (form: IForm) => {
    const { message } = await fetchData("/api/signup", "POST", {
      email: form.email,
      password: form.password,
    });
    if (message) {
      showModal(message);
      navigate("/home");
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, logOut }}>
      <Modal isOpen={modal.isOpen}>{modal.message}</Modal>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
