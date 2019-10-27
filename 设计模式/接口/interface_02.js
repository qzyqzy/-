/*
 * @Description: 属性检验法
 * @Author: 小鱼
 * @Date: 2019-10-23 11:16:53
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-23 15:03:38
 */
// 属性检验法
// 用注释定义接口

/* 
    interface Person(){
        function add(obj);
    }
    interface Student(){
        function remove(id);
    } 
*/

let interfaceImp = function () {
    // 声明实现的接口
    // interfaceImp 实现了数组中的接口
    this.interfaceImplements = ['Person', 'Student']
}
interfaceImp.prototype.add = function (obj) {
    //...
}
interfaceImp.prototype.remove = function (obj) {
    //...
}

// 对实例对象进行判断、检查实例对象是否实现了所有接口
function checkInterfaceImplement(obj) {
    if (!isImplements(obj, 'Person', 'Student', 'Animal')) {
        console.log('接口没有全部实现！')
        return
    }
}

// 接收不定参数
// 接收一个参数obj是要检查的对象
function isImplements(obj) {
    // obj 检查的对象
    // arguments 包含对象与要检查的接口
    // 第一个元素为要检查的实例对象
    for (let i = 1; i < arguments.length; i++) {
        let interfaceName = arguments[i]
        // 默认没有实现任何接口
        let isImplementStatus = false
        // 循环实例对象中声明实现的接口
        for (let j = 0; j < obj.interfaceImplements.length; j++) {
            if (interfaceName == obj.interfaceImplements[j]) {
                // 接口实现了结束循环
                isImplementStatus = true;
                break;
            }
        }
        if (!isImplementStatus) {
            // 未实现
            return false
        }
    }
    // 都实现了
    return true
}
// 使用实例对象检测
// 此时检测了 三个接口 'Person', 'Student', 'Animal' Animal接口没有实现
checkInterfaceImplement(new interfaceImp()) // 接口没有全部实现！


// 意义
// 能够检测实现哪些接口

// 缺点
// 此时所有检查都能通过，但那个方法却不一定存在
