import { createContext, useState } from "react";

import { Modal } from "@components/Modal/Modal";
import { EModalTypes } from "@constants/constants";

export type ModalStateProps = {
  title: string;
  content: JSX.Element;
  type: EModalTypes;
  isOpen: boolean;
  hasActions: boolean;
  handleConfirm: () => void;
  setTitle?: (title: string) => void;
  setContent?: (content: JSX.Element | null) => void;
  setIsOpen?: (isOpen: boolean) => void;
  setHasActions?: (hasActions: boolean) => void;
  setType?: (type: EModalTypes) => void;
  setHandleConfirm?: any;
};

const initialState: Partial<ModalStateProps> = {
  title: "",
  content: <br />,
  isOpen: false,
  hasActions: false,
  handleConfirm: () => null,
};

export const ModalContext = createContext(initialState);

export const ModalContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSX.Element | null>(null);
  const [type, setType] = useState<EModalTypes>(EModalTypes.NORMAL);
  const [isOpen, setIsOpen] = useState(false);
  const [hasActions, setHasActions] = useState(true);
  const [handleConfirm, setHandleConfirm] = useState<any>();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        setTitle,
        setContent,
        setType,
        setIsOpen,
        setHasActions,
        setHandleConfirm,
      }}
    >
      <>
        {children}
        <Modal
          title={title}
          type={type}
          content={content}
          isOpen={isOpen}
          hasActions={hasActions}
          handleConfirm={handleConfirm}
          handleClose={handleClose}
        />
      </>
    </ModalContext.Provider>
  );
};
