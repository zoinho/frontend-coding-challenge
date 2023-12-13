import { css } from "@emotion/react";
import bg from "@assets/images/talent-calc-bg.png";

export const talentTree = css`
  background: url(${bg});
  background-size: cover;
  border: 0.1rem solid #0f1216;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem;
  width: 100%;

  @media screen and (min-width: 1024px) {
    background-size: initial;
    height: 37.3rem;
    width: 99.8rem;
  }
`;

export const talentsLayout = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const headerWrapper = css`
  align-content: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const paths = css`
  display: flex;
  width: 100%;
  flex: 1 0 auto;
  flex-direction: row;

  overflow-x: auto;
  scroll-snap-type: x mandatory;

  @media screen and (min-width: 1024px) {
    align-items: center;
    flex: 1 0 auto;
    flex-direction: column;

    display: flex;
    justify-content: space-evenly;
    overflow-x: initial;
    scroll-snap-type: initial;
    width: auto;
  }
`;

export const counter = css`
  flex: 0 0 30rem;
`;

export const rightSection = css`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  @media screen and (min-width: 1024px) {
    flex-direction: column;
    justify-content: center;
    flex: 0 0 30rem;
  }
`;
export const resetButton = css`
  color: #fff;
  cursor: pointer;
  background-color: #302f30;
  box-shadow: 0px 0 7px 0px rgba(255, 255, 255, 0.3);
  border: 0.1rem solid rgba(255, 255, 255, 0.06);
  font-size: 1.6rem;
  font-weight: 400;
  height: auto;
  line-height: 2.1rem;
  opacity: 1;
  padding: 0.5rem;
  text-transform: uppercase;
  text-align: center;
  transition: opacity 150ms 0ms linear;
  width: calc(50% - 2rem);

  &[disabled] {
    opacity: 0.2;
  }
`;

export const rulesButton = css`
  color: #fff;
  cursor: pointer;
  background-color: #302f30;
  box-shadow: 0px 0 7px 0px rgba(255, 255, 255, 0.3);
  border: 0.1rem solid rgba(255, 255, 255, 0.06);
  font-size: 1.6rem;
  font-weight: 700;
  height: auto;
  line-height: 1.6rem;
  margin-left: 2rem;
  opacity: 1;
  padding: 0.5rem 1.5rem;
  text-transform: uppercase;
  text-align: center;
  transition: opacity 150ms 0ms linear;
  width: auto;
  display: block;
  @media screen and (min-width: 1024px) {
    display: none;
    margin: 0;
  }
`;
