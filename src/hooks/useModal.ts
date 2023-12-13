import { EModalTypes } from "@constants/constants";
import { ModalContext } from "@contexts/ModalContext";
import { useContext } from "react";

type Props = {
  title: string;
  content: JSX.Element;
  type: EModalTypes;
  hasActions: boolean;
  confirmCallback: () => void;
};
export const useModal = () => {
  const {
    setTitle,
    setContent,
    setIsOpen,
    setType,
    setHasActions,
    setHandleConfirm,
  } = useContext(ModalContext);

  const openModal = ({
    title,
    type,
    content,
    hasActions,
    confirmCallback,
  }: Props) => {
    setTitle && setTitle(title);
    setContent && setContent(content);
    setHasActions && setHasActions(hasActions);
    setType && setType(type);

    setIsOpen && setIsOpen(true);
    setHandleConfirm && setHandleConfirm(confirmCallback);
  };

  return { openModal };
};
