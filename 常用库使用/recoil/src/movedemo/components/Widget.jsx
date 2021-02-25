import React from "react";

const Widget = ({ position, id ,dragEnd,dragItem}) => {
  const {x, y} = position;
  return (
    <div
      draggable="true"
      onDragEnd={e=>dragEnd(e,dragItem)}
      // onDragOver={e=>dragEnd(e,dragItem)}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 60,
        height: 60,
        fontSize: 14,
        border: '1px solid #ccc',
        background: 'blue'
      }}
    >
      {'widget'}---{id}
    </div>
  );
};

export default Widget;
