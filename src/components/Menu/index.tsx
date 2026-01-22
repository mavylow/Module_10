import { useEffect, useState } from "react";
import "./Menu.css";
import { Logo } from "../../assets/Logo";
import { Sidekick } from "../../assets/Sidekick";

function Menu() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAuth, setIsAuth] = useState(true);

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

  return (
    <>
      <button
        className={`burger-button`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isAuth && isExpanded ? (
          <img src="../../../public/IMG_1001.jpg" className="avatar" />
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
          {isAuth ? (
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
