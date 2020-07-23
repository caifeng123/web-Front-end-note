/*
 * @Author: cc123nice
 * @Date: 2020-07-11 10:17:47
 * @LastEditTime: 2020-07-13 11:22:01
 * @Description: my progamme description
 * @FilePath: \排序算法\sort.js
 */

/**
 * @description: 冒泡排序1 最蠢两两比较替换
 * @param {Array} arr
 * @return: {Array}
 */
const bubble1 = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 1; j <= i; j++) {
      if (arr[j] < arr[j - 1]) {
        let tmp = arr[j]
        arr[j] = arr[j - 1]
        arr[j - 1] = tmp
      }
    }
  }
  return arr
}


/**
 * @description: 冒泡排序2 避免升序比较 利用boolean
 * @param {Array} arr
 * @return: {Array}
 */
const bubble2 = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let change = true
    for (let j = 1; j <= i; j++) {
      if (arr[j] < arr[j - 1]) {
        change = false
        let tmp = arr[j]
        arr[j] = arr[j - 1]
        arr[j - 1] = tmp
      }
    }
    if (change) break
  }
  return arr
}


/**
 * @description: 冒泡排序3 
 * @param {Array} arr
 * @return: {Array}
 */
const bubble3 = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let lastIndex = 0
    for (let j = 1; j <= i; j++) {
      if (arr[j] < arr[j - 1]) {
        let tmp = arr[j]
        arr[j] = arr[j - 1]
        arr[j - 1] = tmp
        lastIndex = j
      }
    }
    i = lastIndex
  }
  return arr
}

/**
 * @description: 选择排序
 * @param {Array} arr
 * @return: {Array}
 */
const select = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex])
        minIndex = j
    }
    let tmp = arr[minIndex]
    arr[minIndex] = arr[i]
    arr[i] = tmp
  }
  return arr
}

const select1 = (arr) => {
  for (let i = 0; i < (arr.length >> 1); i++) {
    // console.log(arr,i)
    let minIndex = i
    let maxIndex = arr.length - 1 - i
    if (arr[maxIndex] < arr[minIndex]) {
      let tmp = arr[minIndex]
      arr[minIndex] = arr[maxIndex]
      arr[maxIndex] = tmp
    }
    // console.log(minIndex,maxIndex,arr[minIndex],arr[maxIndex])
    for (let j = i + 1; j < arr.length - i - 1; j++) {
      if (arr[j] < arr[minIndex])
        minIndex = j
      if (arr[j] > arr[maxIndex])
        maxIndex = j
      // console.log(minIndex,maxIndex)
    }
    // console.log(minIndex,maxIndex,arr[minIndex],arr[maxIndex],i,arr.length-1-i)
    let tmp = arr[minIndex]
    arr[minIndex] = arr[i]
    arr[i] = tmp
    // if(i ===maxIndex ){
    //   maxIndex=minIndex
    // }
    tmp = arr[maxIndex]
    arr[maxIndex] = arr[arr.length - 1 - i]
    arr[arr.length - 1 - i] = tmp
  }
  return arr
}

/**
 * @description: 堆排序
 * @param {Array} arr
 * @return: {Array}
 */
const heap = (arr) => {
  let len = arr.length
  for (let i = (len >> 1) - 1; i >= 0; i--) {
    shiftdown(i)
  }
  while (len > 1) {
    let tmp = arr[0]
    arr[0] = arr[--len]
    arr[len] = tmp
    shiftdown(0)
  }
  function shiftdown(index) {
    let nowval = arr[index]
    let leaf = len >> 1
    while (index < leaf) {
      let maxIndex = (index << 1) + 1
      let max = arr[maxIndex]
      let right = maxIndex + 1
      right < len && arr[right] > max && (max = arr[maxIndex = right])
      if (nowval > max) break
      arr[index] = max
      index = maxIndex
    }
    arr[index] = nowval
  }
}

/**
 * @description: 插入排序
 * @param {Array} arr
 * @return: {Array}
 */
const insert = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    let move = arr[i]
    let moveIndex = insertIndex(i)
    for (let j = i; j > moveIndex; j--) {
      arr[j] = arr[j - 1]
    }
    arr[moveIndex] = move
  }
  return arr
  function insertIndex(index) {
    let left = 0
    let right = index
    while (left < right) {
      let mid = (left + right) >> 1
      if (arr[mid] > arr[index]) {
        right = mid
      } else {
        left = mid + 1
      }
    }
    return left
  }
}

/**
 * @description: 归并排序
 * @param {Array} arr
 * @return: {Array}
 */
const merge = (arr) => {
  const sortarr = (begin, end) => {
    if(end-begin < 2)
      return
    let mid = (end + begin) >> 1
    sortarr(begin, mid)
    sortarr(mid, end)
    mergearr(begin, mid, end)
  }
  sortarr(0, arr.length)
  return arr
  function mergearr(begin, mid, end) {
    let leftarr = arr.slice(begin, mid)
    let k = begin
    let i = 0
    let j = mid
    let len = mid-begin
    while (i <len) {
      if (j < end && arr[j] < leftarr[i]  ) {
        arr[k++] = arr[j++]
      } else {
        arr[k++] = leftarr[i++]
      }
    }
  }
}

/**
 * @description: 快速排序
 * @param {Array} arr
 * @return: {Array}
 */
const fast = (arr) =>{
  sort(0,arr.length)
  return arr
  function sort(begin,end){
    if(end-begin<2)
      return
    let mid = getIndex(begin,end)
    sort(begin,mid)
    sort(mid+1,end)
  }
  function getIndex(begin,end){
    let tmp = arr[begin]
    end--
    while(begin<end){
      while(begin<end){
        if(arr[end]<tmp){
          arr[begin++] = arr[end]
          break
        }else{
          end--
        }
      }
      while(begin<end){
        if(arr[begin]>tmp){
          arr[end--] = arr[begin]
          break
        }else{
          begin++
        }
      }
    }
    arr[begin] = tmp
    return begin
  }
}

const shell = (arr) =>{
  //准备步长数组
  // let stepArr = getStepArr()
  let stepArr = getNetStepArr()

  for(let i of stepArr){
    sort(i)
  }
  return arr

  //常规 二分步长 最差n**2
  function getStepArr(){
    let len = arr.length
    while((len>>=1)>0){
      stepArr.push(len)
    }
  }
  //最优步长序列 最差n**(4/3)
  function getNetStepArr(){
    let len = arr.length
    let k = 0,step = 0
    let myarr = []
    while(true){
      if(k%2 == 0){
        let pow = 2**(k>>1)
        step=1+9*(pow**2-pow)
      }else{
        let pow1 = 2**((k-1)>>1)
        let pow2 = 2**((k+1)>>1)
        step = 1+ 8*pow1*pow2-6*pow2
      }
      if(step>=len) break
      myarr.unshift(step)
      k++
    }
    return myarr
  }
  function sort(step){
    for(let col = 0;col<step;col++){
      for(let begin = col+step;begin<arr.length;begin+=step){
        let cur = begin
        while(cur>col && arr[cur]<arr[cur-step]){
          let tmp = arr[cur]
          arr[cur] = arr[cur-step]
          arr[cur-step] = arr[cur]
          cur -= step
        }
      }
    }
  }
  
}

module.exports = {
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
}