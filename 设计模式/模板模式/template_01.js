/*
 * @Description: 模板模式
 * @Author: 小鱼
 * @Date: 2019-10-24 16:24:23
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-24 16:50:19
 */
//模板模式
// 一个抽象类公开定义了执行它的方法的方式/模板。它的子类可以按需要重写方法实现
// 来对比下泡茶和泡咖啡过程中的异同
// 泡茶      烧开水   浸泡茶叶   倒入杯子  加柠檬
// 泡咖啡    烧开水   冲泡咖啡   倒入杯子  加糖
// 第二步 第四布有区别 放在子类上重写

function Drink(){}
Drink.prototype.make=function(){
    this.firstStep();
    this.secondStep();
    this.thirdStep();
    this.fourthStep();
}
Drink.prototype.firstStep=function(){
    console.log('烧开水')
}
Drink.prototype.secondStep = function () {
    throw new Error('必须由子类重写这个方法');
}
Drink.prototype.thirdStep = function () {
    console.log('倒入杯子')
}
Drink.prototype.fourthStep = function () {
    throw new Error('必须由子类重写这个方法');
}


// 茶

function Tea(){}
Tea.prototype = new Drink()
Tea.prototype.secondStep=function(){
    console.log('浸泡茶叶')
}
Tea.prototype.fourthStep = function () {
    console.log('加柠檬')
}

let tea = new Tea()
tea.make()
// 烧开水
// 浸泡茶叶
// 倒入杯子
// 加柠檬

// 咖啡
function Coffe() {}
Coffe.prototype = new Drink()
Coffe.prototype.secondStep = function () {
    console.log('冲泡咖啡')
}
Coffe.prototype.fourthStep = function () {
    console.log('加糖')
}
let coffe = new Coffe()
coffe.make()
// 烧开水
// 冲泡咖啡
// 倒入杯子
// 加糖