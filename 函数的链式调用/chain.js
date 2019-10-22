/*
 * @Description: 函数的链式调用
 * @Author: 小鱼
 * @Date: 2019-10-22 20:42:23
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-22 20:51:53
 */
function Cat1(name) {
    this.name = name;
    this.run = function () {
        console.log(this.name + " start running ");
    };
    this.stopRun = function () {
        console.log(this.name + " stop running ");
    };
    this.sing = function () {
        console.log(this.name + " start singing ");
    };
    this.stopSing = function () {
        console.log(this.name + " stop stopSing ");
    }
}
let cat1=new Cat1('qzy')
cat1.run()
cat1.stopRun()
cat1.sing()
cat1.stopSing()
// qzy start running 
// qzy stop running
// qzy start singing
// qzy stop stopSing

function Cat2(name) {
    this.name = name;
    this.run = function () {
        console.log(this.name + " start running ");
        return this
    };
    this.stopRun = function () {
        console.log(this.name + " stop running ");
        return this
    };
    this.sing = function () {
        console.log(this.name + " start singing ");
        return this
    };
    this.stopSing = function () {
        console.log(this.name + " stop stopSing ");
        return this
    }
}
let cat2 = new Cat2('qzy')
cat2.run().stopRun().sing().stopSing()
// qzy start running
// qzy stop running
// qzy start singing
// qzy stop stopSing