/*
 * @Description: 具有局部变量的强大单体
 * @Author: 小鱼
 * @Date: 2019-10-22 19:40:31
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-22 19:54:34
 */
// 具有局部变量的强大单体
// 模拟ajax
let Ajax=function(){}
Ajax.post=function(url,fn){
    console.log(1)
    if(url){
        fn('qzy',18)
    }
}

let getStudentData=function(){
    let name='';
    let age='';
    Ajax.post(true,function(name1,age1){
        name=name1;
        age = age1;
    })
    return {
        name:name,
        age:age
    }
}
console.log(getStudentData().name)// 1 qzy
console.log(getStudentData().name)// 1 qzy
//  每一次调用getStudentData()  Ajax.post都会执行
//  此时可以用惰性单体
