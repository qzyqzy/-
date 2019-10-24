/*
 * @Description: 观察者模式
 * @Author: 小鱼
 * @Date: 2019-10-24 11:21:59
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-24 14:24:42
 */
// 通知班级的学生大扫除
// 具体到A组撒水,b组扫地...其他去买水

let lk = {
    typeTarget: {

    },
    // 添加用户
    addUser: function (type, target, action) {
        let userObj = {
            target: target,
            action: action
        }
        if (type) {
            // 初始值
            if (!this.typeTarget[type]) {
                this.typeTarget[type] = []
            }
            this.typeTarget[type].push(userObj)
        } else {
            this.typeTarget['other'] = this.typeTarget['other'] || []
            this.typeTarget['other'].push(userObj)
        }
    },
    // 发布消息
    publisgMsg: function (type, msg) {
        let typeArr
        if (type) {
            typeArr = this.typeTarget[type]
        } else {
            typeArr = this.typeTarget['other']
        }
        let len = typeArr.length
        if (len) {
            for (let i = 0; i < len; i++) {
                let userObj = typeArr[i]
                let target = userObj.target;
                let action = userObj.action;
                action.call(target, msg)
            }
        }

    }

}

// 声明用户
let stu1 = { name: '小明' }
let stu2 = { name: '小花' }
let stu3 = { name: '小黄' }

// 添加用户
lk.addUser("A", stu1, function (msg) {
    console.log('已发送', this.name, msg)
})
lk.addUser("B", stu2, function (msg) {
    console.log('已发送', this.name, msg)
})
lk.addUser("", stu3, function (msg) {
    console.log('已发送', this.name, msg)
})
//开始广播
lk.publisgMsg("A", "撒水")
lk.publisgMsg("B", "扫地")
lk.publisgMsg("", "买水")