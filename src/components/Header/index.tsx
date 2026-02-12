import SidekickLogoText from "@assets/SidekickLogoText";
import SidekickLogo from "@assets/SidekickLogo";
import "./style.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@providers/AuthProvider";
import Hamburger from "@assets/HamburgerMenuIcon";
import { NavLink, useLocation, useNavigate } from "react-router";
import { ProfilePageContext } from "@providers/ProfilePageProvider";

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPageAuth, setIsPageAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { changePage } = useContext(ProfilePageContext);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsExpanded(false);
    if (location.pathname !== "/signin" && location.pathname !== "/signup") {
      setIsPageAuth(true);
    } else {
      setIsPageAuth(false);
    }
    console.log(isPageAuth);
  }, [location]);

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
        <div className="logo" onClick={() => handleNavigate("/")}>
          <SidekickLogo />
          <SidekickLogoText />
        </div>
        {isPageAuth && (
          <>
            {user ? (
              <nav
                className={
                  isMobile && isExpanded ? "mobile-nav" : "desktop-nav"
                }
              >
                {isExpanded ? (
                  <>
                    <NavLink to={"/profile"} onClick={() => changePage("info")}>
                      {" "}
                      Profile info
                    </NavLink>
                    <NavLink
                      to={"/profile"}
                      onClick={() => changePage("statistics")}
                    >
                      {" "}
                      Statistics
                    </NavLink>
                  </>
                ) : (
                  <>
                    <img src={user.profileImage} className="avatar" />
                    <NavLink to={"/profile"}>
                      {user.firstName} {user.secondName}
                    </NavLink>
                  </>
                )}
              </nav>
            ) : (
              <nav
                className={
                  isMobile && isExpanded ? "mobile-nav" : "desktop-nav"
                }
              >
                <NavLink to={"/signin"}>Sing In</NavLink>
                <NavLink to={"/signup"}>Sing Up</NavLink>
              </nav>
            )}
          </>
        )}
        {isPageAuth && (
          <button className="hamburger-menu" onClick={handleChangeMenuExpanded}>
            {user && isExpanded ? (
              <img
                key={user?.profileImage}
                src={user?.profileImage || "/image/default-avatar.webp"}
                className="avatar"
              />
            ) : (
              <Hamburger />
            )}
          </button>
        )}
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
