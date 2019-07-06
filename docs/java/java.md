# Java程序员面试宝典

[[toc]]

## 基本概念

Java语言是一门高级语言，帮助开发人员快速解决现实问题，实现各种业务场景，而不需要精通计算机的内部特性，跨平台，提供了很多类库，面向对象，...

抽象机制  
面向现实的问题，业务实现

### 1. Java语言有哪些优点？你对Java语言的理解？

1. 应用广泛，常年霸榜，生态丰富而完善。
2. Java为纯面向对象的语言，这里需要拓展对OOP的理解。
3. 平台无关性，跨平台，JVM虚拟机。
4. 丰富的内置类库，多线程，集合，网络编程等。
5. 其它：对web开发的支持，良好的安全性和健壮性，GC机制等。

解释执行与编译执行？
逐条解释，编译执行；全部编译执行；热点代码动态编译。

**OOP**
封装，继承，多态；  
万物皆对象，描述属性与行为，和面向过程区分；除了基本类型，都是对象。

### 2. public static void main （String[] args）

- 入口方法，JVM运行时，首先查找 `main()` 方法。  
- public 权限修饰符，表示任何类或对象都可以访问这个方法。  
- static 表明这是一个静态方法，即方法中的代码是存储在静态存储区的，只要类被加载（类加载器）后，既可以使用该方法而不需要实例化对象。  
- String[] args 表明这是一个字符串数组参数，为开发人员在命令行状态下与程序交互提供了一种手段。  
- public 与 static 没有先后顺序关系
- final，synchronized 修饰方法也可以，但是不能用 abstract 关键字修饰

### 3. 实现在main()方法执行之前输出“Hello”

静态块在类加载时就会被调用，并且位置顺序无关。

```java
public class Paradise {
    static {
        System.out.println("----");
    }

    public static void main(String[] args) {
        System.out.println(">>>");
    }

}
```

### 4. Java程序初始化的顺序是怎样的？

1. 静态优先
2. 父类优先
3. 按照成员变量的定义顺序进行初始化

```java
public class OrderBase {
    static {
        System.out.println("Father static block - 父类静态代码块");
    }

    {
        System.out.println("Father - 父类代码块");
    }

    public OrderBase() {
        System.out.println("Father constructor - 父类构造方法");
    }

    public static void main(String[] args) {
        System.out.println("main fun - main方法执行");
        OrderChild orderChild = new OrderChild();
    }

}

public class OrderChild extends OrderBase {

    static {
        System.out.println("Child static block - 子类静态代码块");
    }

    {
        System.out.println("Child block - 子类代码块1");
    }

    public OrderChild() {
        System.out.println("Child constructor - 子类构造方法");
    }


    {
        System.out.println("Child block - 子类代码块2");
    }

}
```

```
把main方法放在父类中，输出结果：
Father static block - 父类静态代码块
main fun - main方法执行
Child static block - 子类静态代码块
Father - 父类代码块
Father constructor - 父类构造方法
Child block - 子类代码块1
Child block - 子类代码块2
Child constructor - 子类构造方法
```

执行顺序：父类静态代码块 ->  子类静态代码块 -> 父类代码块 -> 父类构造方法 -> 子类代码块 -> 子类构造方法 -> ...

### 5. Java中的作用域有哪些？

1. 成员变量，作用范围与实例化对象的作用范围相同
2. 静态变量，static修饰，被所有实例共享
3. 局部变量，仅限在所在当前{}内

修饰符 public private(仅限当前类) protected(当前package) default

### 6. 一个Java文件是否可以定义多个类？

当然可以，但是最多只能有1个类被public修饰，并且这个类名与文件名必须相同。

### 7. 什么是构造函数？

是一种特殊的函数，用来在对象实例化时初始化对象的成员变量。
和`new`关键字紧密相关，只能由系统调用。*那通过反射呢？*

当父类没有提供无参数的构造函数时，子类的构造函数中必须通过`super`关键字显式地调用父类的构造函数，并且位置在最前面。

### 8. 为什么Java中有些接口没有任何方法

什么是接口，我的理解是，提供一个抽象的类，约定了一组默认的行为，把某一类对象的通用行为提取出来作为标准。

接口是抽象方法定义的集合（接口中也可以定义一些常量值），是一种特殊的抽象类。  
接口中只包含方法的定义，没有方法的实现。接口中成员的作用域修饰符都是public，常量默认值使用 `public static final`修饰。用一个类实现多个接口间接实现多重继承。  
*什么是抽象类？*  

有些接口内部没有声明任何方法，称为标识接口，表明实现它的类属于一个特定的类型。比如`Cloneable` `Serializable`。使用`instanceof`判断实例对象的类型是否实现了一个给定的标识接口。

### 9. Java中的clone方法有什么作用

深拷贝与浅拷贝  

`clone`方法解决的是，想要创建两个属性一致的对象，如果使用`new`和`=`关键字得到的只是一个引用，指向的还是同一个对象。clone则会创建一个新的对象，分配新的内存空间。

### 10. 什么是反射机制

非常重要的特性，得到一个对象所属的类；获取一个类的所有成员变量和方法；在运行时创建对象；在运行时调用对象的方法。

- Class.forName("");
- 类名.class
- 实例.getClass();

### 11. Java创建对象的方式有几种？

1. 通过new语句实例化一个对象
2. 通过反射机制创建对象
3. 通过clone()方法创建一个对象
4. 通过反序列化的方式创建对象

### 12. package有什么作用

1. 提供多层命名空间，类名可以重复
2. 组织分类，使项目的组织更加清晰

### 13. 回调函数

策略设计模式  
定义一个接口，在接口中声明要调用的方法，多种实现。接口作为方法的入参，调用这个方法时根据不同的需求传递不同的实现类实例，实现不同的逻辑。


### 14. 多态的实现机制
 多态：同一操作作用在不同对象时，会有不同的语义，从而产生不同的结果。  
1. 重载 overload，编译时多态，一个类中的方法多态性。
2. 覆盖 override 子类覆盖父类的方法；运行时多态。`@Override` 注解标记

同一个类中不能存在同名且参数列表完全相同的方法；
重载是通过参数列表来区分的。  

覆盖，方法名，参数列表，返回值，抛出异常类型必须全部一致。

### 15. 抽象类 abstract class 和 接口 interface

抽象类：包含抽象方法的类叫做抽象类。抽象方法，仅有声明而没有方法体，`abstract void f();`，相当于C++中的纯虚函数。如果一个类中包含一个或多个抽象方法，该类必须被限定为**抽象**的。

一个接口表示：所有实现了该接口的类看起来都像这样。

### 16. 内部类

1. 静态内部类 static inner class
2. 成员内部类 member inner class
3. 局部内部类 local inner class
4. 匿名内部类 anonymous inner class

### 17. 获取父类的类名？

`getClass()`方法在Object类中被定义为`final` `native`，子类不能覆盖该方法，返回此Object的运行时类；

通过反射 `getClass().getSuperclass().getName();`

### 18. this & super

this用来指向当前实例对象，它的一个非常重要的作用就是用来区分对象的成员变量与方法的形参（当一个方法的形参与成员变量重名是，会覆盖成员变量）；

super用来访问父类的方法或者成员变量，尤其当子类的方法或者成员变量与父类重名覆盖时。

## 关键字

### 1. 变量命名规则

a~z,A~Z,0-9,_,$  
标识符的第一个字符为字母，下划线，美元符号

### 2. break & continue & return

- `break` 跳出当前循环  
- `continue` 停止当次循环  
- `return` 跳转语句，方法返回  

break跳出多重循环，使用标识符加冒号的形式定义标签（`label:`,`break label;`）

### 3. final & finally & finalize

1. `final`
  - 属性：不可变，指引用不可变；被`final`修饰的变量必须被初始化；
  - 方法：不可覆盖，不允许任何子类重写这个方法；  
  - 类：不可被继承，所有方法都不能被重写，`final` 和 `abstract` 是互斥的，不能同时修饰一个类
  - `final`参数：表示这个参数在函数内部不允许被修改；
2. `finally`，异常处理的一部分，只能用在`try/catch`语句中，表示这段语句最终一定会执行。
3. `finalize` 是Object类的一个方法，在垃圾回收器执行时会调用被回收对象的`finalize()`方法，可以覆盖此方法来实现对其他资源的回收。比如**关闭文件**等。

### 4. `assert`有什么作用？

断言:assert，作为一种软件调试的方法，提供了一种在代码中进行正确性检查的机制。

```java
public class AssertDemo {
    public static void main(String[] args) {
        assert 1 + 1 == 2;
        System.out.println("ok -- 1");
        assert 1 * 1 == 2;
        System.out.println("ok -- 2");
    }
}

// 启动时添加 Vm options： -ea
```

### 5. static 关键字的作用？

1. static 成员变量，静态变量，类加载时初始化，分配内存空间，在内存中只有一个复制
2. static 成员方法，无须实例化对象就可以调用，static方法中不能使用this和super关键字，不能调用非static方法，只能访问所属类的静态成员变量和成员方法（因为调用时对象可能还没有实例化）。可以用来实现单例模式。
3. static 代码块，静态代码块，在类中是独立于成员变量和成员函数的。经常被用来初始化静态变量。
4. static 内部类，是指被声明为static的内部类，它可以不依赖于外部类实例对象而被实例化，只能访问外部类中的静态成员和静态方法（包括私有类型）

### 6. switch 注意事项

`case` 语句末尾一定要有`break`，因为一旦通过`switch`语句确定了入口点，就会顺序执行后面的的代码，直到遇到关键字`break`。

### 7. volatile

`volatile` 是一个类型修饰符（type specifier）,保证变量的线程一致性。
不能保证操作的原子性，一般情况下不能代替`synchronized`，并且会降低执行效率，尽量不用。

### 8. instanceof

二元运算符，判断一个引用类型的变量所指向的对象是否是一个类class  
`obj instanceof String`

### 9. strictfp

精确浮点

## 基本类型与运算

### 1. 基本数据类型

8种基本数据类型，基本类型的数据变量在声明之后就会立刻在栈上分配内存空间。

| 数据类型 | 字节长度 | 范围 | 默认值 |
| :--- | :---: | :--- | :---: |
| int | 4 |  2的31次方  | 0 |
| short | 2 | -32768 ~ 32767 | 0
| long | 8 | 2的63次方 | 0L
| byte | 1 | -128 ~ 127 | 0
| float | 4 | 32位IEEE754单精度范围 | 0.0F
| double| 8 | 64位IEEE754双精度范围| 0.0
| char | 2 | Unicode [0,65535] | u0000
| boolean | 1 | true 和 false | false


### 2. 什么是不可变类？

不可变类（immutable class）是指当创建了这个类的实例后，就不允许修改它的值了，也就是说，一个对象一旦被创建出来，在其整个生命周期中，它的成员变量就不能被修改了。它有点类似于常量（const），即只允许别的程序读，不允许别的程序修改。

在Java类库中，所有基本类型的包装类都是不可变类。

### 3. 值传递 & 引用传递

:::tip
在Java语言中，原始数据类型在传递时都是按值传递，而包装类型在传递参数时都是按引用传递。
:::

这里需要深刻理解，地址传递。

```java
/**
 * @author Paradise
 */
public class RefDemo {
    private static void change(StringBuilder s1, StringBuilder s2) {
        s1.append("...");
        s2 = s1;
    }

    public static void main(String[] args) {
        StringBuilder s1 = new StringBuilder("Hello");
        StringBuilder s2 = new StringBuilder("Hello");
        change(s1, s2);
        System.out.println(s2);
    }
}
```

### 4. 数据类型转换

- 类型自动转换
- 强制类型转换

[Source - Code](https://github.com/xiumu2017/ddp/blob/transitMonitor/src/main/java/com/paradise/interview/TypeConversion.java)

### 5. 强制类型转换

Java语言在涉及 byte、short、char类型的运算时，首先会把这些类型的变量值强制转换为int类型。然后对int类型的值进行计算，最后得到的值也是int类型。如果需要得到特定类型的值，还需要进行显式地强制类型转换。`+=` 会被特殊处理，能够编译通过。

![](https://cdn.nlark.com/yuque/0/2019/png/159222/1561967989327-cb5e4529-ac6c-47cf-a32a-8c3a309d2ac3.png)

### 6. 运算符优先级是什么？

:::danger
这里需要完善一张表格 :bookmark:
:::

先记住括号优先级最高


### 7. Math 类

1. round 四舍五入
2. ceil 向上取整
3. floor 向下取整

:::danger
这里需要熟悉下 Math 工具类的源码 :tada: []()
:::


### 8. `i++` & `++i`

i++ 程序执行完毕后进行自增
++i 程序开始执行前进行自增

### 9. 无符号数的右移

`>>` 有符号右移运算符   

`>>>` 无符号右移运算符

:::danger
需要深入学习二进制编码，各种二进制基本运算思路 :tada:
:::

`<<` 左移运算，左移n位表示原来的值乘2的n次方，用来代替乘法操作，CPU直接支持位运算，效率高。左移时，移除高位的同时低位补零。

不论是左移还是右移，如果移动的位数超过了该类型的最大数，那么编译器会对移动的位数取模。（int 32位）

### 10. char型变量存储中文汉字

:::tip
在Java语言中，默认使用的是Unicode编码方式，即每个字符占用两个字节，因此可以用来存储中文。
:::

## 字符串与数组

### String

不可变性，字符串池...
String StringBuffer StringBuilder 三者的比较

### 数组

数组是指具有相同类型的数据的集合，它们一般具有固定的长度，并且在内存中占据着连续的空间。

## 异常处理

### finally块中的代码什么时候被执行？

1. 在return 之前
2. 如果finally块中有return语句，会覆盖别处的return

finally块一定会执行吗？
1. 当程序在进入try语句之前就出现异常时，会直接结束
2. `System.exit(0);` try 中强制退出 也不会执行；



## 输入输出流 I/O

> 理解流的概念，抽象，字节流，字符流。一个字符两个字节，一个字节8位。
Java IO 类在设计时采用了Decorator（装饰者）设计模式。

:tada:  
I/O设计类图  

:smile:  
装饰器设计模式

深入File类，常用方法  

Socket编程

### Java NIO

非阻塞I/O，具体内容参考Tomcat和Jetty学习部分。

### Java 序列化

Serialization序列化，将对象以一连串的字节描述的过程。

transient 关键字，修饰一个成员变量时，代表对象的临时数据，它的值不需要序列化。

## Java平台与内存管理

## 容器，集合

### Java Collection 框架

Stack 栈
Queue 队列
Set 集合  
List 有序集合
Map 键值对

框架设计，架构图，设计模式 :tada:

### 迭代器

源码分析 :tada:

### Collections 工具类分析

## 多线程

### 1. 线程的定义，有什么好处？

1. 减少程序的响应时间，提高执行效率
2. 与进程相比，线程的创建和切换开销更小
3. 充分利用多核CPU资源
4. 简化程序结构

### 2. 同步 & 异步

同步机制保证资源的安全。  
锁 lock 🔒  
要想实现同步操作，必须要获得每一个线程对象的锁。  
临界区：访问互斥资源的代码块

`synchronized`关键字

异步，非阻塞，不等待，继续执行。

### 3. 如何实现Java多线程

1. 继承 `Thread` 类，重写 `run()`方法

2. 实现`Runable` 接口，并实现该接口的 `run()` 方法

3. 实现 `Callable` 接口，重写 `call()` 方法

### 4. `run()`方法 &`start()`方法

系统通过调用线程；类的 `start()` 方法来启动一个线程，此时线程就处于就绪状态而非运行状态，JVM调度执行，通过调用线程类的 `run()` 方法来完成实际的操作。  

如果直接调用线程类的 `run()` ，这会被当做一个普通的函数调用，不会开启新的线程，同步执行。

### 5. 实现多线程同步

1. `synchronized` 关键字
    - synchronized 方法，这个方法同一时刻只能被一个线程访问，效率易受影响
    - synchronized 块，灵活，可以指定锁的对象
2. `wait()` & `notify()`

wait方法释放对象锁

3. `Lock`

### 6. `sleep()` & `wait()`

`sleep()` 是 `Thread` 类的静态方法，用于线程控制自身流程，会使此线程暂停执行一段时间

`wait()` 是 Object类的方法，用于线程间的通信，会使当前拥有该对象锁的进程等待；必须放在同步控制方法或者同步语句块中。会释放对象的管程和锁。

`yield()` 方法使当前线程重新回到可执行状态，释放线程所占有的CPU资源。

有一个易错的地方，当调用t.sleep()的时候，会暂停线程t。这是不对的，因为Thread.sleep是一个静态方法，它会使当前线程而不是线程t进入休眠状态。

### 7. 终止线程的方法

`stop()` 释放已经锁定的所有监视资源，可能会导致程序执行的不确定性  
`suspend()` 容易发生死锁

合理的方法：
1. 设置flag标志控制 `run()` 方法的执行
2. 调用`interrupe()` 方法，`run()`方法中捕获`InterruptedException`异常

### 8. synchronized & Lock

- 用法不同；Lock需要显式地指定起始位置和终止位置，通过代码实现，更精确的线程语义
- 性能不一样：在资源竞争很激烈的情况下，`synchronized` 的性能会下降得非常快，而`ReetrantLock`的性能基本保持不变
- 锁机制不一样：`synchronized` 获得锁和释放的方式都是在块结构中，当获取多个锁时必须以相仿的顺序释放，并且是自动解锁，不会因为异常而导致死锁。而Lock则需要开发人员手动释放，并且必须在finally块中释放。此外，Lock还提供了更强大的功能，它的 `tryLock()` 方法可以采用非阻塞的方式去获得锁。

```java
package com.paradise.thread;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * 两种锁机制
 *
 * @author Paradise
 */
class SyncDemo {
    private int value = 0;
    private Lock lock = new ReentrantLock();
    private boolean flag = false;

    void addValue() {
        if (flag) {
            this.value++;
            System.out.println(Thread.currentThread().getName() + ":" + this.value);
        } else {
            synchronized (this) {
                this.value++;
                System.out.println(Thread.currentThread().getName() + ":" + this.value);
            }
        }

    }

    void addValueLock() {
        try {
            lock.lock();
            this.value++;
            System.out.println(Thread.currentThread().getName() + ":" + this.value);
        } finally {
            lock.unlock();
        }
    }
}
```

```java
package com.paradise.thread;

/**
 * @author Paradise
 */
public class SyncTestDemo {
    public static void main(String[] args) {
        final SyncDemo syncDemo = new SyncDemo();
        Thread thread1 = new Thread(
                new Runnable() {
                    @Override
                    public void run() {
                        for (int i = 0; i < 5; i++) {
                            syncDemo.addValue();
                            try {
                                Thread.sleep(200);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }
        );

        Thread thread2 = new Thread(
                new Runnable() {
                    @Override
                    public void run() {
                        for (int i = 0; i < 5; i++) {
                            syncDemo.addValue();
                            try {
                                Thread.sleep(200);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }
        );

        thread1.start();
        thread2.start();
    }
}

```

### 9. 守护线程

> 守护线程又被称为“服务进程”，“精灵线程”，“后台线程”，是指在程序运行时在后台提供一种通用服务的线程，这种线程并不属于程序中不可或缺的部分。依赖于用户线程存在。

:::tip gitchat
守护线程是运行在后台的一种特殊进程。它独立于控制终端并且周期性地执行某种任务或等待处理某些发生的事件。在 Java 中垃圾回收线程就是特殊的守护线程。
:::


### 10. `join()`

> 在Java语言中，`join()` 方法的作用是让调用该方法的线程在执行完 `run()` 方法后，再执行join方法后面的代码。简单地说，就是将两个线程合并，用于实现同步功能。

## GitChat

:::tip gitchat 补充内容
#### runnable 和 callable 的区别？

runnable 没有返回值
callable 可以有返回值

#### 线程有哪些状态？
- NEW 尚未启动
- RUNNABLE 正在执行中
- BLOCKED 阻塞 （被同步锁或者IO锁阻塞）
- WAITING 永久等待状态
- TIMED_WAITING 等待指定的时间重新被唤醒的状态
- TERMINATED 执行完成

#### 创建线程池有哪几种方式？

线程池创建有七种方式，最核心的是最后一种：

- `newSingleThreadExecutor()`：它的特点在于工作线程数目被限制为 1，操作一个无界的工作队列，所以它保证了所有任务的都是被顺序执行，最多会有一个任务处于活动状态，并且不允许使用者改动线程池实例，因此可以避免其改变线程数目；

- `newCachedThreadPool()`：它是一种用来处理大量短时间工作任务的线程池，具有几个鲜明特点：它会试图缓存线程并重用，当无缓存线程可用时，就会创建新的工作线程；如果线程闲置的时间超过 60 秒，则被终止并移出缓存；长时间闲置时，这种线程池，不会消耗什么资源。其内部使用 SynchronousQueue 作为工作队列；

- `newFixedThreadPool(int nThreads)`：重用指定数目（nThreads）的线程，其背后使用的是无界的工作队列，任何时候最多有 nThreads 个工作线程是活动的。这意味着，如果任务数量超过了活动队列数目，将在工作队列中等待空闲线程出现；如果有工作线程退出，将会有新的工作线程被创建，以补足指定的数目 nThreads；

- `newSingleThreadScheduledExecutor()`：创建单线程池，返回 ScheduledExecutorService，可以进行定时或周期性的工作调度；

- `newScheduledThreadPool(int corePoolSize)`：和newSingleThreadScheduledExecutor()类似，创建的是个 ScheduledExecutorService，可以进行定时或周期性的工作调度，区别在于单一工作线程还是多个工作线程；

- `newWorkStealingPool(int parallelism)`：这是一个经常被人忽略的线程池，Java 8 才加入这个创建方法，其内部会构建ForkJoinPool，利用Work-Stealing算法，并行地处理任务，不保证处理顺序；

- `ThreadPoolExecutor()`：是最原始的线程池创建，上面1-3创建方式都是对ThreadPoolExecutor的封装。

#### 线程池都有哪些状态？

- RUNNING 最正常的状态，接受新的任务，处理等待队列中的任务
- SHUTDOWN 不接受新的任务提交，但是会继续处理等待队列中的任务
- STOP 不接受新的任务提交，不再处理等待队列中的任务，中断正在执行的任务
- TIDYING 销毁所有的任务，workCout为0，线程池的状态转换为TIDYING状态时，会执行钩子方法`terminated()`
- TERMINATED `terminated()` 方法结束后，线程池的状态就会变成这个。

#### 线程池中 `submit()` `execute()` 方法的区别？

前者可以执行Runnable和Callable类型的任务，后者只能执行Runnable类型的任务

#### 多线程中 synchronized 锁升级的原理是什么？
synchronized 锁升级原理：在锁对象的对象头里面有一个 threadid 字段，在第一次访问的时候 threadid 为空，jvm 让其持有**偏向锁**，并将 threadid 设置为其线程 id，再次进入的时候会先判断 threadid 是否与其线程 id 一致，如果一致则可以直接使用此对象，如果不一致，则升级偏向锁为**轻量级锁**，通过自旋循环一定次数来获取锁，执行一定次数之后，如果还没有正常获取到要使用的对象，此时就会把锁从轻量级升级为重量级锁，此过程就构成了 synchronized 锁的升级。

锁的升级的目的：锁升级是为了减低了锁带来的性能消耗。在 Java 6 之后优化 synchronized 的实现方式，使用了偏向锁升级为轻量级锁再升级到重量级锁的方式，从而减低了锁带来的性能消耗。

#### ThreadLocal 是什么？有哪些使用场景？
ThreadLocal 为每个使用该变量的线程提供独立的变量副本，所以每一个线程都可以独立地改变自己的副本，而不会影响其它线程所对应的副本。

ThreadLocal 的经典使用场景是数据库连接和 session 管理等。

#### 说一下 synchronized 底层实现原理？
synchronized 是由一对 monitorenter/monitorexit 指令实现的，monitor 对象是同步的基本实现单元。在 Java 6 之前，monitor 的实现完全是依靠操作系统内部的互斥锁，因为需要进行用户态到内核态的切换，所以同步操作是一个无差别的重量级操作，性能也很低。但在 Java 6 的时候，Java 虚拟机 对此进行了大刀阔斧地改进，提供了三种不同的 monitor 实现，也就是常说的三种不同的锁：偏向锁（Biased Locking）、轻量级锁和重量级锁，大大改进了其性能。

#### 说一下 atomic 的原理？
atomic 主要利用 CAS (Compare And Wwap) 和 volatile 和 native 方法来保证原子操作，从而避免 synchronized 的高开销，执行效率大为提升。

---
#### 动态代理是什么？有哪些应用

动态代理是运行时动态生成代理类。

动态代理的应用有spring aop，hibernate数据查询，测试框架的后端mock，rpc，Java注解对象获取等。

#### 如何实现动态代理？
JDK原生动态代理和cglib动态代理。前者基于接口实现，cglib是基于继承当前类的子类实现的。

#### 对象拷贝

深拷贝，浅拷贝。

---

#### 什么是servlet？

#### session 和 cookie

---

#### http响应码301和302代表的各是什么？区别？

301：永久重定向
302：暂时重定向

区别是301对搜索引擎优化SEO更加有利，302有被提示为网络拦截的风险。

#### forward和redirect的区别？

forward 是转发 和 redirect 是重定向：

- 地址栏 url 显示：foward url 不会发生改变，redirect url 会发生改变；
- 数据共享：forward 可以共享 request 里的数据，redirect 不能共享；
- 效率：forward 比 redirect 效率高。

#### 说一下 tcp 粘包是怎么产生的？
tcp 粘包可能发生在发送端或者接收端，分别来看两端各种产生粘包的原因：

- 发送端粘包：发送端需要等缓冲区满才发送出去，造成粘包；
- 接收方粘包：接收方不及时接收缓冲区的包，造成多个包接收。

#### get 和 post 请求的区别？
- get请求会被浏览器主动缓存，而post不会
- get传递参数有大小限制，而post没有
- post参数传输更安全，get的参数会明文显示在url上

#### 如何实现跨域
- 服务端运行跨域 设置 CORS等于*；
- 在单个接口使用注解 @CrossOrigin
- 使用jsonp跨域

jsonp：JSON with padding，它是利用scripts标签的src连接可以访问不同源的特性，加载远程返回的“js函数”来执行的。

--- 
设计模式

#### 说一下你熟悉的设计模式？
- 单例模式：保证被创建一次，节省系统开销。
- 工厂模式（简单工厂、抽象工厂）：解耦代码。
- 观察者模式：定义了对象之间的一对多的依赖，这样一来，当一个对象改变时，它的所有的依赖者都会收到通知并自动更新。
- 外观模式：提供一个统一的接口，用来访问子系统中的一群接口，外观定义了一个高层的接口，让子系统更容易使用。
- 模版方法模式：定义了一个算法的骨架，而将一些步骤延迟到子类中，模版方法使得子类可以在不改变算法结构的情况下，重新定义算法的步骤。
- 状态模式：允许对象在内部状态改变时改变它的行为，对象看起来好像修改了它的类。

#### 简单工厂和抽象工厂有什么区别？
简单工厂：用来生产同一等级结构中的任意产品，对于增加新的产品，无能为力。

工厂方法：用来生产同一等级结构中的固定产品，支持增加任意产品。

抽象工厂：用来生产不同产品族的全部产品，对于增加新的产品，无能为力；支持增加产品族。

:::

#### 为什么要使用 spring？

spring 提供 ioc 技术，容器会帮你管理依赖的对象，从而不需要自己创建和管理依赖对象了，更轻松的实现了程序的解耦。

spring 提供了事务支持，使得事务操作变的更加方便。

spring 提供了面向切片编程，这样可以更方便的处理某一类的问题。

更方便的框架集成，spring 可以很方便的集成其他框架，比如 MyBatis、hibernate 等。

#### 解释一下什么是 aop？
aop 是面向切面编程，通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术。

简单来说就是统一处理某一“切面”（类）的问题的编程思想，比如统一处理日志、异常等。

#### 解释一下什么是 ioc？
ioc：Inversionof Control（中文：控制反转）是 spring 的核心，对于 spring 框架来说，就是由 spring 来负责控制对象的生命周期和对象间的关系。

简单来说，控制指的是当前对象对内部成员的控制权；控制反转指的是，这种控制权不由当前对象管理了，由其他（类,第三方容器）来管理。

#### spring 有哪些主要模块？
- spring core：框架的最基础部分，提供 ioc 和依赖注入特性。
- spring context：构建于 core 封装包基础上的 context 封装包，提供了一种框架式的对象访问方法。
- spring dao：Data Access Object 提供了JDBC的抽象层。
- spring aop：提供了面向切面的编程实现，让你可以自定义拦截器、切点等。
- spring Web：提供了针对 Web 开发的集成特性，例如文件上传，利用 servlet listeners 进行 ioc 容器初始化和针对 Web 的 ApplicationContext。
- spring Web mvc：spring 中的 mvc 封装包提供了 Web 应用的 Model-View-Controller（MVC）的实现。

#### spring 中的 bean 是线程安全的吗？
spring 中的 bean 默认是单例模式，spring 框架并没有对单例 bean 进行多线程的封装处理。

实际上大部分时候 spring bean 无状态的（比如 dao 类），所有某种程度上来说 bean 也是安全的，但如果 bean 有状态的话（比如 view model 对象），那就要开发者自己去保证线程安全了，最简单的就是改变 bean 的作用域，把“singleton”变更为“prototype”，这样请求 bean 相当于 new Bean()了，所以就可以保证线程安全了。

有状态就是有数据存储功能。
无状态就是不会保存数据。

#### spring 支持几种 bean 的作用域？
spring 支持 5 种作用域，如下：

singleton：spring ioc 容器中只存在一个 bean 实例，bean 以单例模式存在，是系统默认值；
prototype：每次从容器调用 bean 时都会创建一个新的示例，既每次 getBean()相当于执行 new Bean()操作；
Web 环境下的作用域：
request：每次 http 请求都会创建一个 bean；
session：同一个 http session 共享一个 bean 实例；
global-session：用于 portlet 容器，因为每个 portlet 有单独的 session，globalsession 提供一个全局性的 http session。
注意： 使用 prototype 作用域需要慎重的思考，因为频繁创建和销毁 bean 会带来很大的性能开销。

#### spring 自动装配 bean 有哪些方式？
no：默认值，表示没有自动装配，应使用显式 bean 引用进行装配。
byName：它根据 bean 的名称注入对象依赖项。
byType：它根据类型注入对象依赖项。
构造函数：通过构造函数来注入依赖项，需要设置大量的参数。
autodetect：容器首先通过构造函数使用 autowire 装配，如果不能，则通过 byType 自动装配。

#### spring 事务实现方式有哪些？
声明式事务：声明式事务也有两种实现方式，基于 xml 配置文件的方式和注解方式（在类上添加 @Transaction 注解）。
编码方式：提供编码的形式管理和维护事务。

#### 说一下 spring 的事务隔离？
spring 有五大隔离级别，默认值为 `ISOLATION_DEFAULT`（使用数据库的设置），其他四个隔离级别和数据库的隔离级别一致：

`ISOLATION_DEFAULT`：用底层数据库的设置隔离级别，数据库设置的是什么我就用什么；

`ISOLATIONREADUNCOMMITTED`：未提交读，最低隔离级别、事务未提交前，就可被其他事务读取（会出现幻读、脏读、不可重复读）；

`ISOLATIONREADCOMMITTED`：提交读，一个事务提交后才能被其他事务读取到（会造成幻读、不可重复读），SQL server 的默认级别；

`ISOLATIONREPEATABLEREAD`：可重复读，保证多次读取同一个数据时，其值都和事务开始时候的内容是一致，禁止读取到别的事务未提交的数据（会造成幻读），MySQL 的默认级别；

`ISOLATION_SERIALIZABLE`：序列化，代价最高最可靠的隔离级别，该隔离级别能防止脏读、不可重复读、幻读。

**脏读** ：表示一个事务能够读取另一个事务中还未提交的数据。比如，某个事务尝试插入记录 A，此时该事务还未提交，然后另一个事务尝试读取到了记录 A。

**不可重复读** ：是指在一个事务内，多次读同一数据。

**幻读** ：指同一个事务内多次查询返回的结果集不一样。比如同一个事务 A 第一次查询时候有 n 条记录，但是第二次同等条件下查询却有 n+1 条记录，这就好像产生了幻觉。发生幻读的原因也是另外一个事务新增或者删除或者修改了第一个事务结果集里面的数据，同一个记录的数据内容被修改了，所有数据行的记录就变多或者变少了。

#### 说一下 spring mvc 运行流程？
- spring mvc 先将请求发送给 DispatcherServlet。
- DispatcherServlet 查询一个或多个 HandlerMapping，找到处理请求的 Controller。
- DispatcherServlet 再把请求提交到对应的 Controller。
- Controller 进行业务逻辑处理后，会返回一个ModelAndView。
- Dispathcher 查询一个或多个 ViewResolver 视图解析器，找到 ModelAndView 对象指定的视图对象。
视图对象负责渲染返回给客户端。

#### spring mvc 有哪些组件？
- 前置控制器 DispatcherServlet。
- 映射控制器 HandlerMapping。
- 处理器 Controller。
- 模型和视图 ModelAndView。
- 视图解析器 ViewResolver。

#### @Autowired 的作用是什么？
`@Autowired` 它可以对类成员变量、方法及构造函数进行标注，完成自动装配的工作，通过@Autowired 的使用来消除 set/get 方法。

#### jpa 和 hibernate 有什么区别？
jpa 全称 Java Persistence API，是 Java 持久化接口规范，hibernate 属于 jpa 的具体实现。

#### 什么是 spring cloud？
spring cloud 是一系列框架的有序集合。它利用 spring boot 的开发便利性巧妙地简化了分布式系统基础设施的开发，如服务发现注册、配置中心、消息总线、负载均衡、断路器、数据监控等，都可以用 spring boot 的开发风格做到一键启动和部署。

#### spring cloud 断路器的作用是什么？
在分布式架构中，断路器模式的作用也是类似的，当某个服务单元发生故障（类似用电器发生短路）之后，通过断路器的故障监控（类似熔断保险丝），向调用方返回一个错误响应，而不是长时间的等待。这样就不会使得线程因调用故障服务被长时间占用不释放，避免了故障在分布式系统中的蔓延。

#### spring cloud 的核心组件有哪些？
- Eureka：服务注册于发现。
- Feign：基于动态代理机制，根据注解和选择的机器，拼接请求 url 地址，发起请求。
- Ribbon：实现负载均衡，从一个服务的多台机器中选择一台。
- Hystrix：提供线程池，不同的服务走不同的线程池，实现了不同服务调用的隔离，避免了服务雪崩的问题。
- Zuul：网关管理，由 Zuul 网关转发请求给对应的服务。

#### Hibernate

##### 为什么要使用 hibernate？
hibernate 是对 jdbc 的封装，大大简化了数据访问层的繁琐的重复性代码。

hibernate 是一个优秀的 ORM 实现，很多程度上简化了 DAO 层的编码功能。

可以很方便的进行数据库的移植工作。

提供了缓存机制，程序执行更改的高效。

##### hibernate 中如何在控制台查看打印的 SQL 语句？
在 Config 里面把 hibernate. show_SQL 设置为 true 就可以。但不建议开启，开启之后会降低程序的运行效率。

##### hibernate 有几种查询方式？
三种：hql、原生 SQL、条件查询 Criteria。

##### 在 hibernate 中使用 Integer 和 int 做映射有什么区别？
Integer 类型为对象，它的值允许为 null，而 int 属于基础数据类型，值不能为 null。

##### hibernate 是如何工作的？
- 读取并解析配置文件。
- 读取并解析映射文件，创建 SessionFactory。
- 打开 Session。
- 创建事务。
- 进行持久化操作。
- 提交事务。
- 关闭 Session。
- 关闭 SessionFactory。

##### get()和 load()的区别？
数据查询时，没有 OID 指定的对象，get() 返回 null；load() 返回一个代理对象。
load()支持延迟加载；get() 不支持延迟加载。

##### 说一下 hibernate 的缓存机制？
hibernate 常用的缓存有一级缓存和二级缓存：

一级缓存：也叫 Session 缓存，只在 Session 作用范围内有效，不需要用户干涉，由 hibernate 自身维护，可以通过：evict(object)清除 object 的缓存；clear()清除一级缓存中的所有缓存；flush()刷出缓存；

二级缓存：应用级别的缓存，在所有 Session 中都有效，支持配置第三方的缓存，如：EhCache。

##### hibernate 对象有哪些状态？
临时/瞬时状态：直接 new 出来的对象，该对象还没被持久化（没保存在数据库中），不受 Session 管理。
持久化状态：当调用 Session 的 save/saveOrupdate/get/load/list 等方法的时候，对象就是持久化状态。
游离状态：Session 关闭之后对象就是游离状态。

##### 在 hibernate 中 getCurrentSession 和 openSession 的区别是什么？
getCurrentSession 会绑定当前线程，而 openSession 则不会。
getCurrentSession 事务是 Spring 控制的，并且不需要手动关闭，而 openSession 需要我们自己手动开启和提交事务。

##### hibernate 实体类必须要有无参构造函数吗？为什么？
hibernate 中每个实体类必须提供一个无参构造函数，因为 hibernate 框架要使用 reflection api，通过调用 ClassnewInstance() 来创建实体类的实例，如果没有无参的构造函数就会抛出异常。


<disqus />