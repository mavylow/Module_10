import SidekickLogoText from "@/assets/SidekickLogoText";
import SidekickLogo from "@/assets/SidekickLogo";
import "./style.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/AuthProvider";
import Hamburger from "@/assets/HamburgerMenuIcon";
import { useNavigate } from "react-router";

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  let navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
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

  const handleNavigate = (url: string) => {
    navigate(url);
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
        <div className="logo" onClick={() => handleNavigate("/home")}>
          <SidekickLogo />
          <SidekickLogoText />
        </div>
        {user ? (
          <nav
            className={isMobile && isExpanded ? "mobile-nav" : "desktop-nav"}
          >
            {isExpanded ? (
              <>
                <a onClick={() => handleNavigate("/profile-info")}>
                  Profile info
                </a>
                <a>Statistics</a>
              </>
            ) : (
              <>
                {" "}
                <img
                  src={
                    user.profileImage ||
                    "../../../public/image/default-avatar.webp"
                  }
                  className="avatar"
                />
                <a onClick={() => handleNavigate("/profile-info")}>
                  {user.firstName} {user.secondName}
                </a>
              </>
            )}
          </nav>
        ) : (
          <nav
            className={isMobile && isExpanded ? "mobile-nav" : "desktop-nav"}
          >
            <a onClick={() => handleNavigate("/signin")}>Sing In</a>
            <a onClick={() => handleNavigate("/signup")}>Sing Up</a>
          </nav>
        )}

        <button className="hamburger-menu" onClick={handleChangeMenuExpanded}>
          {user && isExpanded ? (
            <img
              src={
                user?.profileImage ||
                "../../../public/image/default-avatar.webp"
              }
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
