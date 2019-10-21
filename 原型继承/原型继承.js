/*
 * @Description: 原型模式
 * @Author: 小鱼
 * @Date: 2019-10-21 14:14:31
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-21 15:20:38
 */
// 每创建一个函数对象，该函数就会自动带有一个 prototype 属性。该属性是个指针，指向了一个对象，我们称之为 原型对象
// 原型对象上默认有一个属性 constructor，该属性也是一个指针，指向其相关联的构造函数
// 通过调用构造函数产生的实例，都有一个内部属性，指向了原型对象。所以实例能够访问原型对象上的所有属性和方法
function Person(name) {
    this.name = name
    this.getName = () => {
        console.log(this.name)
    }
}
let p1 = new Person('qzy')
p1.getName()// qzy
console.log(Person.prototype.constructor === Person)// true
console.log(p1.__proto__ === Person.prototype)// true

// 实例通过内部指针可以访问到原型对象，原型对象通过constructor指针，又可以找到构造函数。
