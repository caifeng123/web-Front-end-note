import React,{useReducer} from 'react'
import myreducer from './myreducer'

const Usereducer = () => {
  const initialState = {count:1,name:'cc'}
  const [state, dispatch] = useReducer(myreducer, initialState)
  return (
    <div>
      {state.count}----{state.name}
      <div>
        <button onClick={()=>dispatch({type:'add'})}>add</button>
        <button onClick={()=>dispatch({type:'sub'})}>sub</button>
        <button onClick={()=>dispatch({type:'changename',name:'mumu'})}>changename</button>
      </div>
    </div>
  )
}

export default Usereducer
