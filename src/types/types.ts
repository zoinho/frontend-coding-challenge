export type Skill = {
    id: number;
    isActive: boolean,
    width: number,
    height: number,
}

export interface Tree {
    treePath: Skill[]
}