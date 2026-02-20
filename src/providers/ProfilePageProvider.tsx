import type { TProfilePages } from "@/interfaces";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface IProfilePageContext {
  profilePage: TProfilePages;
  changePage: (page: TProfilePages) => void;
}
export const ProfilePageContext = createContext<IProfilePageContext>({
  profilePage: "info",
  changePage: () => {},
});

interface ProfilePageProvider {
  children: ReactNode;
}

function ProfilePageProvider({ children }: ProfilePageProvider) {
  const [profilePage, setProfilePage] = useState<TProfilePages>("info");
  const [loading, setLoading] = useState(true);

  const changePage = (page: TProfilePages) => {
    localStorage.setItem("profile", page);
    setProfilePage(page);
  };

  useEffect(() => {
    const currentProfilePage = localStorage.getItem("profile");
    if (!currentProfilePage) {
      localStorage.setItem("profile", profilePage);
      setLoading(false);
    } else {
      setProfilePage(currentProfilePage as TProfilePages);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ProfilePageContext.Provider value={{ profilePage, changePage }}>
      {children}
    </ProfilePageContext.Provider>
  );
}

export default ProfilePageProvider;
