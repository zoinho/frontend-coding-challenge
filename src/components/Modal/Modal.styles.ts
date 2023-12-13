import { css } from "@emotion/react";

export const modalWrapper = css`
  align-content: center;
  background-color: rgba(255, 255, 255, 0.15);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  padding: 2rem;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
`;

export const modalContent = css`
  background-color: #090c0e;
  border-radius: 1rem;
  box-shadow: 0rem 0rem 2rem -0.1rem rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: space-between;
  margin: auto;
`;
export const modalType = {
  normal: css`
    ${modalContent}
    background-color: #090C0E;
  `,
  warning: css`
    ${modalContent}
    background-color: #a04e4e;
  `,
};

export const modalHeader = css`
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.35);
  color: #fff;
  font-size: 2.5rem;
  font-weight: 600;
  padding: 2rem;
  text-align: center;
`;

export const modalContentText = css`
  color: #fff;
  font-weight: 400;
  font-size: 1.8rem;
  padding: 2rem;
`;
export const buttonWrapper = css`
  border-top: 0.1rem solid rgba(255, 255, 255, 0.35);
  padding: 2rem;
  text-align: right;
`;
export const modalButton = (secondary?: boolean) => css`
  background: ${secondary ? " rgba(0,0,0,0.15)" : "rgba(255,255,255,0.55)"};
  box-shadow: 0rem 0rem 0.8rem -0.1rem transparent;
  color: ${secondary ? "#FFF" : "#000"};
  cursor: pointer;
  border: ${secondary ? " 0.1rem solid #4c4e51" : " 0.1rem solid #2b2b2b"};
  border-radius: 0.5rem;
  margin: 0 2rem;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  transition: box-shadow 150ms 0ms ease-in;
  &:hover {
    box-shadow: 0rem 0rem 0.8rem 0.5rem rgba(255, 255, 255, 0.2);
  }
`;

export const closeButton = (secondary?: boolean) => css`
  ${modalButton(secondary)}
  background: ${secondary ? " rgba(0,0,0,1)" : "rgba(255,255,255,1)"};
  position: absolute;
  top: 2rem;
  right: 2rem;
`;
