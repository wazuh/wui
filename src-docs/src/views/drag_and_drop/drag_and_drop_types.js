import React, { useState } from 'react';
import {
  WuiDragDropContext,
  WuiFlexGroup,
  WuiFlexItem,
  WuiDraggable,
  WuiDroppable,
  WuiPanel,
  wuiDragDropMove,
  wuiDragDropReorder,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

const makeId = htmlIdGenerator();

const makeList = (number, start = 1) =>
  Array.from({ length: number }, (v, k) => k + start).map(el => {
    return {
      content: `Item ${el}`,
      id: makeId(),
    };
  });

export default () => {
  const [list1, setList1] = useState(makeList(3));
  const [list2, setList2] = useState(makeList(3, 4));
  const [list3, setList3] = useState(makeList(3, 7));
  const onDragEnd = ({ source, destination }) => {
    const lists = {
      DROPPABLE_AREA_TYPE_1: list1,
      DROPPABLE_AREA_TYPE_2: list2,
      DROPPABLE_AREA_TYPE_3: list3,
    };
    const actions = {
      DROPPABLE_AREA_TYPE_1: setList1,
      DROPPABLE_AREA_TYPE_2: setList2,
      DROPPABLE_AREA_TYPE_3: setList3,
    };
    if (source && destination) {
      if (source.droppableId === destination.droppableId) {
        const items = wuiDragDropReorder(
          lists[destination.droppableId],
          source.index,
          destination.index
        );

        actions[destination.droppableId](items);
      } else {
        const sourceId = source.droppableId;
        const destinationId = destination.droppableId;
        const result = wuiDragDropMove(
          lists[sourceId],
          lists[destinationId],
          source,
          destination
        );

        actions[sourceId](result[sourceId]);
        actions[destinationId](result[destinationId]);
      }
    }
  };
  return (
    <WuiDragDropContext onDragEnd={onDragEnd}>
      <WuiFlexGroup>
        <WuiFlexItem>
          <WuiDroppable
            droppableId="DROPPABLE_AREA_TYPE_1"
            type="TYPE_ONE"
            spacing="m"
            withPanel
            grow={false}>
            {list1.map(({ content, id }, idx) => (
              <WuiDraggable key={id} index={idx} draggableId={id} spacing="m">
                {(provided, state) => (
                  <WuiPanel hasShadow={state.isDragging}>
                    {content}
                    {state.isDragging && ' ✨'}
                  </WuiPanel>
                )}
              </WuiDraggable>
            ))}
          </WuiDroppable>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiDroppable
            droppableId="DROPPABLE_AREA_TYPE_2"
            type="TYPE_ONE"
            spacing="m"
            withPanel
            grow={false}>
            {list2.map(({ content, id }, idx) => (
              <WuiDraggable key={id} index={idx} draggableId={id} spacing="m">
                {(provided, state) => (
                  <WuiPanel hasShadow={state.isDragging}>
                    {content}
                    {state.isDragging && ' ✨'}
                  </WuiPanel>
                )}
              </WuiDraggable>
            ))}
          </WuiDroppable>
        </WuiFlexItem>
        <WuiFlexItem>
          <WuiDroppable
            droppableId="DROPPABLE_AREA_TYPE_3"
            type="TYPE_TWO"
            spacing="m"
            withPanel
            grow={true}>
            {list3.map(({ content, id }, idx) => (
              <WuiDraggable key={id} index={idx} draggableId={id} spacing="m">
                {(provided, state) => (
                  <WuiPanel hasShadow={state.isDragging}>
                    {content}
                    {state.isDragging && ' ✨'}
                  </WuiPanel>
                )}
              </WuiDraggable>
            ))}
          </WuiDroppable>
        </WuiFlexItem>
      </WuiFlexGroup>
    </WuiDragDropContext>
  );
};
