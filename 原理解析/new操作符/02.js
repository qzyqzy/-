/*
 * @Description:new 操作符
 * @Author: 小鱼
 * @Date: 2019-11-13 17:18:38
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-11-13 17:33:20
 */
// new操作符到底干了点啥呢？
// 1. 创建一个新对象
// 2. 将构造函数的作用域赋给新对象（因此this就指向了新对象）
// 3. 执行构造函数中的代码（为这个新对象添加属性）
// 4. 返回新对象

// constructor 构造函数  params参数
function MyNew(constructor,...params){
    // 1. 创建一个空对象，继承构造函数的 prototype 属性
    let context = Object.create(constructor.prototype)

    // 2、3  执行构造函数
    let result = constructor.apply(context, params);

    //4. 如果返回结果是对象，就直接返回，否则返回 context 对象
    return (typeof result === 'object' && result != null) ? result : context;

}
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.say = function () {
    console.log('我的名字是', this.name, '我的年纪是', this.age)
}
MyNew(Person, 'qzy', 19).say()