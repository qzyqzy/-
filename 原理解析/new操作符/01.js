/*
 * @Description: new 操作符
 * @Author: 小鱼
 * @Date: 2019-11-13 16:57:00
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-11-13 17:15:25
 */
//  先通过例子了解一下new的作用

function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.say = function () {
    console.log('我的名字是', this.name, '我的年纪是', this.age)
}

new Person('qzy', 18).say() // 我的名字是 qzy 我的年纪是 18


// 构造函数内部存在返回值时

function Person1(name, age) {
    this.name = name;
    this.age = age;
    return '12345'
}
Person1.prototype.say = function () {
    console.log('我的名字是', this.name, '我的年纪是', this.age)
}

new Person1('qzy1', 19).say() // 我的名字是 qzy1 我的年纪是 19


function Person2(name, age) {
    this.name = name;
    this.age = age;
    return {
        name: 'name',
        age: 'age'
    }
}
Person2.prototype.say = function () {
    console.log('我的名字是', this.name, '我的年纪是', this.age)
}

// new Person2('qzy2', 20).say() // error

// 从上面一个例子中我们可以得出这些结论：

// new 通过构造函数 Person 创建出来的实例可以访问到构造函数中的属性
// new 通过构造函数 Person 创建出来的实例可以访问到构造函数原型对象中的属性，也就是说通过 new 操作符，实例与构造函数通过原型链连接了起来
// 当构造函数 Person 并没有显式 return 任何值（默认返回 undefined）
// 构造函数如果返回原始值（你可以试试其他的原始值，结果还是一样的），那么这个返回值毫无意义
// 构造函数如果返回值为对象，那么这个返回值会被正常使用
