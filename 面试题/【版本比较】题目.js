/*
 * @Author: cc123nice
 * @Date: 2020-10-13 19:13:59
 * @LastEditTime: 2020-10-13 19:36:03
 * @Description: my progamme description
 * @FilePath: \web-Front-end-note\test.js
 */
function compareVersions(v1, v2) {
  let arr1 = v1.split('.');
  let arr2 = v2.split('.');
  let i = 0;
  while(i<arr1.length&&i<arr2.length){
    if((arr1[i]-0)==(arr2[i]-0))
      i++
    else
      return arr1[i]>arr2[i]?1:-1
  }
  if(arr1.length==arr2.length||)
    return 0
  return arr1.length>arr2.length?1:-1
};
console.log(compareVersions("0.1","1.1"))
console.log(compareVersions("1.0.1","1"))
console.log(compareVersions("7.5.2.4","7.5.3"))
console.log(compareVersions("1.01","1.001"))
console.log(compareVersions("1.0","1.0.0"))
