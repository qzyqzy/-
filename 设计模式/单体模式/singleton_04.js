/*
 * @Description: 分支单体
 * @Author: 小鱼
 * @Date: 2019-10-22 20:05:06
 * @LastEditors: 小鱼
 * @LastEditTime: 2019-10-22 20:16:45
 */
// 分支单体
// 在做Ajax的时候根据不同的浏览器获得不同的XHR(XMLHttpRequest)
// 在不同分辨率的情况下初始化不一样的界面(PCAT2)

let screenWidth = window.screen.width;
let screenheigth = window.screen.heigth;
let portalInfo = (function() {
  let $12801024 = "$12801024";
  let $1024768 = "$1024768";
  if (screenWidth == 1280) {
    return $12801024;
  } else if ((screenWidth = 1024)) {
    return $1024768;
  }
})();
console.log(portalInfo);
