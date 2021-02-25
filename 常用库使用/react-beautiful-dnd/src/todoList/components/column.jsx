import React from "react";
import {Droppable} from "react-beautiful-dnd";
import Task from "./task";

const Column = ({id, title, tasks}) => (
  <div
    style={{
      width: 200,
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
    }}
  >
    <div>{title}</div>
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div
            style={{
              background: snapshot.isDraggingOver ? "lightgreen" : "grey",
            }}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} {...task} index={index} />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default Column;
