import { Tree } from "types/types";

export enum EModalTypes {
  NORMAL = "normal",
  WARNING = "warning",
}

export const treesMock: Tree[] = [
  {
    treePath: [
      { id: 0, isActive: false, width: 50, height: 50 },
      { id: 1, isActive: false, width: 50, height: 50 },
      { id: 2, isActive: false, width: 50, height: 50 },
      { id: 3, isActive: false, width: 50, height: 50 },
    ],
  },
  {
    treePath: [
      { id: 4, isActive: false, width: 50, height: 50 },
      { id: 5, isActive: false, width: 50, height: 50 },
      { id: 6, isActive: false, width: 50, height: 50 },
      { id: 7, isActive: false, width: 50, height: 50 },
    ],
  },
];
