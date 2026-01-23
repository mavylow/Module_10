import { useContext, useEffect, useMemo, useState } from "react";
import "./Menu.css";
import { Logo } from "../../assets/Logo";
import { Sidekick } from "../../assets/Sidekick";
import { AuthContext } from "../../AuthProvider";
import { USERS } from "../../TestConsts";

function Menu() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { userId } = useContext(AuthContext);

  const user = useMemo(
    () => USERS.filter((user) => user.userId === userId)[0],
    [userId]
  );

  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isExpanded]);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 500) {
      document.body.classList.remove("menu-open");
    }
  });

  return (
    <>
      <button
        className={`burger-button`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {userId && isExpanded ? (
          <img src={user.profilePhoto} className="avatar" />
        ) : (
          "☰"
        )}
      </button>
      <aside className="menu">
        <div className="menu-header">
          <div className="logo" onClick={() => setIsExpanded(!isExpanded)}>
            <Logo />
            <Sidekick />
          </div>
        </div>

        <nav className={`mobile-nav ${isExpanded ? "expanded" : ""}`}>
          {userId ? (
            <>
              <a>Profile info</a>
              <a>Statistics</a>
            </>
          ) : (
            <>
              <a>Sing In</a>
              <a>Sing Up</a>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}

export default Menu;
