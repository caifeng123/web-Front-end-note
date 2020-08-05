import React from 'react';

const App = (props) => {
  return (
    <>
      {props.num}
      <button onClick={()=>props.increase('1')}>2222</button>
      {props.who}
    </>
  );
}

export default App;