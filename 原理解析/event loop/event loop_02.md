#### 为什么JavaScript是单线程的
JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。

JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题

比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也应该不会改变
#### 任务队列
单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着

如果排队是因为计算量大，CPU忙不过来，倒也算了，但是很多时候CPU是闲着的，因为IO设备（输入输出设备）很慢（比如Ajax操作从网络读取数据），不得不等着结果出来，再往下执行

JavaScript语言的设计者意识到，这时主线程完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去

于是，所有任务可以分成两种，一种是同步任务，另一种是异步任务。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

具体来说，异步执行的运行机制如下
    
js执行引擎只有一个主线程执行代码逻辑，遇到需要异步执行的任务代码，会将其添加事件队列中。当主线程空闲时，轮询事件队列中可以执行的任务，将其放到主线程进行执行，以此类推，直到事件队列中无可执行的任务![image](B15A78A9766447A48C469031F784CB8B)

JS引擎只是执行事件队列中的异步代码，但事件队列中的信息来源并不是JS引擎，而是由浏览器中的其他相关线程产生的，如下图所示![image](43A5749201DC4C1082CC6981A100FD82)
###### 以 http 传输线程为例
最常见的就是 js 代码发出 ajax 请求，然后就是交给浏览器的http线程去处理了，当后端有数据返回时，http 线程在事件队列中生成一个数据已ready好的事件，等待 JS 主线程空闲时执行。

再比如，我们常见的click，mouse事件，都是GUI 事件触发线程生成的。当用户点击页面时，GUI 事件触发线程就会在事件队列中生成一个click事件，等待 JS 主线程空闲时执行。

#### event loop

event loop是一个执行模型，在不同的地方有不同的实现。浏览器和NodeJS基于不同的技术实现了各自的Event Loop
##### 宏队列
宏队列，macrotask，也叫tasks。 一些异步任务的回调会依次进入macro task queue，等待后续被调用，这些异步任务包括

- setTimeout
- setInterval
- setImmediate (Node独有)
- requestAnimationFrame (浏览器独有)
- I/O
- UI rendering (浏览器独有)

##### 微队列
微队列，microtask，也叫jobs。 另一些异步任务的回调会依次进入micro task queue，等待后续被调用，这些异步任务包括

- process.nextTick (Node独有)
- Promise
- Object.observe
- MutationObserver

##### 流程
再讲执行一个JavaScript代码的具体流程

1. 执行全局Script同步代码，这些同步代码有一些是同步语句，有一些是异步语句（比如setTimeout、Promise等）。setTimeout事件进入宏队列、Promise时间进入微队列。
2. 全局Script代码执行完毕后，调用栈Stack会清空
3. 从微队列microtask queue中取出位于队首的回调任务，放入调用栈Stack中执行，执行完后microtask queue长度减1
4. 继续取出位于队首的任务，放入调用栈Stack中执行，以此类推，直到直到把microtask queue中的所有任务都执行完毕。注意，如果在执行microtask的过程中，又产生了microtask，那么会加入到队列的末尾，也会在这个周期被调用执行
5. microtask queue中的所有任务都执行完毕，此时microtask queue为空队列，调用栈Stack也为空
6. 取出宏队列macrotask queue中位于队首的任务，放入Stack中执行
7. 执行完毕后，调用栈Stack为空
8. 重复第3-7个步骤
9. 这就是浏览器的事件循环Event Loop

#### demo

几个例子实验一下
###### 一、

    console.log(1)
    setTimeout(() => {
        console.log(2)
    })
    console.log(3)
代码执行效果为1 3 2

- 执行全局script代码
-先执行同步代码 console.log(1)
- 执行到setTimeout为异步执行、放入宏队列中，等待主线程执行完毕
- 执行同步代码console.log(3)
- 主线程执行完毕 执行微队列、微队列为空、执行setTimeout中的代码

##### 二、

    console.log(1)
    setTimeout(() => {
        console.log(2)
    })
    Promise.resolve().then(() => {
        console.log(3)
    })
    console.log(4)
运行结果为 1 4 3 2。此时微队列中存事件

##### 三、

    console.log(1)
    setTimeout(() => {
        console.log(2)
    })
    Promise.resolve().then(() => {
        console.log(3)
    })
    console.log(4)
    setTimeout(() => {
        console.log(5)
    })
    // 1 4 3 2 5
##### 四、

    console.log(1)
    setTimeout(() => {
        console.log(2)
    })
    Promise.resolve().then(() => {
        console.log(3)
    })
    Promise.resolve().then(() => {
        console.log(4)
    })
    console.log(5)
    setTimeout(() => {
        console.log(6)
    })
    // 1 5 3 4 2 6
##### 五、

    console.log(1)
    setTimeout(() => {
        console.log(2)
    })
    Promise.resolve().then(() => {
        console.log(3)
        Promise.resolve().then(() => {
            console.log(4)
        })
    })
    Promise.resolve().then(() => {
        console.log(5)
    })
    console.log(6)
    setTimeout(() => {
        console.log(7)
    })
    // 1 6 3 5 4 2 7
    
在执行微队列微队列中任务的时候，如果又产生了microtask，那么会继续添加到队列的末尾，也会在这个周期执行，直到microtask queue为空停止

浏览器的Event Loop就到这里，NodeJS中的Event Loop，它更复杂一些，机制也不太一样.




    