/*
 * @Description: 复杂工厂
 * @Author: 小鱼
 * @Date: 2019-10-24 09:51:05
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-24 10:25:54
 */
// 复杂工厂

// 假设品牌FruitMaker要生成水果汁

// 设计工厂
function FruitMaker() { }

// 设备工厂具备能力-扩展生产线
FruitMaker.prototype.extend = function (obj) {
    for (let key in obj) {
        this[key] = obj[key]
    }
}

FruitMaker.prototype.extend({
    Apple: function (mater) {
        return {
            mater: mater,
            product: '这是苹果汁'
        }
    },
    Pear: function (mater) {
        return {
            mater: mater,
            product: '这是梨汁'
        }
    }
})

// 生产
// kind-要生产的种类   mater-原料 
FruitMaker.prototype.make = function (kind, mater) {
    //检测是否具有生产的能力
    if (typeof this[kind] === 'function') {
        let kindFun = this[kind]
        let kindData = new kindFun(mater)
        return kindData

    } else {
        console.log('暂不支持' + kind + '的生产')
    }
}


// 开始使用

let maker = new FruitMaker();
let maker1 = maker.make('Apple', '一个苹果,两杯水');
console.log('使用', maker1.mater, '生成了', maker1.product); //使用 一个苹果, 两杯水 生成了 这是苹果汁


let maker2 = maker.make('Pear', '一个梨,两杯水');
console.log('使用', maker2.mater, '生成了', maker2.product);// 使用 一个梨,两杯水 生成了 这是梨汁


let maker3 = maker.make('Orange', '一个橘子,两杯水');// 暂不支持Orange的生产