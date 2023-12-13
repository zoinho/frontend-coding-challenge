/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useState } from "react";

import { Header } from "@components/Header/Header";
import { testIds } from "@test/testIds";
import {
  headerWrapper,
  paths,
  resetButton,
  rightSection,
  rulesButton,
  talentTree,
  talentsLayout,
} from "./TalentMap.style";
import { Skill, Tree } from "types/types";
import { SkillPath } from "@components/SkillPath/SkillPath";
import { PointsCounter } from "@components/PointsCounter/PointsCounter";
import { addPoint, removePoint } from "@helpers/helper";
import { useModal } from "@hooks/useModal";
import { EModalTypes } from "@constants/constants";

type Props = {
  trees: Tree[];
  totalPoints: number;
};

export const TalentMap: React.FC<Props> = ({ trees, totalPoints }) => {
  const [currentTrees, setCurrentTrees] = useState<Tree[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [usedPoints, setUsedPoints] = useState<number>(0);

  const { openModal } = useModal();

  useEffect(() => {
    if (trees.length > 0) {
      setCurrentTrees(JSON.parse(JSON.stringify(trees)));
      const mergedSkillTrees = trees.reduce((acc: Skill[], next: Tree) => {
        return acc.concat(next.treePath);
      }, []);
      const currUsedPoints = mergedSkillTrees.filter(
        (skill: Skill) => skill.isActive
      );
      setUsedPoints(currUsedPoints.length);
    }
    setPoints(totalPoints);
  }, [trees, totalPoints]);

  const handleSkillPoint = useCallback(
    (treeNumber: number, skillNumber: number, addNewPoint: boolean) => {
      try {
        if (addNewPoint) {
          if (usedPoints === points) {
            openModal({
              title: "Warning !",
              content: <p>You have used all available points</p>,
              type: EModalTypes.WARNING,
              hasActions: false,
              confirmCallback: () => null,
            });
            return false;
          }
          const { newTree, newPoints } = addPoint(
            treeNumber,
            skillNumber,
            [...currentTrees],
            usedPoints
          );
          newTree && setCurrentTrees(newTree);
          newPoints && setUsedPoints(newPoints);
        } else {
          const { newTree, newPoints } = removePoint(
            treeNumber,
            skillNumber,
            [...currentTrees],
            usedPoints
          );
          newTree && setCurrentTrees(newTree);
          newPoints >= 0 && setUsedPoints(newPoints);
        }
      } catch (error: any) {
        openModal({
          title: "Warning !",
          content: <p>{error.message}</p>,
          type: EModalTypes.WARNING,
          hasActions: false,
          confirmCallback: () => null,
        });
      }
    },
    [currentTrees, points, usedPoints, openModal]
  );

  const resetPoints = () => {
    setCurrentTrees(trees);
    setUsedPoints(0);
  };

  const handleResetPoints = () => {
    openModal({
      title: "Reset points",
      type: EModalTypes.NORMAL,
      content: (
        <p>This will remove all your distributed points, are you sure?</p>
      ),
      hasActions: true,
      confirmCallback: () => resetPoints,
    });
  };

  const handleOpenRules = () => {
    openModal({
      title: "Rules",
      type: EModalTypes.NORMAL,
      content: (
        <div>
          As every realm has it's own rules, here is no different: <br />
          <br />
          To add skill point: tap on skill icon <br />
          <br />
          To remove skill point: long press
        </div>
      ),

      hasActions: false,
      confirmCallback: () => null,
    });
  };
  return (
    <section data-testid={testIds.talentTree} css={[talentTree]}>
      <article css={[headerWrapper]}>
        <Header
          content={
            "TitanStar Legends - Rune Mastery Loadout Talent Caluclator 9000"
          }
        />
        <button
          css={[rulesButton]}
          onClick={handleOpenRules}
          data-testid={testIds.talentTreeRules}
        >
          {" "}
          ?{" "}
        </button>
      </article>

      <article css={[talentsLayout]}>
        <section css={[paths]}>
          {currentTrees.map((tree: Tree, index: number) => {
            return (
              <SkillPath
                key={`skillpath_${index}`}
                treeNumber={index}
                talentPath={tree.treePath}
                pathName={`talent path ${index + 1}`}
                handleSkillPoint={handleSkillPoint}
              />
            );
          })}
        </section>
        <section css={[rightSection]}>
          <PointsCounter totalPoints={points} usedPoints={usedPoints} />
          <button
            data-testid={testIds.talentTreeReset}
            onClick={handleResetPoints}
            disabled={usedPoints === 0}
            css={[resetButton]}
          >
            Reset Points
          </button>
        </section>
      </article>
    </section>
  );
};
