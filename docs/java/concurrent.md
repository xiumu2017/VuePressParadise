# Java 并发编程实战

Java 并发编程实战 | 极客时间专栏学习笔记

## 开篇词

理论和实践总是有鸿沟的。

并发编程很重要，非常重要，找工作面试时深有体会（2019-7-16）。

管程模型。信号量模型。

并发编程核心问题：分工，同步，互斥。


坚持，遇到问题不是逃避或者抱怨。

## 学习攻略

### 跳出来，看全景。

#### 分工

Java SDK 并发包里的 Executor、Fork/Join、Future

#### 同步

线程间协作 CountDownLatch、CycliBarrier、Phaser、Exchanger

管程是解决并发问题的万能钥匙。

#### 互斥

所谓互斥，指的是同一时刻，只允许一个线程访问共享变量。 🔒

内存模型：可见性问题，有序性问题，原子性问题

可见性： CPU 缓存
原子性： 操作系统

![并发编程-思维导图](https://static001.geekbang.org/resource/image/11/65/11e0c64618c04edba52619f41aaa3565.png)

### 钻进去，看本质

工程上的解决方案，一定要有理论做基础。技术的本质是背后的理论模型。


## 01. 可见性、原子性、有序性问题：并发编程Bug的源头

CPU 内存 I/O设备，速度差异

可见性：一个线程对共享变量的修改，另外一个线程能够立刻看到

#### 缓存导致的可见性问题：

测试demo 还是有一些不能理解的地方

## 09. Java 线程的生命周期

Java 语言中线程共有六种状态：
1. NEW 初始化状态
2. RUNNABLE 可运行/运行状态
3. BOLOCKED 阻塞状态
4. WAITING 无时限等待
5. TIMED_WAITING 有时限等待
6. TERMINATED 终止状态

### 状态转换

#### 1. RUNNALE 与 BLOCKED 的状态转换：

线程等待 `synchronized` 的隐式锁，`sychronized` 修饰的方法，代码块在同一时刻只允许一个线程执行，其他线程只能等待，这种情况下，等待的线程就会从 RUNNALE 状态转换到 BLOCKED 状态。而当等待的线程获得 `synchronized` 隐式锁时，就又会从 BLOCKED 状态转换到 RUNNABLE 状态。

JVM层面并不关系操作系统调度相关的状态。Java在调用阻塞式API时，线程会阻塞，指的是操作系统线程的状态，并不是Java线程的状态，Java线程依然会保持 RUNNABLE 状态。

#### 2. RUNNABLE 与 WAITING 的状态转换：

总体来说，有三种场景会出发这种转换：

1. 获得 `sychronized` 隐式锁的线程，调用 无参数的 `Object.wait()` 方法。
2. 调用 无参数的 `Thread.join()` 方法。 当前线程会从 RUNNABLE 状态转换到 WAITING 状态，当 join 的线程执行完成之后，当前线程再转换为 RUNNABLE 状态。
3. 调用 `LockSupport.part()` 方法。

#### 3. RUNNABLE 与 TIMED_WAITING 的状态转换：

1. 调用 带超时参数的 Thread.sleep(long millis) 方法；
2. 获得 sychronized 隐式锁的线程，调用 带超时参数的 Object.wait(long timeout) 方法；
3. 调用带超时参数的 Thread.join(long millis) 方法；
4. 调用带超时参数的 LockSupport.parkNanos(Object blocker, long deadline) 方法；
5. 调用带超时参数的 LockSupport.parkUntil(long deadline) 方法；

#### 4. 从 NEW 到 RUNNABLE 状态

创建Thread对象的两种方法：

1. 继承 Thread 对象
2. 实现Runnable 接口，重写 run() 方法，并将该类作为创建Thread对象的参数

调用线程对象的 `start()` 方法，状态转换为 RUNNABLE

#### 5. 从RUNNABLE 到 TERMINATED 状态

1. 线程执行完 run() 方法，会自动转换到 TERMINATED
2. 执行 run() 方法时异常抛出
3. stop(), interrupt()

### 总结

通过 `jstack` 命令 或者 Java VisualVM 可视化工具将 JVM所有的线程栈信息导出来，完整的线程栈信息不仅包括线程的当前状态，调用栈，还包括了锁的信息。

