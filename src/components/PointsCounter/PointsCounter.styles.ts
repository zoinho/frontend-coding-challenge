import {css} from '@emotion/react';

export const pointsWrapper = css`
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    width: 50%;
    @media screen and (min-width: 1024px) {
        width: 100%;

  }
`

export const pointsCounter = css`
    align-items: center;
    background-color: rgba(0,0,0,0.4);
    border: 0.1rem solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0.5rem 0;
    width: 100%;
   
    @media screen and (min-width: 1024px) {
        flex-direction: column;
        padding: 2rem;
        text-align: center;
        width: auto;

  }

`

export const points = css`
    color: #FFF;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 1.8rem;
    width: auto;
    white-space: nowrap;
    @media screen and (min-width: 1024px) {
        width: 100%;
  }
    
`

export const counterTitle = css`
    color: #31455A;
    font-weight: 400;
    font-size: 2rem;
    margin: 0 0 0 1.5rem;
    width: auto;
    @media screen and (min-width: 1024px) {
        margin: 1rem 0 0 0 ;
        width: 100%;
  }

`