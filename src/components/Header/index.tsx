import type { ReactNode } from "react";
import { Sidekick } from "../../assets/Sidekick";
import { Logo } from "../../assets/Logo";
import "./Header.css";

interface HeaderProps {
  children?: ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <header>
      <Logo />
      <Sidekick />
      {children && <div className="menu">{children}</div>}
    </header>
  );
}

export default Header;
