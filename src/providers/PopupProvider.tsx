import Modal from "@/components/Modal";
import { createContext, useRef, useState, type ReactNode } from "react";

interface IPopUpContext {
  isOpen: boolean;
  handleShowModal: (newModal: IModal) => void;
  handleCloseModal: () => void;
}

interface IModal {
  message: string;
  status: "error" | "warning" | "success";
}

export const PopUpContext = createContext<IPopUpContext>({
  isOpen: false,
  handleShowModal: () => {},
  handleCloseModal: () => {},
});

interface IPopUpProvider {
  children: ReactNode;
}

function PopUpProvider({ children }: IPopUpProvider) {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState<IModal>({
    message: "",
    status: "success",
  });

  const timeoutRef = useRef<number | null>(null);

  const handleShowModal = (newModal: IModal) => {
    setModal(newModal);
    setIsOpen(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <PopUpContext.Provider
      value={{ isOpen, handleShowModal, handleCloseModal }}
    >
      {children}
      <Modal {...modal} />
    </PopUpContext.Provider>
  );
}
export default PopUpProvider;
