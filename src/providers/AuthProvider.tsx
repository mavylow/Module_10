import { createContext, useEffect, useState, type ReactNode } from "react";
import { type IProfileForm, type IUser } from "@/interfaces";
import { useLocation, useNavigate } from "react-router";
import Modal from "@components/Modal";
import { fetchData } from "@utils/apiUtil";

interface IForm {
  email: string;
  password: string;
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

type modalStatus = "success" | "error" | "warning";

interface IModal {
  message: string;
  status: modalStatus;
}

const modalInitial = {
  message: "",
  status: "success" as modalStatus,
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
        setModal({ message: "Signed in successfully", status: "success" });
        setUser(user);
        setLoading(false);
      } else {
        navigate("/home");
        setModal({ message: "User not found", status: "warning" });
        localStorage.removeItem("token");
        setLoading(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setModal({ message: "Authentication failed", status: "error" });
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
        showModal({ message: "Signed in successfully", status: "success" });
        setUser(user);
        localStorage.setItem("token", token);
        navigate("/home");
      }
    } catch {
      showModal({ message: "Authentication failed", status: "error" });
    }
  };

  const showModal = (modal: IModal) => {
    setModal(modal);
  };

  const signUp = async (form: IForm) => {
    const { message } = await fetchData("/api/signup", "POST", {
      email: form.email,
      password: form.password,
    });
    if (message) {
      showModal(modal);
      navigate("/home");
    }
  };

  const updateUser = async (updatedUser: IProfileForm) => {
    const newUser = await fetchData("/api/profile", "PUT", updatedUser);
    if (newUser) {
      showModal({
        message: "Profile info updated successfully",
        status: "success",
      });
    }
    setUser(newUser);
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, logOut, updateUser }}>
      <Modal {...modal} />
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
