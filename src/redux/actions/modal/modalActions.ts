import { CSSProperties, ReactNode } from "react";
import { CLOSE_MODAL, OPEN_AND_SET_MODAL_CONTENT } from "../constants";

interface ModalContentAndStyle {
  modalContent: ReactNode;
  modalStyles?: CSSProperties,
  modalTitle?: string
}

export const closeModal = () => ({ type: CLOSE_MODAL });

export const openModalAndSetContent = ({ modalContent, modalStyles, modalTitle }: ModalContentAndStyle) => {
  return {
    type: OPEN_AND_SET_MODAL_CONTENT,
    modalContent,
    modalStyles,
    modalTitle
  };
};
