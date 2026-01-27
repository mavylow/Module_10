import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import "./style.css";

type ModalProps = {
  children?: ReactNode;
  isOpen: boolean;
};

function Modal({ children, isOpen }: ModalProps) {
  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;

  return createPortal(
    <div className={`modal ${isOpen ? "modal--open" : "modal--close"}`}>
      {children}
    </div>,
    modalRoot
  );
}

export default Modal;
