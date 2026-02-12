import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type IProfileForm, type IUser } from "@/interfaces";
import { useLocation, useNavigate } from "react-router";
import { fetchData } from "@utils/apiUtil";
import { PopUpContext } from "./PopupProvider";

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

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleShowModal } = useContext(PopUpContext);

  useEffect(() => {
    checkCurrentUser();
  }, []);

  useEffect(() => {
    const protectedRoutes = ["/profile"];
    if (!loading && !user && protectedRoutes.includes(location.pathname)) {
      navigate("/");
    }
  }, [user, location, loading]);

  const checkCurrentUser = async () => {
    try {
      setLoading(true);
      const user = await fetchData("/api/me", "GET");

      if (user) {
        handleShowModal({
          message: "Signed in successfully",
          status: "success",
        });
        setUser(user);
        setLoading(false);
      } else {
        navigate("/");
        handleShowModal({ message: "User not found", status: "warning" });
        localStorage.removeItem("token");
        setLoading(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      handleShowModal({ message: "Authentication failed", status: "error" });
      localStorage.removeItem("token");
      setLoading(false);
    }
  };

  const signIn = async (form: IForm) => {
    try {
      const { token, user } = await fetchData("/api/login", "POST", {
        email: form.email,
        password: form.password,
      });

      if (user) {
        handleShowModal({
          message: "Signed in successfully",
          status: "success",
        });
        setUser(user);
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch {
      handleShowModal({ message: "Authentication failed", status: "error" });
    }
  };

  const signUp = async (form: IForm) => {
    const { message } = await fetchData("/api/signup", "POST", {
      email: form.email,
      password: form.password,
    });
    if (message) {
      handleShowModal({ message, status: "warning" });
      navigate("/");
    }
  };

  const updateUser = async (updatedUser: IProfileForm) => {
    const newUser = await fetchData("/api/profile", "PUT", updatedUser);
    if (newUser) {
      handleShowModal({
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
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
