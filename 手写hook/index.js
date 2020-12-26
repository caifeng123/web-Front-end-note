export const states = []
export const effects = []

export const render = () => {
  console.log('render')

  // states = new Proxy(states, {
  //   set(target, prop, val) {
  //     Reflect.set(target, prop, val)
  //     for(let i of effects){
  //       const {fun,dep} = i
  //       if(dep.includes(prop)){
  //         fun()
  //       }
  //     }
  //   }
  // })
}
