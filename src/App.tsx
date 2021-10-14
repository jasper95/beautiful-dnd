import { useState, useMemo } from "react";
import "./styles.scss";
import { iRawNode, iRawNodeLookUp } from "./model";
import Tree from "./tree";
import { convertToTree } from "./utils";

const data: iRawNode[] = [
  {
    id: 1,
    order: 1,
    level: 1
  },
  {
    id: 2,
    order: 2,
    level: 1
  },
  {
    id: 3,
    order: 3,
    level: 1
  },
  {
    id: 4,
    parentId: 3,
    order: 1,
    level: 2
  },
  {
    id: 5,
    parentId: 1,
    order: 1,
    level: 2
  },
  {
    id: 6,
    parentId: 1,
    order: 1,
    level: 2
  },
  {
    id: 7,
    parentId: 2,
    order: 1,
    level: 2
  },
  {
    id: 8,
    parentId: 2,
    order: 2,
    level: 2
  },
  {
    id: 9,
    parentId: 3,
    order: 2,
    level: 2
  },
  {
    id: 10,
    parentId: 4,
    order: 1,
    level: 3
  }
];

export default function App() {
  const [stateData, setData] = useState(data);
  const tree = useMemo(() => convertToTree(stateData), [stateData]);
  const [savedState, setSavedState] = useState(tree);

  function onMove(itemId: number, newOrder: number, newParentId?: number) {
    const newParent = stateData.find((e) => e.id === newParentId);
    let updatedItem: iRawNode = {
      id: itemId,
      order: newOrder,
      parentId: newParentId,
      level: (newParent?.level ?? 0) + 1
    };
    const siblings = stateData
      .filter((e) => e.parentId === newParentId && e.id !== itemId)
      .map((e, i) => ({
        ...e,
        order: i + 1 >= newOrder ? i + 2 : i + 1
      }));
    const updatedNodes: iRawNodeLookUp = [updatedItem]
      .concat(siblings)
      .reduce((acc, el) => {
        return {
          ...acc,
          [el.id]: el
        };
      }, {});
    setData((prevData) =>
      prevData.map((prevNode) => {
        const updatedNode = updatedNodes[prevNode.id];
        if (updatedNode !== undefined) {
          return updatedNode;
        }
        return prevNode;
      })
    );
  }

  return (
    <div className="App">
      <Tree tree={tree} onMove={onMove} />
    </div>
  );
}
