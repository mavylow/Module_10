import { createContext, useEffect, type ReactNode } from "react";
import { type IProfileForm, type IUser } from "@/interfaces";
import { useLocation, useNavigate } from "react-router";
import { fetchData } from "@utils/apiUtil";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store";
import { restoreAuth, setUser } from "@/slices/authSlice";
import { setModal } from "@/slices/modalSlice";

export interface IAuthContext {
  user: IUser | null;
  updateUser: (updatedUser: IProfileForm) => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  updateUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isLoading: loading } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(restoreAuth());
  }, []);

  useEffect(() => {
    const protectedRoutes = ["/profile"];
    if (!loading && !user && protectedRoutes.includes(location.pathname)) {
      navigate("/");
    }
  }, [user, location.pathname, loading]);

  const updateUser = async (updatedUser: IProfileForm) => {
    const newUser = await fetchData("/api/profile", "PUT", updatedUser);
    if (newUser) {
      dispatch(setUser(newUser));
      dispatch(
        setModal({
          message: "Profile info updated successfully",
          status: "success",
        })
      );
    }
  };

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
