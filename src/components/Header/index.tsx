import { Sidekick } from "@assets/Sidekick";
import { Logo } from "@assets/Logo";
import "./style.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "@/AuthProvider";
import { USERS } from "@/TestConsts";
import Hamburger from "@assets/Hamburger";

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { userId } = useContext(AuthContext);

  const user = useMemo(
    () => USERS.filter((user) => user.userId === userId)[0],
    [userId]
  );

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
          <Logo />
          <Sidekick />
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

        <button
          className="hamburger-menu"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
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
        <div className="overlay" onClick={() => setIsExpanded((prev) => !prev)}>
          {" "}
        </div>
      )}
    </>
  );
}

export default Header;
