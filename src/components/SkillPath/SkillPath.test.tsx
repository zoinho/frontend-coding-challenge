import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Skill } from "types/types";
import { SkillPath } from "./SkillPath";
import { treesMock } from "@constants/constants";
import { testIds } from "@test/testIds";
import userEvent from "@testing-library/user-event";

const handleSkillPointMock = jest.fn();

describe("SkillPath", () => {
  beforeAll(() => {
    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
  });
  const mockData = {
    talentPath: treesMock[0].treePath,
    treeNumber: 0,
    pathName: "Test path",
    handleSkillpoint: handleSkillPointMock,
  };
  const renderSkillPath = (
    talentPath: Skill[],
    treeNumber: number,
    pathName: string,
    handleSkillPoint: (
      treeNumber: number,
      skillNumber: number,
      isActive: boolean
    ) => void
  ) => {
    render(
      <SkillPath
        talentPath={talentPath}
        treeNumber={treeNumber}
        pathName={pathName}
        handleSkillPoint={handleSkillPoint}
      />
    );
  };

  it("render the component", () => {
    renderSkillPath(
      mockData.talentPath,
      mockData.treeNumber,
      mockData.pathName,
      mockData.handleSkillpoint
    );

    const skillPath = screen.getByTestId(testIds.skillPath);
    const skillPathName = screen.getByTestId(testIds.skillPathName);
    const skillPathSkill = screen.getAllByTestId(testIds.skillPathSkill);
    const skillPathLine = screen.getAllByTestId(testIds.skillPathLine);
    const skillPathIcon = screen.getAllByTestId(testIds.skillPathIcon);

    [skillPath, skillPathName].forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    expect(skillPathSkill.length).toEqual(4);
    expect(skillPathLine.length).toEqual(3);
    expect(skillPathIcon.length).toEqual(4);
  });

  it("trigger handler on left click", async () => {
    const user = userEvent.setup();
    renderSkillPath(
      mockData.talentPath,
      mockData.treeNumber,
      mockData.pathName,
      mockData.handleSkillpoint
    );
    const skills = screen.getAllByTestId(testIds.skillPathIcon);
    user.click(skills[0]);

    await waitFor(() => {
      expect(handleSkillPointMock).toHaveBeenCalledWith(
        mockData.treeNumber,
        0,
        true
      );
    });
  });

  it("trigger handler on right click", async () => {
    const user = userEvent.setup();
    const mock = JSON.parse(JSON.stringify(mockData));
    mock.talentPath[0].isActive = true;

    renderSkillPath(
      mock.talentPath,
      mock.treeNumber,
      mock.pathName,
      handleSkillPointMock
    );
    const skills = screen.getAllByTestId(testIds.skillPathIcon);

    await user.pointer({ keys: "[MouseRight>]", target: skills[0] });

    await waitFor(() => {
      expect(handleSkillPointMock).toHaveBeenCalledWith(
        mock.treeNumber,
        0,
        false
      );
    });
  });
});
