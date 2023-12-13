import {css} from '@emotion/react';

export const header =  css`
    background-color: rgba(255,255,255,0.1);
    color: #fff;
    font-size: 1.6rem;
    line-height: 2rem;
    padding: 1rem;
    text-align: center;
    width: 100%;
    
    @media screen and (min-width: 480px) {
    font-size: 2rem;
    line-height: 2rem;
    padding: 1rem 0;
    width: 100%;
  }
  `