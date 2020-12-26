import {states,render} from './index'
let index = 0
export const useState = initalValue => {
  states[index] = states[index] || initalValue
  const currentIndex=index
  states[index].__proto__.getIndex = () => currentIndex
  const dispatcher = newVal => {
    states[currentIndex] = newVal
    render()
  }
  return [states[index],dispatcher]
}