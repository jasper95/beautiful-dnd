import { iNode } from "./model";
import { useRef } from "react";
import NodePlaceholder from "./node-placeholder";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface iNodeProps {
  ancestors: number[];
  node: iNode;
  onMove(draggedItemId: number, newOrder: number, newParentId?: number): void;
  index: number,
}

export default function Node(props: iNodeProps) {
  const { onMove, node, ancestors, index } = props;
  const parents = [node.id].concat(ancestors);
  const ref = useRef<HTMLLIElement>(null);
  // const [{ isOver }, drop] = useDrop({
  //   accept: "Node",
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver({ shallow: true }),
  //     handlerId: monitor.getHandlerId()
  //   }),
  //   hover(item: iDraggedItem, monitor) {
  //     if (
  //       !monitor.canDrop() ||
  //       !monitor.isOver({ shallow: true }) ||
  //       item.id === node.id
  //     ) {
  //       return;
  //     }
  //     const hoverBoundingRect = ref.current?.getBoundingClientRect();
  //     console.log("hoverBoundingRect.top", hoverBoundingRect?.top);
  //     const clientOffset = monitor.getClientOffset();
  //     console.log("clientOffset", clientOffset?.x);
  //     return;
  //     console.log("moving", item.id, node.id, node.parentId);
  //     onMove(item.id, node.order, node.parentId);
  //   },
  //   drop(item: iDraggedItem, monitor) {
  //     if (
  //       !monitor.canDrop() ||
  //       !monitor.isOver({ shallow: true }) ||
  //       item.id === node.id
  //     ) {
  //       return;
  //     }
  //     console.log("moving", item.id, node.id, node.parentId);
  //     onMove(item.id, node.order, node.parentId);
  //   },
  //   canDrop(item) {
  //     return parents.indexOf(item.id) < 0;
  //   }
  // });
  // const [{ isDragging }, drag, preview] = useDrag({
  //   type: "Node",
  //   item: (): iDraggedItem => {
  //     return {
  //       id: node.id
  //     };
  //   },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging()
  //   })
  // });
  // const opacity = isDragging || isOver ? 0.5 : 1;
  const isOver = false
  const border = isOver ? "1px solid blue" : "";
  // preview(drop(ref));
  return (
    <Draggable key={node.id} draggableId={`${node.id}`} index={index}>
      {(provided, snapshot) => (
        <li 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
            <div
              style={{ width: 150, height: 30, border }}
              className="name-container"
            >
              <button>x</button> {`Node ${node.id}`}
            </div>
            <Droppable droppableId="droppable">
              {(provided1, snapshot1) => (
                <ul
                  {...provided1.droppableProps}
                  ref={provided.innerRef}
                >
                  {node.children?.map((child, i) => (
                    <Node
                      ancestors={parents}
                      key={child.id}
                      node={child}
                      onMove={onMove}
                      index={i}
                    />
                  ))}
                  {provided1.placeholder}
                </ul>
              )}
            </Droppable>
          </li>
      )}
    </Draggable>
  );
}
