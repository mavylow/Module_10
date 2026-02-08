import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./style.css";
import CrossIcon from "@assets/CrossIcon";

type ModalProps = {
  message: string;
  status: "error" | "warning" | "success";
};

function Modal({ message, status }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRoot = document.getElementById("modal");

  if (!modalRoot) {
    return null;
  }

  useEffect(() => {
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 3000);
  }, [message]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return createPortal(
    <div
      className={`modal ${isOpen ? "modal--open" : "modal--close"} ${status}`}
    >
      <span> {message}</span>
      <button className="close-modal" onClick={handleCloseModal}>
        <CrossIcon />
      </button>
    </div>,
    modalRoot
  );
}

export default Modal;
