/** @jsxImportSource @emotion/react */
import { testIds } from "@test/testIds";
import React from "react";
import { header } from "./Header.style";

type Props = {
  content: string;
};
export const Header: React.FC<Props> = ({ content }) => {
  return (
    <article data-testid={testIds.header} css={[header]}>
      <p data-testid={testIds.headerContent} css={{ margin: 0 }}>
        {content}
      </p>
    </article>
  );
};
