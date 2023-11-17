import "react-responsive-modal/styles.css";
import { ReactNode } from "react";
import { Modal as RModal } from "react-responsive-modal";

type ModalType = {
  open: boolean;
  onClose: () => void;
  children: ReactNode
}

const Modal = (props: ModalType) => {
  const { open, children, onClose } = props;

  return (
    <RModal open={open} onClose={onClose}>
      {children}
    </RModal>
  );
};

export default Modal;