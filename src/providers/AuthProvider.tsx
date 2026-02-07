import { createContext, useEffect, useState, type ReactNode } from "react";
import { type IProfileForm, type IUser } from "@/interfaces";
import { useLocation, useNavigate } from "react-router";
import Modal from "../components/Modal";
import { fetchData } from "../utils/apiUtil";

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
  updateUser: (updatedUser: IProfileForm) => void;
  logOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  signIn: () => {},
  signUp: () => {},
  updateUser: () => {},
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
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const location = useLocation();
  const [modal, setModal] = useState<IModal>(modalInitial);

  useEffect(() => {
    checkCurrentUser();
  }, []);

  useEffect(() => {
    console.log(location.pathname);
    const protectedRoutes = [
      "/profile",
      "/profile/info",
      "/profile/statistics",
    ];
    if (!loading && !user && protectedRoutes.includes(location.pathname)) {
      navigate("/home");
    }
  }, [user, location, loading]);

  const checkCurrentUser = async () => {
    try {
      setLoading(true);
      const user = await fetchData("/api/me", "GET");

      if (user) {
        showModal("Signed in successfully");
        setUser(user);
        setLoading(false);
      } else {
        navigate("/home");
        showModal("User not found");
        localStorage.removeItem("token");
        setLoading(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      showModal("Authentication failed");
      localStorage.removeItem("token");
      setLoading(false);
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

  const showModal = (message: string) => {
    setModal({ isOpen: true, message });
    setTimeout(() => setModal({ isOpen: false, message }), 2000);
  };

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

  const updateUser = async (updatedUser: IProfileForm) => {
    const newUser = await fetchData("/api/profile", "PUT", updatedUser);
    if (newUser) {
      showModal("Profile info updated successfully");
    }
    setUser(newUser);
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, logOut, updateUser }}>
      <Modal isOpen={modal.isOpen}>{modal.message}</Modal>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
