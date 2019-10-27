/*
 * @Description: 继承与聚合
 * @Author: 小鱼
 * @Date: 2019-10-21 15:52:50
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-22 18:59:41
 */

// 继承

// 人员类
function Person(name) {
    this.name = name
}

// 教师类
function Teacher(name, book) {
    Person.call(this, name)
    this.book = book
}
Teacher.prototype = new Person()
// 不加的话  原型对象上默认有一个属性 constructor，该属性也是一个指针，指向其相关联的构造函数 Person
console.log(Teacher.prototype.constructor === Person)// true
Teacher.prototype.constructor = Teacher
Teacher.prototype.books = function() {
    console.log(this.name + this.book)
}
new Teacher('qzy', 'js').books()// qzyjs


