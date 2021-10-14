import { useRef } from "react";
import { iDraggedItem, iNode } from "./model";

interface iNodePlaceholderProps {
  parent?: iNode;
  ancestors: number[];
  onMove(draggedItemId: number, newOrder: number, newParentId?: number): void;
}
export default function NodePlaceholder(props: iNodePlaceholderProps) {
  const { onMove, parent, ancestors } = props;
  const ref = useRef<HTMLDivElement>(null);
  // const [{ isOver }, drop] = useDrop({
  //   accept: "Node",
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver({ shallow: true })
  //   }),
  //   drop(item: iDraggedItem, monitor) {
  //     if (!monitor.isOver({ shallow: true })) {
  //       return;
  //     }
  //     const hoverBoundingRect = ref.current?.getBoundingClientRect();
  //     console.log("hoverBoundingRect.top", hoverBoundingRect?.top);
  //     const clientOffset = monitor.getClientOffset();
  //     console.log("clientOffset", clientOffset?.x);
  //     onMove(item.id, (parent?.children?.length ?? 0) + 1, parent?.id);
  //   },
  //   canDrop(item) {
  //     return ancestors.indexOf(item.id) < 0;
  //   }
  // });
  // const opacity = isOver ? 1 : 0;
  // const height = isOver ? 30 : 5;
  // drop(ref);
  return (
    <div
      ref={ref}
      className="placeholder"
      style={{
        border: "1px dotted blue",
        // opacity,
        width: 150,
        height: 5
      }}
    />
  );
}
