/*
 * @Description: 接口
 * @Author: 小鱼
 * @Date: 2019-10-22 20:30:48
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-23 15:17:00
 */
// 接口提供了一种用以说明一个对象应该具有哪些方法和手段。
// 注解的方法
// 属性检验法
// 鸭式辩型法 

// 1、注释的方法
// 最简单也是最弱的  
// 利用 interface 和 implement 文字 把接口用注解的方式显示的表现出来

// 用注释定义一个接口
/* interface Person(){
    function add(obj);
    function remove(id);
    function find(id);
} */

// 用注释的方式实现
// personUnitl implement Person
let personUnitl = function () {

}
personUnitl.prototype.add = function (obj) {
    //...
}
personUnitl.prototype.remove = function (id) {
    //...
}
personUnitl.prototype.find = function (id) {
    //...
}

// 意义
// 大型的项目靠得就是规范和标准
// 这样的写法可以让你的开发者在没有写实现之前有充分时间做代码的设计和架构

// 缺点
// 人为的遵守  全靠开发者自己的规范

