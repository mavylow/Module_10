import SidekickLogoText from "@/assets/SidekickLogoText";
import SidekickLogo from "@/assets/SidekickLogo";
import "./style.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/AuthProvider";
import { type IUser, USERS } from "@/TestConsts";
import Hamburger from "@/assets/HamburgerMenuIcon";

const initialUser: IUser = {
  userId: "",
  profilePhoto: "",
  username: "",
  email: "",
  description: "",
};

function Header() {
  const [user, setUser] = useState<IUser>(initialUser);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    if (userId) {
      setUser(USERS.filter((user) => user.userId === userId)[0]);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      console.log("mobile");
    } else {
      setIsMobile(false);
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add("nav-expanded");
    } else {
      document.body.classList.remove("nav-expanded");
    }

    return () => {
      document.body.classList.remove("nav-expanded");
    };
  }, [isExpanded]);

  const handleChangeMenuExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <header
        className={
          (isMobile ? "mobile" : "desktop") +
          " " +
          (isExpanded ? "expanded" : "")
        }
      >
        <div className="logo">
          <SidekickLogo />
          <SidekickLogoText />
        </div>
        {userId ? (
          <nav
            className={isMobile && isExpanded ? "mobile-nav" : "desktop-nav"}
          >
            {isExpanded ? (
              <>
                <a>Profile info</a>
                <a>Statistics</a>
              </>
            ) : (
              <>
                {" "}
                <img
                  src={user.profilePhoto || "../../../public/IMG_1001.jpg"}
                  className="avatar"
                />
                <a>{user.username}</a>
              </>
            )}
          </nav>
        ) : (
          <nav
            className={isMobile && isExpanded ? "mobile-nav" : "desktop-nav"}
          >
            <a>Sing In</a>
            <a>Sing Up</a>
          </nav>
        )}

        <button className="hamburger-menu" onClick={handleChangeMenuExpanded}>
          {userId && isExpanded ? (
            <img
              src={user.profilePhoto || "../../../public/IMG_1001.jpg"}
              className="avatar"
            />
          ) : (
            <Hamburger />
          )}
        </button>
      </header>
      {isMobile && isExpanded && (
        <div className="overlay" onClick={handleChangeMenuExpanded}>
          {" "}
        </div>
      )}
    </>
  );
}

export default Header;
