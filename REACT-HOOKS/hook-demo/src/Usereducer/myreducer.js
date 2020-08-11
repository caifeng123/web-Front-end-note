export default (state,action) => {
  switch(action.type){
    case 'add':
      return {...state,count:state.count + 1};
    case 'sub':
      return {...state,count:state.count - 1};
    case 'changename':
      console.log(action.name)
      return {...state,name:action.name};
    default:
      return state;
  }
}