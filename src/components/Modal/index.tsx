import { useContext } from "react";

import "./style.css";
import CrossIcon from "@assets/CrossIcon";
import { PopUpContext } from "@/providers/PopupProvider";
import Portal from "@components/Portal";
import Button from "@components/Button";

export type ModalProps = {
  message: string;
  status: modalStatus;
};

export type modalStatus = "success" | "error" | "warning";

function Modal({ message, status }: ModalProps) {
  const { isOpen, handleCloseModal } = useContext(PopUpContext);

  return (
    <Portal>
      <div
        data-testid="modal-message"
        className={`modal ${isOpen ? "modal--open" : "modal--close"} ${status}`}
      >
        <span> {message}</span>
        <Button
          Icon={CrossIcon}
          type="button"
          onButtonClick={handleCloseModal}
        />
      </div>
    </Portal>
  );
}

export default Modal;
