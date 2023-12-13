/** @jsxImportSource @emotion/react */
import React from "react";
import { mainCss } from "./App.styles";
import { testIds } from "@test/testIds";
import { TalentMap } from "@components/TalentMap/TalentMap";
import { treesMock } from "@constants/constants";
import { ModalContextProvider } from "@contexts/ModalContext";

export const App = () => {
  return (
    <ModalContextProvider>
      <main data-testid={testIds.main} css={[mainCss]}>
        <TalentMap trees={treesMock} totalPoints={6} />
      </main>
    </ModalContextProvider>
  );
};

export default App;
