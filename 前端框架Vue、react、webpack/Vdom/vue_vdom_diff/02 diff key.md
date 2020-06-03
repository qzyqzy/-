##### 为什么不推荐使用index作为key

###### 场景1

假如我们要实现一个列表点击之后翻转的功能


    <body>

        <ul id="app">
            <template v-for="(list,index) in arr">
                <li :key="index">{{list}}</li>
            </template>
            <div>
                <button @click="onBtn">点击翻转数组</button>
            </div>
        </ul>
    </body>
    <script>
        new Vue({
            el: "#app",
            data() {
                return {
                    arr: [1, 2, 3]
                }
            },
            methods: {
                onBtn() {
                    this.arr.reverse()
                }
            }
        })
    </script>

其实是一个很简单的列表组件，渲染出来 1 2 3 三个数字。我们先以 index 作为key，来跟踪一下它的更新

简单写 我们的虚拟节点列表 oldChildren 粗略表示是这样的

    [
            {
                tag: "li",
                key: 0,
                props: {
                    num: 1
                }
            },
            {
                tag: "li",
                key: 1,
                props: {
                    num: 2
                }
            },
            {
                tag: "li",
                key: 2,
                props: {
                    num: 3
                }
            }
    ];

在我们点击按钮的时候，会对数组做 reverse 的操作。那么我们此时生成的 newChildren 列表是这样的


    [
            {
                tag: "li",
                key: 0,
                props: {
    +                num: 3
                }
            },
            {
                tag: "li",
                key: 1,
                props: {
                    num: 2
                }
            },
            {
                tag: "li",
                key: 2,
                props: {
    +                num: 1
                }
            }
    ];

key的顺序没变，1、3传入的值完全变了。这会导致一个什么问题？

本来按照最合理的逻辑来说，**旧的第一个vnode** 是应该直接**完全复用 新的第三个vnode的**，因为它们本来就应该是同一个vnode，自然所有的属性都是相同的

但是在进行子节点的 diff 过程中，会在 旧首节点和新首节点用sameNode对比。 这一步命中逻辑，因为现在新旧两次**首部节点 的 key 都是 0了**

然后把旧的节点中的第一个 vnode 和 新的节点中的第一个 vnode 进行 **patchVnode** 操作

因为此时props值的更改，本来可以直接复用的节点肯定是要做更新节点的操作的，而且如果存在其他依赖的话，也会重新更新，**而这些所有操作（虚拟dom发明的其中一个目的不就是为了减少真实dom的操作么？），都可以通过直接复用 第三个vnode 来避免，是因为我们偷懒写了 index 作为 key，而导致所有的优化失效了**。

**所以此时传递index或者不传递key都会导致优化失效问题**

![image](211E5970921E4B56A4815F3FDEB76186)

从图上的操作我们可以看出，节点1、3是有所更新的

假如我们使用值来做key呢

在我们点击按钮的时候，会对数组做 reverse 的操作。那么我们此时生成的 newChildren 列表是这样的

    [
            {
                tag: "li",
                key: 3,
                props: {
                    num: 3
                }
            },
            {
                tag: "li",
                key: 2,
                props: {
                    num: 2
                }
            },
            {
                tag: "li",
                key: 1,
                props: {
                    num: 1
                }
            }
    ];
    
![apply](209F00918B714C84A57743ACF8D38AC5)


###### 场景2

删除第一个子节点

    
    <body>
        <div id="app">
            <ul>
                <template v-for="(list,index) in arr">
                    <li :key="index">
                        <test></test>
                    </li>
                </template>
            </ul>
            <div>
                <button @click="onBtn">点击删除数组中的第一个</button>
            </div>
        </div>
    </body>
    <script>
        new Vue({
            el: "#app",
            components: {
                test: {
                    template: "<li>{{Math.random()}}</li>"
                }
            },
            data() {
                return {
                    arr: [1, 2, 3]
                }
            },
            methods: {
                onBtn() {
                    this.arr.splice(0, 1);
                }
            }
        })
    </script>

那么一开始的 vnode列表是：

    [
      {
        tag: "li",
        key: 0,
        // 这里其实子组件对应的是第一个 假设子组件的text是1
      },
      {
        tag: "li",
        key: 1,
        // 这里其实子组件对应的是第二个 假设子组件的text是2
      },
      {
        tag: "li",
        key: 2,
        // 这里其实子组件对应的是第三个 假设子组件的text是3
      }
    ];
Vue 对于组件的 diff 是不关心子组件内部实现的，它只会看你在模板上声明的传递给子组件的一些属性是否有更新

我们来看看，点击删除子元素后，vnode 列表 变成什么样了

    [
      // 第一个被删了
      {
        tag: "li",
        key: 0,
        // 这里其实上一轮子组件对应的是第二个 假设子组件的text是2
      },
      {
        tag: "li",
        key: 1,
        // 这里其实子组件对应的是第三个 假设子组件的text是3
      },
    ];

由于对应的 key使用了 index导致的错乱，它会把

1. 原来的第一个节点text: 1直接复用。
2. 原来的第二个节点text: 2直接复用。
3. 然后发现新节点里少了一个，直接把多出来的第三个节点text: 3 丢掉。

至此为止，我们本应该把 text: 1节点删掉，然后text: 2、text: 3 节点复用，就变成了错误的把 text: 3 节点给删掉了。
