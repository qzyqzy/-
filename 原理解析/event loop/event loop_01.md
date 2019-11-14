进入正文
#### 内存的划分

在一个经典的计算机系统架构中，程序在运行时会把分配到的内存划分成四个区块，分别是：Code区块、Static/Global区块、Stack区块以及Heap区块

- Code区块：用于装载程序运行的指令，其实就是你编写的代码最终编译成的机器指令
- Static/Global区块（以下简称：Static区块）：用于存放全局变量。定义在这里的变量可以在任何函数中都能够访问得到
- Stack区块：即Call Stack (函数调用栈)，用于存放函数运行时的数据信息。包括：函数调用时的参数、函数内定义的变量、函数运行结束后返回的地址等
- Heap区块：函数运行时的基本数据类型的数据会直接保存在Stack中，而对象类型的数据则会在Heap区块中分配内存进行存储，然后返回分配内存的起始地址以保存在Stack中声明的变量中以便后续访问

#### Stack（函数调用栈）

Stack是一个典型的栈类型数据结构（FILO：First In Last Out）。当JavaScript中的函数运行时，会往Stack栈中Push一段数据，这段数据我们称之为Stack Frame，当函数运行结束后，会将该函数对应的Stack Frame数据段Pop出栈。所以，函数间的嵌套调用就会在Stack栈中堆叠一摞的Stack Frame数据段

看如下示例

    function foo() {
        console.log('foo')
    }
    
    function bar() {
        foo()
        console.log('bar')
    }
    
    function baz() {
        bar()
        console.log('baz')
    }
    
    baz() // foo bar baz
我们来看一下这段代码在运行过程中Stack区块的变化情况

1. 程序准备执行，分配并划分内存空间，将代码指令装载进Code区块并开始执行。假设此时代码块的执行函数名为main，那么JavaScript Runtime会先将Stack Frame(main)压入Stack栈中，然后开始调用baz函数。![image](38348F57A9DB4DB0B0E02CDE01EBCA9E)
2. 调用baz函数，将Stack Frame(baz)压入Stack栈中![image](E2978F93685B46FBAD8D116350B21BD0)
3. baz调用bar函数。将Stack Frame(bar)压入Stack栈中![image](6DD0D46891744E37AAB70FBCC14EF446)
4. bar调用foo函数。将Stack Frame(foo)压入Stack栈中![image](56B614ACEA7A449AB0DB29090AE1D657)
5. foo调用console.log函数。将Stack Frame(log)压入Stack栈中![image](415946D258BD46F5A6FCD1D698D7D3D3)
6. console.log函数在控制台打印出‘foo’，执行完毕后将Stack Frame(log)推出Stack栈![image](B660B9DF8D294EE4BBBD4D8A9EE62BB2)
7. foo函数执行完毕，将Stack Frame(foo)推出Stack栈![image](CE56B0E1EC07451E80E15D936E73A0D1)
8. bar调用console.log函数。将Stack Frame(log)压入Stack栈中![image](E6A103D139834C259DADF2690AFC236A)
9. console.log函数在控制台打印出‘bar’，执行完毕后将Stack Frame(log)推出Stack栈![image](6EBF9C9C64A94975B206CD8B6CA38636)
10. bar函数执行完毕，将Stack Frame(bar)推出Stack栈![image](D4F3F2BFF3E340EDB11ECBD79A9C297F)
11. baz调用console.log函数。将Stack Frame(log)压入Stack栈中![image](E3BB692490DC464EA5E1145BFAEF6505)
12. console.log函数在控制台打印出‘baz’，执行完毕后将Stack Frame(log)推出Stack栈![image](372D816F879A43D38ACBA3CE72C0F94D)
13. baz函数执行完毕，将Stack Frame(baz)推出Stack栈![image](4DA57D7A5756472FA064A0CD2AB05FC3)
14. 程序运行结束，将Stack Frame(main)推出Stack栈，Code区块和Stack区块均使用完毕等待被GC回收![image](FBBACEE4D9824DDE837DB77B23A4D187)

#### Stack Overflow（栈溢出）

很多人也碰到过栈溢出（Stack Overflow）的问题。那么为什么会有栈溢出的情况发生呢？因为Stack栈的大小是在程序运行开始前就已经确定下来不可变更的，所以当你往栈中存放的数据超出栈的最大容量时，就会发生栈溢出的情况。通常的原因都是因为代码的Bug导致函数无限循环嵌套调用

    function foo() {
        foo()
    }
    foo()
