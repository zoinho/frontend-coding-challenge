import { css } from "@emotion/react";

export const skillPath = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1 0 100%;
  scroll-snap-align: start;

  @media screen and (min-width: 480px) {
    width: 50%;
    flex: 1 0 50%;
  }
  @media screen and (min-width: 1024px) {
    flex-direction: row;
    height: auto;
    scroll-snap-align: none;
    width: 100%;
  }
`;

export const pathName = css`
  color: #a9abac;
  display: block;
  flex: 0 0 auto;
  margin-bottom: 4rem;

  text-transform: uppercase;
  font-size: 2rem;
  @media screen and (min-width: 1024px) {
    margin: 0 4rem 0 0;
    font-size: 1.3rem;
    flex: 0 0 auto;
  }
`;

export const skillList = css`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  width: 100%;
  padding: 2rem;
  @media screen and (min-width: 1024px) {
    flex-direction: row;
    width: auto;
  }
`;

export const skillWrapper = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
  &:first-of-type {
    flex: 0;
  }
`;

export const skillIconWrapper = (isActive: boolean) => css`
  position: relative;
  &:before {
    content: "";
    border-image: ${isActive
      ? `linear-gradient(
          to bottom,
          rgba(109, 171, 234, 1) 50%,
          rgba(36, 58, 80, 1) 50%,
          rgba(100, 142, 183, 1) 100%
        )
        10`
      : `linear-gradient(
        to bottom,
        rgba(74, 74, 74, 1) 50%,
        rgba(59, 59, 59, 1) 50%,
        rgba(58, 58, 58, 1) 100%
      )
      10`};
    border-width: 0.5rem;
    border-style: solid;
    box-shadow: ${isActive
      ? `0px 0px 1px 1px rgba(28, 28, 28, 1),
        inset 0px 0px 2px 2px rgba(28, 28, 28, 1)`
      : `none`};
    height: 100%;
    left: 50%;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100%;
    z-index: 3;
  }
  &:after {
    box-shadow: ${isActive ? `0px 0px 8px 3px rgba(210, 210, 210, 1)` : `none`};
    transition: box-shadow 250ms 0ms ease-in-out;
    content: "";
    height: 100%;
    left: 50%;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100%;
    z-index: 2;
  }
`;

export const skillIcon = (
  isActive: boolean,
  orderNumber: number,
  width: number,
  height: number,
  bg: string
) =>
  css`
    background-image: url(${bg});
    background-position: ${(orderNumber * width * -1) / 10}rem ${height / 10}rem;
    cursor: pointer;
    height: ${height / 10}rem;
    opacity: ${isActive ? 0 : 1};
    position: relative;
    transition: opacity 150ms 0ms linear;
    width: ${width / 10}rem;
    z-index: 1;
    &:hover {
      opacity: 0;
    }
  `;

export const skillIconActive = (
  orderNumber: number,
  width: number,
  height: number,
  bg: string
) => css`
  background-image: url(${bg});
  background-position: ${(orderNumber * width * -1) / 10}rem 0rem;
  height: ${height / 10}rem;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: ${width / 10}rem;
  z-index: 0;
`;

export const skillLine = (isActive: boolean) => css`
  width: 1.6rem;
  background: rgba(255, 255, 255, 0.05);
  border-left: 0.2rem solid rgba(255, 255, 255, 0.025);
  border-right: 0.2rem solid rgba(255, 255, 255, 0.025);
  flex: 1 0 auto;
  position: relative;
  z-index: 1;

  &:before {
    content: "";
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: height 250ms 0ms cubic-bezier(0.17, 0.67, 0.83, 0.67);
    height: ${isActive ? "100%" : "0"};
    z-index: 0;
  }

  @media screen and (min-width: 1024px) {
    height: 1.6rem;
    border-top: 0.2rem solid rgba(255, 255, 255, 0.025);
    border-bottom: 0.2rem solid rgba(255, 255, 255, 0.025);
    &:before {
      height: 100%;
      transition: width 250ms 0ms cubic-bezier(0.17, 0.67, 0.83, 0.67);

      width: ${isActive ? "100%" : "0"};
    }
  }
`;
