import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface IPortalProps {
  children: ReactNode;
}

function Portal({ children }: IPortalProps) {
  const modalRoot = document.getElementById("modal");

  if (!modalRoot) {
    return null;
  }

  return createPortal(<>{children}</>, modalRoot);
}

export default Portal;
