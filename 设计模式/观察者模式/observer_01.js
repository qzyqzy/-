/*
 * @Description: 观察者模式
 * @Author: 小鱼
 * @Date: 2019-10-24 11:21:59
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-24 13:58:15
 */
// 观察者模式（发布订阅模式）
// 定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。

// 通知班级的学生大扫除

let lk = {
    targetUser: [],
    // 添加用户
    addUser: function (target, action) {
        let userObj = {
            target: target,
            action: action
        }
        this.targetUser.push(userObj)
    },
    // 发布消息
    publisgMsg: function () {
        for (let i = 0; i < this.targetUser.length; i++) {
            let userObj = this.targetUser[i]
            let target = userObj.target;
            let action = userObj.action;
            action.call(target, '明天大扫除')
        }
    }

}
function respone(msg) {
    console.log('已发送', this.name, msg)
}

// 声明用户
let stu1 = { name: '小明' }
let stu2 = { name: '小花' }

// 添加用户
lk.addUser(stu1, respone)
lk.addUser(stu2, respone)

//开始广播
lk.publisgMsg()