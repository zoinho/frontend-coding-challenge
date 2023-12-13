/** @jsxImportSource @emotion/react */
import React from "react";

import { testIds } from "@test/testIds";
import {
  buttonWrapper,
  closeButton,
  modalButton,
  modalContent,
  modalContentText,
  modalHeader,
  modalType,
  modalWrapper,
} from "./Modal.styles";
import { EModalTypes } from "@constants/constants";

export type ModalProps = {
  title: string;
  type: EModalTypes;
  content: React.ReactNode;
  handleConfirm?: () => void;
  handleClose?: () => void;
  isOpen: boolean;
  hasActions: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  title,
  content,
  isOpen,
  type,
  handleConfirm,
  handleClose,
  hasActions,
}) => {
  const confirmModal = () => {
    handleConfirm && handleConfirm();
    closeModal();
  };

  const closeModal = () => {
    handleClose && handleClose();
  };

  return isOpen ? (
    <div data-testid={testIds.modal} css={[modalWrapper]} role="dialog">
      <div css={[modalContent, modalType[type]]}>
        <header data-testid={testIds.modalHeader} css={[modalHeader]}>
          {title}
        </header>
        <button
          data-testid={testIds.modalClose}
          css={[closeButton()]}
          onClick={() => closeModal()}
        >
          X
        </button>
        <section data-testid={testIds.modalContent} css={[modalContentText]}>
          {content}
        </section>
        {hasActions && (
          <section css={[buttonWrapper]} data-testid={testIds.modalActions}>
            <button
              data-testid={testIds.modalConfirm}
              css={[modalButton()]}
              onClick={() => confirmModal()}
            >
              Confirm
            </button>
            <button
              data-testid={testIds.modalCancel}
              css={[modalButton(true)]}
              onClick={() => closeModal()}
            >
              Cancel
            </button>
          </section>
        )}
      </div>
    </div>
  ) : null;
};
