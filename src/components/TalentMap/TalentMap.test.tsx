import { Tree } from "types/types";
import { TalentMap } from "./TalentMap";
import { render, screen, waitFor } from "@testing-library/react";
import { testIds } from "@test/testIds";
import { treesMock } from "@constants/constants";
import userEvent from "@testing-library/user-event";
import { useModal } from "../../hooks/useModal";
import { ModalContextProvider } from "@contexts/ModalContext";

// const mockModal = jest.fn();
// jest.mock("../../hooks/useModal", () => ({
//   useModal: () => ({
//     openModal: mockModal,
//   }),
// }));

describe("TalentMap", () => {
  const renderTalentMap = (trees: Tree[], totalPoints: number) => {
    render(
      <ModalContextProvider>
        <TalentMap trees={trees} totalPoints={totalPoints} />
      </ModalContextProvider>
    );
  };

  it("render the component", async () => {
    renderTalentMap(treesMock, 6);

    const talentMap = screen.getByTestId(testIds.talentTree);
    const header = screen.getByTestId(testIds.header);
    const skillPaths = screen.getAllByTestId(testIds.skillPath);
    const pointsCounter = screen.getByTestId(testIds.pointsCounter);
    const resetButton = screen.getByTestId(testIds.talentTreeReset);
    const rulesButton = screen.getByTestId(testIds.talentTreeRules);

    [talentMap, header, pointsCounter, resetButton, rulesButton].forEach(
      (element) => {
        expect(element).toBeInTheDocument();
      }
    );

    expect(skillPaths.length).toEqual(2);
  });

  describe("counter changes", () => {
    it("change points counter on adding points", async () => {
      const user = userEvent.setup();
      renderTalentMap(treesMock, 6);
      const counter = screen.getByTestId(testIds.pointsCounter);
      expect(counter).toHaveTextContent("0 / 6Points Spent");

      const skill = screen.getAllByTestId(testIds.skillPathIcon);
      await user.click(skill[0]);

      await waitFor(() => {
        expect(counter).toHaveTextContent("1 / 6Points Spent");
      });
    });

    it("change points counter on removing points", async () => {
      const user = userEvent.setup();
      const mock = JSON.parse(JSON.stringify(treesMock));
      mock[0].treePath[0].isActive = true;

      renderTalentMap(mock, 6);
      const counter = screen.getByTestId(testIds.pointsCounter);
      const skill = screen.getAllByTestId(testIds.skillPathIcon);
      expect(counter).toHaveTextContent("1 / 6Points Spent");

      await user.pointer({ keys: "[MouseRight>]", target: skill[0] });

      await waitFor(() => {
        expect(counter).toHaveTextContent("0 / 6Points Spent");
      });
    });

    it("reset points", async () => {
      const user = userEvent.setup();
      renderTalentMap(treesMock, 6);
      const counter = screen.getByTestId(testIds.pointsCounter);
      const skill = screen.getAllByTestId(testIds.skillPathIcon);
      const resetButton = screen.getByTestId(testIds.talentTreeReset);
      expect(counter).toHaveTextContent("0 / 6Points Spent");

      await user.click(skill[0]);
      await user.click(skill[1]);
      await waitFor(() => {
        expect(counter).toHaveTextContent("2 / 6Points Spent");
      });

      await user.click(resetButton);
      const modal = await screen.findByTestId(testIds.modal);
      expect(modal).toBeInTheDocument();
      const confirmButton = screen.getByTestId(testIds.modalConfirm);
      await user.click(confirmButton);
      await waitFor(() => {
        expect(counter).toHaveTextContent("0 / 6Points Spent");
      });
    });
  });

  describe("show modals", () => {
    it("show modal with rules after click", async () => {
      const user = userEvent.setup();
      renderTalentMap(treesMock, 6);

      const rulesButton = screen.getByTestId(testIds.talentTreeRules);
      await user.click(rulesButton);

      await waitFor(() => {
        expect(screen.getByTestId(testIds.modal)).toBeInTheDocument();
      });
    });

    it("show warning modal if user want to add point not in order", async () => {
      const user = userEvent.setup();
      const mock = JSON.parse(JSON.stringify(treesMock));
      mock[0].treePath[0].isActive = true;

      renderTalentMap(mock, 6);
      const skill = screen.getAllByTestId(testIds.skillPathIcon);

      await user.click(skill[2]);

      await waitFor(() => {
        expect(screen.getByTestId(testIds.modal)).toBeInTheDocument();
      });
    });

    it("show warning modal if user want to remove point not in order", async () => {
      const user = userEvent.setup();
      const mock = JSON.parse(JSON.stringify(treesMock));
      mock[0].treePath[0].isActive = true;
      mock[0].treePath[1].isActive = true;

      renderTalentMap(mock, 6);
      const skill = screen.getAllByTestId(testIds.skillPathIcon);

      await user.pointer({ keys: "[MouseRight>]", target: skill[0] });

      await waitFor(() => {
        expect(screen.getByTestId(testIds.modal)).toBeInTheDocument();
      });
    });

    it("show warning modal if all points are spent", async () => {
      const user = userEvent.setup();
      const mock = JSON.parse(JSON.stringify(treesMock));
      mock[0].treePath[0].isActive = true;
      mock[0].treePath[1].isActive = true;
      mock[0].treePath[2].isActive = true;
      mock[0].treePath[3].isActive = true;
      mock[1].treePath[0].isActive = true;
      mock[1].treePath[1].isActive = true;

      renderTalentMap(mock, 6);
      const skill = screen.getAllByTestId(testIds.skillPathIcon);

      await user.click(skill[6]);

      await waitFor(() => {
        expect(screen.getByTestId(testIds.modal)).toBeInTheDocument();
      });
    });

    it("show  warning modal if user wants to reset all points", async () => {
      const user = userEvent.setup();
      const mock = JSON.parse(JSON.stringify(treesMock));
      mock[0].treePath[0].isActive = true;
      mock[0].treePath[1].isActive = true;
      mock[0].treePath[2].isActive = true;
      mock[0].treePath[3].isActive = true;
      mock[1].treePath[0].isActive = true;
      mock[1].treePath[1].isActive = true;

      renderTalentMap(mock, 6);
      const resetButton = screen.getByTestId(testIds.talentTreeReset);

      await user.click(resetButton);

      await waitFor(() => {
        expect(screen.getByTestId(testIds.modal)).toBeInTheDocument();
      });
    });
  });
});
