import Modal from "@/components/Modal";
import type { RootState } from "@/store";
import {
  createContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useSelector } from "react-redux";

interface IPopUpContext {
  isOpen: boolean;
  handleCloseModal: () => void;
}

export const PopUpContext = createContext<IPopUpContext>({
  isOpen: false,
  handleCloseModal: () => {},
});

interface IPopUpProvider {
  children: ReactNode;
}

function PopUpProvider({ children }: IPopUpProvider) {
  const [isOpen, setIsOpen] = useState(false);

  const modal = useSelector((state: RootState) => state.modal);

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (modal.message) {
      handleShowModal();
    }
  }, [modal]);

  const handleShowModal = () => {
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
    <PopUpContext.Provider value={{ isOpen, handleCloseModal }}>
      {children}
      <Modal {...modal} />
    </PopUpContext.Provider>
  );
}
export default PopUpProvider;
