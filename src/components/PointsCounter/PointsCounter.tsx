/** @jsxImportSource @emotion/react */
import { testIds } from "@test/testIds";
import React from "react";
import {
  counterTitle,
  points,
  pointsCounter,
  pointsWrapper,
} from "./PointsCounter.styles";

type Props = {
  totalPoints: number;
  usedPoints: number;
};
export const PointsCounter: React.FC<Props> = ({ totalPoints, usedPoints }) => {
  return (
    <section data-testid={testIds.pointsCounter} css={[pointsWrapper]}>
      <div css={[pointsCounter]}>
        <div css={[points]} data-testid={testIds.pointsCounterPoints}>
          {usedPoints} / {totalPoints}
        </div>
        <p css={[counterTitle]}>Points Spent</p>
      </div>
    </section>
  );
};
