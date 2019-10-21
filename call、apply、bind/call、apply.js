/*
 * @Description: call apply
 * @Author: 小鱼
 * @Date: 2019-10-21 17:59:02
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-21 19:44:49
 */
// 类数组借用数组的方法
let person = {
    name: 'qzy',
    age: 16
}
Array.prototype.push.call(person, 'qzy1', 'qzy2')
console.log(person) // { '0': 'qzy1', '1': 'qzy2', name: 'qzy', age: 16, length: 2 }

// 获取数组最大值最小值
let ageArr = [15, 1, 3, 5, 8, 10, 11, 9, 72, 2]
console.log(Math.max.apply(Math, ageArr))// 72
console.log(Math.min.apply(Math, ageArr))// 1

// 继承

function f(name, price) {
    this.name = name
    this.price = price
}
function Food(name, price, loca) {
    // f.call(this, name, price)
    f.apply(this, [name, price])
    this.loca = loca
}
console.log(new Food('土豆', 15, '中国'))// Food { name: '土豆', price: 15, loca: '中国' }

// 定义一个 log 方法，让它可以代理 console.log 方法，常见的解决方法是：
function log(msg) {
    console.log(msg)
}
log(1) // 1
log(1, 2) // 1

// 参数为多个时
function log1() {
    console.log.apply(console, arguments)
}
log1(1) // 1
log1(1, 2) // 1 2

// 接下来的要求是给每一个 log 消息添加一个"(app)"的前辍，
function log2() {
    let args = Array.prototype.slice.call(arguments)
    args.unshift('(app)')
    console.log.apply(console, args)
}
log2('hello')

// Array.prototype.slice.call(arguments)
let obj = { length: 2, 0: 'first', 1: 'second' }
console.log(Array.prototype.slice.call(obj))//  [ 'first', 'second' ]

obj = { length: 2 }
console.log(Array.prototype.slice.call(obj))