import { Skill, Tree } from "types/types";

export const getTreeItem = (
  treeNumber: number,
  skillNumber: number,
  trees: Tree[]
): Skill => {
  return trees[treeNumber].treePath[skillNumber];
};

export const addPoint = (
  treeNumber: number,
  skillNumber: number,
  skillTree: Tree[],
  usedPoints: number
): { newTree: Tree[]; newPoints: number } => {
  let newUsedPoints = usedPoints;
  if (getTreeItem(treeNumber, skillNumber - 1, skillTree)) {
    if (getTreeItem(treeNumber, skillNumber - 1, skillTree).isActive) {
      skillTree[treeNumber].treePath[skillNumber].isActive = true;
      newUsedPoints++;
    } else {
      throw new Error(
        "You must activate previous skill in order to activate current one"
      );
    }
  } else {
    skillTree[treeNumber].treePath[skillNumber].isActive = true;
    newUsedPoints++;
  }

  return {
    newTree: skillTree,
    newPoints: newUsedPoints,
  };
};

export const removePoint = (
  treeNumber: number,
  skillNumber: number,
  skillTree: Tree[],
  usedPoints: number
): { newTree: Tree[]; newPoints: number } => {
  let newUsedPoints = usedPoints;
  if (getTreeItem(treeNumber, skillNumber + 1, skillTree)) {
    if (getTreeItem(treeNumber, skillNumber + 1, skillTree).isActive) {
      throw new Error(
        "You must remove following skill point in order to remove current one"
      );
    } else {
      skillTree[treeNumber].treePath[skillNumber].isActive = false;
      newUsedPoints--;
    }
  } else {
    skillTree[treeNumber].treePath[skillNumber].isActive = false;
    newUsedPoints--;
  }

  return {
    newTree: skillTree,
    newPoints: newUsedPoints,
  };
};
