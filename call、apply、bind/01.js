/*
 * @Description: bind apply call
 * @Author: 小鱼
 * @Date: 2019-10-21 16:49:35
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-21 17:58:47
 */
// 语法 参数可选
// fun.call(this, param1, param2, ...)
// fun.apply(this, [param1,param2,...])
// fun.bind(this, param1, param2, ...)

// call与apply的唯一区别
// apply是以a开头，它传给fun的参数是Array，也是以a开头的。

// call/apply与bind的区别
// call/apply改变了函数的this上下文后马上执行该函数
// bind则是返回改变了上下文后的函数,不执行该函数

// 返回值
// call/apply：fun执行的结果
// 返回fun的拷贝，并拥有指定的this值和初始参数

// 作用
// 改变函数执行时的this指向

// call/apply/bind的核心理念：借用方法
// A对象有个方法，B对象因为某种原因也需要用到同样的方法
// 那么这时候我们是单独为 B 对象扩展一个方法呢，还是借用一下 A 对象的方法呢？
// 当然是借用 A 对象的方法啦，既达到了目的，又节省了内存。
// 这就是call / apply / bind的核心理念：借用方法。
// 借助已实现的方法，改变方法中数据的this指向，减少重复代码，节省内存。
