import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Modal, ModalProps } from "@components/Modal/Modal";
import { EModalTypes } from "@constants/constants";
import { testIds } from "@test/testIds";

const confirmMock = jest.fn();
const cancelMock = jest.fn();

describe("Modal component", () => {
  const user = userEvent.setup();

  const renderModal = ({
    title,
    type,
    content,
    handleConfirm,
    handleClose,
    hasActions,
    isOpen,
  }: ModalProps) => {
    return render(
      <Modal
        title={title}
        type={type}
        content={content}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        hasActions={hasActions}
        isOpen={isOpen}
      />
    );
  };
  const mockData = {
    title: "Test",
    type: EModalTypes.NORMAL,
    content: <p>Test content</p>,
    handleConfirm: confirmMock,
    handleClose: cancelMock,
    hasActions: true,
    isOpen: true,
  };
  it("render the component", () => {
    renderModal(mockData);
    const modal = screen.getByTestId(testIds.modal);
    const modalActions = screen.getByTestId(testIds.modalActions);
    const modalCancel = screen.getByTestId(testIds.modalCancel);
    const modalClose = screen.getByTestId(testIds.modalClose);
    const modalConfirm = screen.getByTestId(testIds.modalConfirm);
    const modalContent = screen.getByTestId(testIds.modalContent);
    const modalHeader = screen.getByTestId(testIds.modalHeader);

    [
      modal,
      modalActions,
      modalClose,
      modalCancel,
      modalConfirm,
      modalContent,
      modalHeader,
    ].forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    expect(modalHeader).toHaveTextContent(mockData.title);
    expect(modalContent).toHaveTextContent("Test content");
  });

  it("close modal from outside", async () => {
    const { rerender } = renderModal(mockData);

    const modal = screen.getByTestId(testIds.modal);

    expect(modal).toBeInTheDocument();

    rerender(
      <Modal
        title={mockData.title}
        type={mockData.type}
        content={mockData.content}
        handleClose={mockData.handleClose}
        handleConfirm={mockData.handleConfirm}
        hasActions={mockData.hasActions}
        isOpen={false}
      />
    );
    expect(modal).not.toBeInTheDocument();
  });

  it("not render action buttons", async () => {
    renderModal({ ...mockData, hasActions: false });
    const actions = screen.queryByTestId(testIds.modalActions);
    const modalCancel = screen.queryByTestId(testIds.modalCancel);
    const modalConfirm = screen.queryByTestId(testIds.modalConfirm);

    expect(actions).toBeNull();
    expect(modalCancel).toBeNull();
    expect(modalConfirm).toBeNull();
  });

  it("triggers confirm function", async () => {
    renderModal(mockData);

    const modalConfirm = screen.getByTestId(testIds.modalConfirm);
    user.click(modalConfirm);
    await waitFor(() => {
      expect(confirmMock).toHaveBeenCalled();
    });
  });
  it("triggers cancel function", async () => {
    renderModal(mockData);

    const modalCancel = screen.getByTestId(testIds.modalCancel);
    user.click(modalCancel);
    await waitFor(() => {
      expect(cancelMock).toHaveBeenCalled();
    });
  });

  it("triggers close function", async () => {
    renderModal(mockData);

    const closeButton = screen.getByTestId(testIds.modalClose);
    user.click(closeButton);
    await waitFor(() => {
      expect(cancelMock).toHaveBeenCalled();
    });
  });
});
