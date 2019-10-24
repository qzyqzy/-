/*
 * @Description: 策略模式
 * @Author: 小鱼
 * @Date: 2019-10-24 16:04:03
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-24 16:10:48
 */
// 策略模式
// 定义一系列的算法，把他们一个个封装起来，并且是他们可以相互替换

// 绩效为 S的人年终奖有 4倍工资，绩效为 A的人年终奖有 3倍工资，而绩效为 B的人年终奖是 2倍工资

let strategies = {
    A: function (salary) {
        return salary * 3
    },
    B: function (salary) {
        return salary * 2
    },
    S: function (salary) {
        return salary * 4
    }
}

let calculateBonus = function (level, salary) {
    return strategies[level](salary);
};
console.log(calculateBonus('S', 20000)); // 80000
console.log(calculateBonus('A', 10000)); // 30000