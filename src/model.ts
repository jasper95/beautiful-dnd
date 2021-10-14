export type iTree = iNode[];

export interface iNode extends iRawNode {
  id: number;
  children?: iTree;
}

export interface iRawNode {
  id: number;
  parentId?: number;
  order: number;
  level: number;
}

export type iNodeLookUp = {
  [key in number]?: iNode;
};

export type iRawNodeLookUp = {
  [key in number]?: iRawNode;
};

export interface iDraggedItem {
  id: number;
}
