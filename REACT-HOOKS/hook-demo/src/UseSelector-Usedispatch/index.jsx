import React from 'react'
import { useSelector, useDispatch } from "react-redux";

const Usedispatch = () => {
  const state = useSelector(state=>state);
  const dispatch = useDispatch();
  const asyncfunc = () =>{
    dispatch({ type: 'increase' })
    setTimeout(()=>{
      dispatch({ type: 'toggle' })
      dispatch({ type: 'decrease' })
    },1000)
  }
  return (
    <div>
      <div>{state.num}-----{state.who}-----{JSON.stringify(state.go)}</div>
      <input
        type="checkbox"
        value={state.go}
        onChange={() => asyncfunc()}
      />
    </div>
  );
};

export default Usedispatch
