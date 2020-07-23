/*
 * @Author: cc123nice
 * @Date: 2020-07-11 11:06:49
 * @LastEditTime: 2020-07-20 10:39:41
 * @Description: my progamme description
 * @FilePath: \排序算法\sort\main.js
 */ 

const {isAsce,sortTime,create,createAsce,sortDetail} = require ('./common')
const {
  bubble1,
  bubble2,
  bubble3,
  select,
  select1,
  heap,
  insert,
  merge,
  fast,
  shell
} = require('./sort')

// create(0,100000,800000)
createAsce(0,800000)
// sortTime(bubble1)
// sortTime(insert)
// sortTime(bubble2)
sortTime(bubble3)
// sortTime(select1)
// sortTime(select)
sortTime(heap)
// sortTime(fast)
sortTime(merge)
sortTime(shell)

// isAsce(shell)