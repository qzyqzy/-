/*
 * @Description: 属性类型
 * @Author: 小鱼
 * @Date: 2019-11-02 19:10:26
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-11-02 19:45:18
 */
// 属性类型（数据属性和访问器属性）




// 数据属性包含一个数据值的位置。在这个位置可以读取和写入值
// 数据属性有4个描述其行为的特性。
// configurable：表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。
// enumerable 表示能否通过for - in循环返回属性。默认值为true。
// writable 表示能否修改属性的值。默认值为true。
// value 包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。默认值为undefined。
// 直接在对象上定义的属性，configurable、enumerable、writable、[[eritable]]特性都被设置为true，而value特性被设置为指定的值

'use strict'

let person={
    age:18
}
// configurable

// writable
person.age=19;

// enumerable
for (let p in person){
    console.log('key为' + p + ',value是' + person[p])// key为age,value是19
}

delete person.age;

console.log(person.age);// undefined

// 要修改属性默认值的特性必须使用Object.defineProperty()
// 方法这个方法接收三个参数
// 属性所在的对象、属性的名字和一个描述符对象
// 其中，描述符对象的属性必须是：configurable、enumerable、writable和value设置其中的一个或多个值、可以修改对应的特性值
// 在调用 Object.defineProperty()方法时，如果不指定，configurable、enumerable 和 writable 特性的默认值都是 false

let obj={}
Object.defineProperty(obj,'age',{
    value:17
})

console.log(obj.age);// 17

// obj.age=18 error

for (let p in obj) {
    console.log('key为' + p + ',value是' + obj[p])// 
}

// delete obj.age  error





