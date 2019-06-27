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

### 4. 数据类型转换

### 5. 强制类型转换

### 6. 运算符优先级是什么？

### 7. Math 类

### 8. `i++` & `++i`

### 9. 无符号数的右移

### 10. char型变量存储中文汉字

## Java基础知识 - 字符串与数组

## Java基础知识 - 异常处理

## Java基础知识 - 输入输出流 I/O

## Java基础知识 - Java平台与内存管理

## Java基础知识 - 容器，集合

## Java基础知识 - 多线程

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

`wait()` 是 Object类的方法，用于线程间的通信，会使当前拥有该对象锁的进程等待；必须放在同步控制方法或者同步语句块中。

`yield()` 方法使当前线程重新回到可执行状态

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


### 10. `join()`

> 在Java语言中，`join()` 方法的作用是让调用该方法的线程在执行完 `run()` 方法后，再执行join方法后面的代码。简单地说，就是将两个线程合并，用于实现同步功能。

## Java基础知识 - JDBC

## Java基础知识 - Java Web

### Servlet

### IoC

### AOP

### Spring

## 设计模式
## SQL
## 数据结构与算法
