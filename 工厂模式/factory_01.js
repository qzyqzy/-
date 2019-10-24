/*
 * @Description: 工厂模式
 * @Author: 小鱼
 * @Date: 2019-10-23 10:26:47
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-24 09:50:32
 */
// 简单工厂、复杂工厂


/* 
    简单工厂模式
    给定不同的原材料 加工出给定的产品
*/
// 咖啡机 
// 给定咖啡豆与水 加工出不同比例的咖啡
function makeCoffe(dou, water) {
    let coffe = new Object();
    coffe.dou = dou;
    coffe.water = water;
    coffe.bili = (dou / water).toFixed(2);
    return coffe
}

let coffe1 = makeCoffe(1,10);
console.log('coffe1的浓度为', coffe1.bili) // coffe1的浓度为 0.10

let coffe2 = makeCoffe(2, 6);
console.log('coffe2的浓度为', coffe2.bili) // coffe2的浓度为 0.33