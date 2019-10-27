/*
 * @Description: 原型链实现继承
 * @Author: 小鱼
 * @Date: 2019-10-21 15:21:00
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-21 15:41:10
 */

function Person(name) {
    this.name = name
}
Person.prototype.speak = function() {
    console.log('姓名：' + this.name + '， 年龄：' + this.age + '， 会说话')
}

function Student(age) {
    this.age = age
}
Student.prototype = new Person('qzy')
Student.prototype.constructor = Student
console.log(Student.constructor === Student)
let s = new Student('18')
s.speak()

