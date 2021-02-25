import React, {useState} from "react";
import {DragDropContext} from "react-beautiful-dnd";

import Column from "./components/column";
import {initalData} from "./state";

const TodoList = () => {
  const {tasks, columnOrder, columns} = initalData;
  const [nowTasks, setNowTasks] = useState(tasks);
  const [nowOrder, setNowOrder] = useState(columnOrder);
  const [allColumn, setAllColumn] = useState(columns);

  const dragEnd = (e) => {
    const {destination, source, draggableId} = e;
    if (!destination) return;
    if (destination.droppableId === source.droppableId&&
      destination.index === source.index) {
      return;
    }
    setAllColumn((allColumn)=>{
      const newColumn = JSON.parse(JSON.stringify(allColumn));
      const out = newColumn[source.droppableId]["taskIds"]
          .splice(source.index, 1);
      newColumn[destination.droppableId]["taskIds"]
          .splice(destination.index, 0, out[0]);
      return newColumn;
    });
  };
  return (
    <DragDropContext
      onDragEnd={(e)=>dragEnd(e)}
    >
      <div style={{display: "flex", justifyContent: "center"}}>
        {nowOrder.map((x) => {
          const {id, taskIds, title} = allColumn[x];
          const task = taskIds.map((task) => nowTasks[task]);
          return <Column key={x.id} id={id} title={title} tasks={task} />;
        })}
      </div>
    </DragDropContext>
  );
};

export default TodoList;
