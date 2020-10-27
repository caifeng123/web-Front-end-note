

import {reducer1} from reducer1.js
import {reducer2} from reducer1.js
import {reducer3} from reducer1.js

export default {
  reducer1,
  reducer2,
  reducer3
}

const init = {
  num:1,
  who:'0',
  go:true
}
export const reducer1 = function(state = init,action){
  switch(action.type){
    case 'increase':
      const {num,who} = state
      return {...state,num:num + 1,who:who+1}
    case 'decrease':
      return {...state,num:state.num - 1}
    case 'toggle' :
      return {...state,go:!state.go}
    default:
      return state
  }
}