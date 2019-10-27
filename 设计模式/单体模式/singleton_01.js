/*
 * @Description: 单体模式
 * @Author: 小鱼
 * @Date: 2019-10-22 19:24:01
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-22 19:30:54
 */
// 单体模式(singleton)是javascript中最基本但又最有用的模式之一
// 它可能比其他任何模式都更常用
// 单体是一个用来划分命名空间并将一批相关属性和方法组织在一起的对象
// 如果它可以被实例化，那么它只能被实例化一次

// 用途
// 可以用来划分命名空间，以减少网页中全局变量的数目。我们所熟知的浏览器的window对象就是一个单例，在JavaScript开发中，对于这种只需要一个的对象，我们的实现往往使用单例

// 单体对象由两部分组成：包含着方法和属性成员的对象自身，以及用于访问它的变量。这个变量通常是全局性的，以便在网页的任何地方都能直接访问到它所指向的单体对象。

// 最简单的单体

let commomInfor = {

}
commomInfor.student = {
    name: 'qzy',
    age: '16',
    forte: function () {
        console.log('学习')
    }
}
commomInfor.teacher = {
    name: 'wuyan',
    age: '28',
    forte: function () {
        console.log('教学')
    }
}
commomInfor.student.forte();//学习
commomInfor.teacher.forte();//教学