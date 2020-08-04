import React from 'react';
import {useDispatch} from 'react-redux'

const App = (props) => {
  console.log(props)
  const dispatch = useDispatch()
  return (
    <>
      {props.num}
      {/* <button onClick={()=>props.increase('1')}>2222</button> */}
      <button onClick={()=>dispatch({type:'increase',who:'2'})}>+</button>
      <button onClick={()=>dispatch({type:'decrease',who:'2'})}>-</button>
      {props.who}
    </>
  );
}

export default App;
