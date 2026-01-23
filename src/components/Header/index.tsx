import { Sidekick } from "../../assets/Sidekick";
import { Logo } from "../../assets/Logo";
import "./Header.css";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../AuthProvider";
import { USERS } from "../../TestConsts";

function Header() {
  const { userId } = useContext(AuthContext);

  const user = useMemo(
    () => USERS.filter((user) => user.userId === userId)[0],
    [userId]
  );

  return (
    <>
      <header>
        <div className="logo">
          <Logo />
          <Sidekick />
        </div>
        {userId ? (
          <nav className="desktop-nav">
            <img src={user.profilePhoto} className="avatar" />
            <a>{user.username}</a>
          </nav>
        ) : (
          <nav className="desktop-nav">
            <a>Sing In</a>
            <a>Sing Up</a>
          </nav>
        )}
      </header>
    </>
  );
}

export default Header;
