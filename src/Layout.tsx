import type { ReactNode } from "react";
import { Logo } from "./assets/Logo";
import { Sidekick } from "./assets/Sidekick";

interface ILayout {
  children?: ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <>
      <header>
        <Logo />
        <Sidekick theme="night" />
      </header>
      <main>{children}</main>
      <footer>
        <p role="contentinfo">
          © <time dateTime="2026">2026</time> sidekick
        </p>
      </footer>
    </>
  );
}
