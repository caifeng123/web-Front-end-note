import React from "react";
import {Draggable} from "react-beautiful-dnd";

const Task = ({id, content, index}) => {
  return (
    <div style={{margin: 3}}>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {// eslint-disable-next-line max-len
              <div style={{border: "2px solid #000", background: snapshot.isDragging?"#ccc":"lightgreen"}}>{content}</div>
            }</div>
        )}
      </Draggable>
    </div>
  );
};

export default Task;
