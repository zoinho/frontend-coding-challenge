/** @jsxImportSource @emotion/react */
import { testIds } from "@test/testIds";
import React, { useCallback } from "react";
import { Skill } from "types/types";
import {
  skillIcon,
  skillIconActive,
  skillIconWrapper,
  skillLine,
  skillList,
  skillPath,
  skillWrapper,
  pathName as pathCss,
} from "./SkillPath.style";
import bg from "@assets/images/talent-icons-sprite.png";
import {
  LongPressCallbackMeta,
  LongPressEventType,
  LongPressReactEvents,
  useLongPress,
} from "use-long-press";
type Props = {
  talentPath: Skill[];
  treeNumber: number;
  pathName: string;
  handleSkillPoint: (
    treeNumber: number,
    skillNumber: number,
    isActive: boolean
  ) => void;
};

export const SkillPath: React.FC<Props> = ({
  talentPath,
  pathName,
  treeNumber,
  handleSkillPoint,
}) => {
  const handleRightClick = useCallback(
    (treeNumber: number, skillNumber: number) =>
      (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        if (talentPath[skillNumber].isActive) {
          handleSkillPoint(treeNumber, skillNumber, false);
        }
      },
    [handleSkillPoint, talentPath]
  );

  const handleLongPress = useCallback(
    (
      event: LongPressReactEvents<Element>,
      meta: LongPressCallbackMeta<{ treeNumber: number; index: number }>
    ) => {
      event.preventDefault();
      if (meta && meta.context) {
        handleRightClick(meta.context.treeNumber, meta.context.index);
      }
    },
    [handleRightClick]
  );

  const bind = useLongPress<Element, { treeNumber: number; index: number }>(
    handleLongPress,
    {
      filterEvents: (event) => true, // All events can potentially trigger long press
      threshold: 500,
      captureEvent: true,
      cancelOnMovement: false,
      cancelOutsideElement: true,
      detect: LongPressEventType.Pointer,
    }
  );
  return (
    <article data-testid={testIds.skillPath} css={[skillPath]}>
      <p css={[pathCss]} data-testid={testIds.skillPathName}>
        {pathName}
      </p>
      <div css={[skillList]}>
        {talentPath.map((talent: Skill, index: number) => {
          return (
            <section
              key={`talent_${talent.id}`}
              css={[skillWrapper]}
              data-testid={testIds.skillPathSkill}
            >
              {index !== 0 && (
                <article
                  data-testid={testIds.skillPathLine}
                  css={[skillLine(talent.isActive)]}
                  className="line"
                ></article>
              )}
              <article
                css={[skillIconWrapper(talent.isActive)]}
                data-testid={testIds.skillPathIcon}
                onClick={() =>
                  !talent.isActive && handleSkillPoint(treeNumber, index, true)
                }
                onContextMenu={handleRightClick(treeNumber, index)}
                {...bind({ treeNumber, index })}
              >
                <div
                  className="skill"
                  css={[
                    skillIcon(
                      talent.isActive,
                      talent.id,
                      talent.width,
                      talent.height,
                      bg
                    ),
                  ]}
                ></div>
                <div
                  css={[
                    skillIconActive(talent.id, talent.width, talent.height, bg),
                  ]}
                  className="skill-active"
                ></div>
              </article>
            </section>
          );
        })}
      </div>
    </article>
  );
};
