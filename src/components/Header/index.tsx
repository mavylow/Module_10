import { Sidekick } from "../../assets/Sidekick";
import { Logo } from "../../assets/Logo";
import "./Header.css";

function Header() {
  return (
    <>
      <header>
        <div className="logo">
          <Logo />
          <Sidekick />
        </div>
        {true ? (
          <nav className="desktop-nav">
            <img src="../../../public/IMG_1001.jpg" className="avatar" />
            <a>Name Surname</a>
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
