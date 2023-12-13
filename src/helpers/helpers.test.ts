import { treesMock } from "@constants/constants";
import { addPoint, getTreeItem, removePoint } from "@helpers/helper";

describe("helpers", () => {
  const selectedSkillsTree = JSON.parse(JSON.stringify(treesMock));

  it("test getTreeItem", () => {
    const result = getTreeItem(0, 0, selectedSkillsTree);

    expect(result).toStrictEqual({
      id: 0,
      isActive: false,
      width: 50,
      height: 50,
    });
  });

  describe("addPoint", () => {
    it("test adding points", () => {
      const result = addPoint(0, 0, selectedSkillsTree, 0);

      expect(result.newTree[0].treePath[0].isActive).toEqual(true);
      expect(result.newPoints).toEqual(1);
    });

    it("test throw error", () => {
      try {
        addPoint(0, 1, treesMock, 0);
      } catch (error: any) {
        expect(error.message).toEqual(
          "You must activate previous skill in order to activate current one"
        );
      }
    });
  });

  describe("removePoint", () => {
    beforeEach(() => {
      selectedSkillsTree[0].treePath[0].isActive = true;
    });
    it("test removing points", () => {
      expect(selectedSkillsTree[0].treePath[0].isActive).toEqual(true);

      const result = removePoint(0, 0, selectedSkillsTree, 1);

      expect(result.newTree[0].treePath[0].isActive).toEqual(false);
      expect(result.newPoints).toEqual(0);
    });

    it("test throw error", () => {
      selectedSkillsTree[0].treePath[1].isActive = true;

      try {
        removePoint(0, 1, treesMock, 2);
      } catch (error: any) {
        expect(error.message).toEqual(
          "You must remove following skill point in order to remove current one"
        );
      }
    });
  });
});
