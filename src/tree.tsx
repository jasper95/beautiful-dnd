import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { iTree, iNode } from "./model";
import Node from "./node";
import { checkMobileBrowser } from "./utils";
import NodePlaceholder from "./node-placeholder";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface iTreeProps {
  tree: iTree;
  onMove(draggedItemId: number, newOrder: number, newParentId?: number): void;
}
const isMobile = checkMobileBrowser();
export default function Tree(props: iTreeProps) {
  const { tree, onMove } = props;
  return (
    <div>
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="tree cascade"
            >
              {tree.map((node, i) => (
                <Node key={node.id} ancestors={[]} node={node} onMove={onMove} index={i} />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
