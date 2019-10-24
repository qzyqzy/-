/*
 * @Description: 命令模式
 * @Author: 小鱼
 * @Date: 2019-10-24 17:19:06
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-24 17:35:14
 */
// 命令模式
// 有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系
// 类似点餐
// 客人关注菜单
// 经理负责分配
// 厨师负责做菜

let chef={
    name:'小明',
    make:function(foodType){
        switch (foodType) {
            case '鸡丁':
                console.log(this.name, foodType,'制作')
                break;
            case '拍黄瓜':
                console.log(this.name, foodType,'制作')
                break;
            default:
                console.log(this.name, foodType,'不会制作')
                break;
        }
    }
}

// 服务人员帮客人点餐
let foodList = ['鸡丁','拍黄瓜','盖浇饭']


// 厨师做菜命令
function MakeFoodCommand(foodType){
    this.foodType = foodType
}
MakeFoodCommand.prototype.execute=function(){
    chef.make(this.foodType)
}
// 点餐系统根据点餐列表生成做菜命命令
for (let i = 0; i < foodList.length;i++){
    new MakeFoodCommand(foodList[i]).execute()
}
// 小明 鸡丁 制作
// 小明 拍黄瓜 制作
// 小明 盖浇饭 不会制作


