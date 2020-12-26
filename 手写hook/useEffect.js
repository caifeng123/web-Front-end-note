// const useEffect(() => {
//   effect
//   return () => {
//     cleanup
//   }
// }, [input])
import { effects } from './index'
const useEffect = (fun, dep) => {
  effects.push({ dep, fun })
}