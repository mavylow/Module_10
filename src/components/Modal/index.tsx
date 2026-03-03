import { useContext } from "react";

import "./style.css";
import CrossIcon from "@assets/CrossIcon";
import { PopUpContext } from "@/providers/PopupProvider";
import Portal from "@components/Portal";
import Button from "@components/Button";
import type { IModal } from "@/interfaces";
import { useTranslation } from "react-i18next";

function Modal({ message, status }: IModal) {
  const { isOpen, handleCloseModal } = useContext(PopUpContext);
  const { t } = useTranslation();

  return (
    <Portal>
      <div
        data-testid="modal-message"
        className={`modal ${isOpen ? "modal--open" : "modal--close"} ${status}`}
      >
        <span> {t(message)}</span>
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
