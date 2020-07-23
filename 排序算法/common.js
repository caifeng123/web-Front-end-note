/*
 * @Author: cc123nice
 * @Date: 2020-07-11 11:05:47
 * @LastEditTime: 2020-07-13 10:44:06
 * @Description: my progamme description
 * @FilePath: \排序算法\common.js
 */ 

//静态数组
let arr =[]
let len = -Infinity

/**
 * @description: 随机生成数组
 * @param {Number} start  起始位置
 * @param {Number} end    终止位置
 * @param {Number} num    个数
 * @return: {Array}       随机生成的数组
 */
const create = (start,end,num) =>{
  for(let i = 0;i<num;i++){
    arr.push(Math.random()*(end-start)+start|0)
  }
}

/**
 * @description: 生成升序数组
 * @param {Number} start  起始位置
 * @param {Number} end    终止位置
 * @return: {Array}       升序数组
 */
const createAsce = (start,end) =>{
  for(let i = start;i<=end;i++){
    arr.push(i)
  }
}


/**
 * @description: 打印排序算法的耗时
 * @param {Function} fun 
 */
const sortTime = (fun) => {
  let last = new Date()
  fun(arr.slice())
  let now = new Date()
  console.log(fun,`运行时间${now-last}`)
}

/**
 * @description: 打印排序算法的耗时
 * @param {Function} fun 
 */
const sortDetail = (fun) => {
  console.log(arr)
  let last = new Date()
  let myarr = fun(arr.slice())
  let now = new Date()
  console.log(myarr)
  console.log(fun,`运行时间${now-last}`)
}

/**
 * @description: 检验正确性
 * @param {Function} fun 
 */
const isAsce = (fun) => {
  let myarr = fun(arr.slice())
  for(let i = 1;i<myarr.length;i++){
    if(myarr[i-1]>myarr[i]){
      console.log('憨憨 错了')
      return;
    }
  }
  console.log('哟 对了')
}

module.exports = {
  create,
  createAsce,
  sortTime,
  isAsce,
  sortDetail
}