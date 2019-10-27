/*
 * @Description: 属性与方法
 * @Author: 小鱼
 * @Date: 2019-10-27 17:32:10
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-27 17:54:58
 */
// 属性与方法

// 构造函数通过this设置属性与方法 

function Person(name, age, skill) {
    // 大概隐式声明 this
    // this = new Object()
    this.name = name;
    this.age = age;
    this.skill = skill;
    this.showSkill = function () {
        console.log(this.name, '的技能是', this.skill)
    }
    // return this
}

let p = new Person('小花', 18, '种花')
p.showSkill();// 小花 的技能是 种花

let p1 = new Person('小明', 18, '种树')
p1.showSkill();// 小明 的技能是 种树


// 实例属性、实例方法 实例对象调用的
// 实例属性  p.name  p.age
// 实例方法 p.showSkill


// 静态属性 静态方法
// 定义在构造函数上的
// 函数也是对象 可以添加属性 此时的属性为静态属性

// 查看生成了几个实例对象

// dogCount 静态属性
// showDogCount  静态方法
function Dog(name) {
    this.name = name;

    if (Dog.dogCount) {
        Dog.dogCount++
    } else {
        Dog.dogCount = 1
    }
    console.log(Dog.dogCount)
}
Dog.showDogCount = function () {
    console.log('已经生成了', Dog.dogCount, '个实例对象')
}
let dog1 = new Dog('xiao');
Dog.showDogCount();// 已经生成了 1 个实例对象
let dog2 = new Dog('hua');
Dog.showDogCount();// 已经生成了 2 个实例对象
