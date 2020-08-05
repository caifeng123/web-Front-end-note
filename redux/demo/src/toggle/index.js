import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Toggle = () => {
  const go = useSelector(state => state.go);
  const dispatch = useDispatch();
  const asyncfunc = () =>{
    setTimeout(()=>{
      dispatch({ type: 'toggle' })
    },1000)
  }
  return (
    <div>
      <div>{JSON.stringify(go)}</div>
      <input
        type="checkbox"
        value={go}
        onChange={() => asyncfunc()}
      />
    </div>
  );
};

export default Toggle;