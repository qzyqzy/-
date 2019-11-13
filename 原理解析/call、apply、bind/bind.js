/*
 * @Description: bind
 * @Author: 小鱼
 * @Date: 2019-10-21 19:47:24
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-21 19:50:50
 */
function add(a, b) {
    return a + b
}

function sub(a, b) {
    return a - b
}

console.log(add.call(sub, 3, 1))// 4
console.log(add.apply(sub, [3, 1]))// 4
console.log(add.bind(sub, 3, 1)())// 4