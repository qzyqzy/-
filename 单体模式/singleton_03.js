/*
 * @Description: 惰性单体
 * @Author: 小鱼
 * @Date: 2019-10-22 19:40:31
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-22 20:03:38
 */
// 惰性单体
// 模拟ajax
let Ajax=function(){}
Ajax.post=function(url,fn){
    console.log(1)
    if(url){
        fn('qzy',18)
    }
}

let getStudentData=function(){
     // 利用闭包是单体有自己的私有局部变量
    let userData=''
    function init(){
        let name = '';
        let age = '';
        Ajax.post(true, function (name1, age1) {
            name = name1;
            age = age1;
        })
        return {
            name: name,
            age: age
        }
    }
    return {
        getInstance:function(){
            if (userData){
                return userData
            }else{
                userData = init()
                return userData
            }
        }
    }
}()
console.log(getStudentData.getInstance().name)// 1 qzy
console.log(getStudentData.getInstance().name)// qzy
