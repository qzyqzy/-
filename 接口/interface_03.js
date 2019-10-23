/*
 * @Description: 鸭式辩型法
 * @Author: 小鱼
 * @Date: 2019-10-23 15:17:12
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-23 16:06:03
 */
// 鸭式辩型法 
// 其实，类是否声明自己支持哪些接口并不重要，只要它具有这些接口中的方法就行
// 鸭式辨型（这个名称来自James Whitomb Riley的名言：“像鸭子一样走路并且嘎嘎叫的就是鸭子”）正是基于这样的认识。
// 它把对象实现的 方法集 作作为判断它是不是某个类的实例的唯一标准。
// 这种方法背后的观点很简单：如果对象具有与接口定义的方法同名的所有方法，那么就可以认为它实现了这个接口

// 定义接口类
// 传入参数 接口名 接口要实现方法名称的数组
function Interfaces(InterfaceName, methods) {
    // 参数至少为两个
    if (arguments.length < 2) {
        console.log('参数必须是两个！')
        return
    }
    this.name = InterfaceName;
    this.methods = [];
    // 存入方法名
    for (let i = 0; i < methods.length; i++) {
        this.methods.push(methods[i])
    }
}

// 定义一个静态方法用来检测接口与实现类
// 第一个参数为实现类 余下为接口类
Interfaces.ensureImplement = function (object){
    // 参数至少为两个
    if (arguments.length < 2) {
        console.log('参数必须是两个！')
        return
    }
    // 遍历接口类
    for (let i = 1; i < arguments.length; i++) {
        let interfacs = arguments[i]
        // 默认实现
        let isImplementStatus = true
        // 如果你是接口就必须是Interface类型的
        if (interfacs.constructor !== Interfaces){
            console.log('接口必须为Interfaces实例')
            return 
        }
        for (let j = 0; j < interfacs.methods.length; j++) {
            let methods = interfacs.methods[j]
           
            // 实现类中必须有方法名字 和 接口中所有的方法名项目
            if (!(object[methods] && (typeof object[methods]=='function'))){
                isImplementStatus = false
                break
            }
        }
        if (!isImplementStatus){
            return false
        }  
    }
    return true
}



// 实例化接口对象
// Animal 接口  含有 run jump
// Person 接口  含有 eat edu
let InterfaceAnimal = new Interfaces('Animal', ['run', 'jump']);
let InterfacePerson = new Interfaces('Person', ['eat', 'edu']);


// 实现接口的类 借助辅助函数
let InterfaceImple=function(){}

// 可以删除一个方法 查看检测是否通过
InterfaceImple.prototype.run=function(){
    console.log('run')
}
InterfaceImple.prototype.jump = function () {
    console.log('jump')
}
InterfaceImple.prototype.eat = function () {
    console.log('eat')
}
InterfaceImple.prototype.edu = function () {
    console.log('edu')
}


let InterfaceImpleData = new InterfaceImple();
if (Interfaces.ensureImplement(InterfaceImpleData,InterfaceAnimal)){
    InterfaceImpleData.run()
}
if (Interfaces.ensureImplement(InterfaceImpleData, InterfaceAnimal, InterfacePerson)) {
    InterfaceImpleData.jump()
    InterfaceImpleData.edu()
}

