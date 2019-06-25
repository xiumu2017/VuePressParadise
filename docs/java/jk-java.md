# Java核心技术36讲

## 0. 开篇词

Java的重要性，使用广泛。

- 知其然不知其所以然。
  思考技术别后的逻辑
- 知识碎片化

### 五大模块

1. Java基础
2. Java进阶
3. Java应用开发扩展
4. Java安全基础
5. Java性能基础

如何测试下自己的Java能力？
1.牛客网测试题？
2.面试题

## 1. 谈谈你对Java平台的理解

- 跨平台
write once,run anywhere
- 垃圾收集 GC
程序员不需要自己操心内存的分配与回收

Java是解释执行吗？

不太准确；编译成字节码 bytecode .class;运行时，JVM解释器转换成最终的机器码。  
动态编译器，热点代码编译执行。

> 表现出自己的思维深入并系统化，Java知识理解得也比较全面

### Answer

1. 跨平台，JVM虚拟机
2. 面向对象编程语言，强类型
3. Java语言特性


## 2. Exception 和 Error 有什么区别？

世界上存在永远不会出错的程序吗？也许这只会出现在程序员的梦中。
随着编程语言和软件的诞生，异常情况就如影随形地纠缠着我们，只有正确处理好意外情况，才能保证程序的可靠性。

Java 语言在设计之初就提供了相对完善的异常处理机制，这也是 Java 得以大行其道的原因之一，因为这种机制大大降低了编写和维护可靠程序的门槛。

如今，异常处理机制已经成为现代编程语言的标配。 

今天我要问你的问题是，请对比 Exception 和 Error，另外，运行时异常与一般异常有什么区别？ 

#### 典型回答 

Exception 和 Error 都是继承了 Throwable 类，在 Java 中只有 Throwable 类型的实例才可以被抛出（throw）或者捕获（catch），它是异常处理机制的基本组成类型。 

Exception 和 Error 体现了 Java 平台设计者对不同异常情况的分类。

Exception 是程序正常运行中，可以预料的意外情况，可能并且应该被捕获，进行相应处理。
Error 是指在正常情况下，不大可能出现的情况，绝大部分的 Error 都会导致程序（比如 JVM 自身）处于非正常的、不可恢复状态。既然是非正常情况，所以不便于也不需要捕获，常见的比如 OutOfMemoryError 之类，都是 Error 的子类。

Exception 又分为可检查（checked）异常和不检查（unchecked）异常，可检查异常在源代码里必须显式地进行捕获处理，这是编译期检查的一部分。前面我介绍的不可查的 Error，是 Throwable 不是 Exception。 不检查异常就是所谓的运行时异常，类似 NullPointerException、ArrayIndexOutOfBoundsException 之类，通常是可以编码避免的逻辑错误，具体根据需要来判断是否需要捕获，并不会在编译期强制要求。 

#### 考点分析 

分析 Exception 和 Error 的区别，是从概念角度考察了 Java 处理机制。总的来说，还处于理解的层面，面试者只要阐述清楚就好了。 

我们在日常编程中，如何处理好异常是比较考验功底的，我觉得需要掌握两个方面。 

第一，理解 Throwable、Exception、Error 的设计和分类。比如，掌握那些应用最为广泛的子类，以及如何自定义异常等。 很多面试官会进一步追问一些细节，比如，你了解哪些 Error、Exception 或者 RuntimeException？我画了一个简单的类图，并列出来典型例子，可以给你作为参考，至少做到基本心里有数。 其中有些子类型，最好重点理解一下，比如 NoClassDefFoundError 和 ClassNotFoundException 有什么区别，这也是个经典的入门题目。

第二，理解 Java 语言中操作 Throwable 的元素和实践。掌握最基本的语法是必须的，如 try-catch-finally 块，throw、throws 关键字等。与此同时，也要懂得如何处理典型场景。 异常处理代码比较繁琐，比如我们需要写很多千篇一律的捕获代码，或者在 finally 里面做一些资源回收工作。随着 Java 语言的发展，引入了一些更加便利的特性，比如 try-with-resources 和 multiple catch，具体可以参考下面的代码段。在编译时期，会自动生成相应的处理逻辑，比如，自动按照约定俗成 close 那些扩展了 AutoCloseable 或者 Closeable 的对象。 

```java
try (BufferedReader br = new BufferedReader(…);
    BufferedWriter writer = new BufferedWriter(…)) {// Try-with-resources 
 // do something 
 catch ( IOException | XEception e) {// Multiple catch 
 // Handle it 
 } 
```
#### 知识扩展 
前面谈的大多是概念性的东西，下面我来谈些实践中的选择，我会结合一些代码用例进行分析。 先开看第一个吧，下面的代码反映了异常处理中哪些不当之处？ 
```java
try { 
    // 业务代码 
    // … 
    Thread.sleep(1000L); 
} catch (Exception e) { 
    // Ignore it 
}
```

这段代码虽然很短，但是已经违反了异常处理的两个基本原则。 

第一，尽量不要捕获类似 Exception 这样的通用异常，而是应该捕获特定异常，在这里是 Thread.sleep() 抛出的 InterruptedException。 这是因为在日常的开发和合作中，我们读代码的机会往往超过写代码，软件工程是门协作的艺术，所以我们有义务让自己的代码能够直观地体现出尽量多的信息，而泛泛的 Exception 之类，恰恰隐藏了我们的目的。另外，我们也要保证程序不会捕获到我们不希望捕获的异常。比如，你可能更希望 RuntimeException 被扩散出来，而不是被捕获。 进一步讲，除非深思熟虑了，否则不要捕获 Throwable 或者 Error，这样很难保证我们能够正确程序处理 OutOfMemoryError。 

第二，不要生吞（swallow）异常。这是异常处理中要特别注意的事情，因为很可能会导致非常难以诊断的诡异情况。 生吞异常，往往是基于假设这段代码可能不会发生，或者感觉忽略异常是无所谓的，但是千万不要在产品代码做这种假设！ 如果我们不把异常抛出来，或者也没有输出到日志（Logger）之类，程序可能在后续代码以不可控的方式结束。没人能够轻易判断究竟是哪里抛出了异常，以及是什么原因产生了异常。 

再来看看第二段代码 
```java
try { 
    // 业务代码 
    // … 
} catch (IOException e) { 
    e.printStackTrace(); 
}
```

 这段代码作为一段实验代码，它是没有任何问题的，但是在产品代码中，通常都不允许这样处理。你先思考一下这是为什么呢？ 我们先来看看printStackTrace()的文档，开头就是“Prints this throwable and its backtrace to the standard error stream”。问题就在这里，在稍微复杂一点的生产系统中，标准出错（STERR）不是个合适的输出选项，因为你很难判断出到底输出到哪里去了。 尤其是对于分布式系统，如果发生异常，但是无法找到堆栈轨迹（stacktrace），这纯属是为诊断设置障碍。所以，最好使用产品日志，详细地输出到日志系统里。 我们接下来看下面的代码段，体会一下Throw early, catch late 原则。 
 
 ```java
 public void readPreferences(String fileName){ 
     //...perform operations... 
     InputStream in = new FileInputStream(fileName); 
     //...read the preferences file... 
}
 ```
 如果 fileName 是 null，那么程序就会抛出 NullPointerException，但是由于没有第一时间暴露出问题，堆栈信息可能非常令人费解，往往需要相对复杂的定位。这个 NPE 只是作为例子，实际产品代码中，可能是各种情况，比如获取配置失败之类的。在发现问题的时候，第一时间抛出，能够更加清晰地反映问题。 我们可以修改一下，让问题“throw early”，对应的异常信息就非常直观了。 
 
 ```java
 public void readPreferences(String filename) { 
     Objects. requireNonNull(filename); 
     //...perform other operations... 
     InputStream in = new FileInputStream(filename); 
     //...read the preferences file... 
} 
 ```

 至于“catch late”，其实是我们经常苦恼的问题，捕获异常后，需要怎么处理呢？最差的处理方式，就是我前面提到的“生吞异常”，本质上其实是掩盖问题。如果实在不知道如何处理，可以选择保留原有异常的 cause 信息，直接再抛出或者构建新的异常抛出去。在更高层面，因为有了清晰的（业务）逻辑，往往会更清楚合适的处理方式是什么。 有的时候，我们会根据需要自定义异常，这个时候除了保证提供足够的信息，还有两点需要考虑： 是否需要定义成 Checked Exception，因为这种类型设计的初衷更是为了从异常情况恢复，作为异常设计者，我们往往有充足信息进行分类。 在保证诊断信息足够的同时，也要考虑避免包含敏感信息，因为那样可能导致潜在的安全问题。如果我们看 Java 的标准类库，你可能注意到类似 java.net.ConnectException，出错信息是类似“ Connection refused (Connection refused)”，而不包含具体的机器名、IP、端口等，一个重要考量就是信息安全。类似的情况在日志中也有，比如，用户数据一般是不可以输出到日志里面的。 业界有一种争论（甚至可以算是某种程度的共识），Java 语言的 Checked Exception 也许是个设计错误，反对者列举了几点： Checked Exception 的假设是我们捕获了异常，然后恢复程序。但是，其实我们大多数情况下，根本就不可能恢复。Checked Exception 的使用，已经大大偏离了最初的设计目的。 Checked Exception 不兼容 functional 编程，如果你写过 Lambda/Stream 代码，相信深有体会。 很多开源项目，已经采纳了这种实践，比如 Spring、Hibernate 等，甚至反映在新的编程语言设计中，比如 Scala 等。 
 如果有兴趣，你可以参考： http://literatejava.com/exceptions/checked-exceptions-javas-biggest-mistake/。 当然，很多人也觉得没有必要矫枉过正，因为确实有一些异常，比如和环境相关的 IO、网络等，其实是存在可恢复性的，而且 Java 已经通过业界的海量实践，证明了其构建高质量软件的能力。
 
 我们从性能角度来审视一下 Java 的异常处理机制，这里有两个可能会相对昂贵的地方： try-catch 代码段会产生额外的性能开销，或者换个角度说，它往往会影响 JVM 对代码进行优化，所以建议仅捕获有必要的代码段，尽量不要一个大的 try 包住整段的代码；与此同时，利用异常控制代码流程，也不是一个好主意，远比我们通常意义上的条件语句（if/else、switch）要低效。 Java 每实例化一个 Exception，都会对当时的栈进行快照，这是一个相对比较重的操作。如果发生的非常频繁，这个开销可就不能被忽略了。 所以，对于部分追求极致性能的底层类库，有种方式是尝试创建不进行栈快照的 Exception。这本身也存在争议，因为这样做的假设在于，我创建异常时知道未来是否需要堆栈。问题是，实际上可能吗？小范围或许可能，但是在大规模项目中，这么做可能不是个理智的选择。如果需要堆栈，但又没有收集这些信息，在复杂情况下，尤其是类似微服务这种分布式系统，这会大大增加诊断的难度。 当我们的服务出现反应变慢、吞吐量下降的时候，检查发生最频繁的 Exception 也是一种思路。关于诊断后台变慢的问题，我会在后面的 Java 性能基础模块中系统探讨。 今天，我从一个常见的异常处理概念问题，简单总结了 Java 异常处理的机制。并结合代码，分析了一些普遍认可的最佳实践，以及业界最新的一些异常使用共识。最后，我分析了异常性能开销，希望对你有所帮助。 一课一练 关于今天我们讨论的题目你做到心中有数了吗？可以思考一个问题，对于异常处理编程，不同的编程范式也会影响到异常处理策略，比如，现在非常火热的反应式编程（Reactive Stream），因为其本身是异步、基于事件机制的，所以出现异常情况，决不能简单抛出去；另外，由于代码堆栈不再是同步调用那种垂直的结构，这里的异常处理和日志需要更加小心，我们看到的往往是特定 executor 的堆栈，而不是业务方法调用关系。对于这种情况，你有什么好的办法吗？ 请你在留言区分享一下你的解决方案，我会选出经过认真思考的留言，送给你一份学习鼓励金，欢迎你与我一起讨论。 你的朋友是不是也在准备面试呢？你可以“请朋友读”，把今天的题目分享给好友，或许你能帮到他。 © 版权归极客邦科技所有，未经许可不得传播售卖。 页面已增加防盗追踪，如有侵权极客邦将依法追究其法律责任。"}]}


## 3 谈谈final,finally,finalize有什么不同？

### 典型回答

`final` 可以用来修饰类、方法、变量，分别有不同的意义；final修饰的class代表不可以继承扩展，final的变量是不可以修改的。而final的方法是不可以重写的（override）。`final` 修饰方法参数，不能修改参数值，否则编译报错。

`finally` 是Java保证代码一定要被执行的一种机制。

`finalize` 是Object的一个方法，保证对象在被垃圾收集前完成特定资源的回收。finalize机制现在已经不推荐使用，并且在JDK9开始被标记为`depretected`  

### 考点分析

推荐使用final关键字来明确表示我们代码的语义，逻辑意图，比如：
1. 将方法或者类生命为final，明确告诉别人，这些行为是不需修改的。
2. 使用final修饰参数或者变量，可以清楚的避免意外赋值导致的编程错误。
3. final变量产生了某种程度的不可变（immutable）的效果，所以，可以用于保护只读数据，尤其是在并发编程中。

finally，知道怎么用，关闭连接资源等，推荐使用 `try-weith-resource`

对于`finalize`,明确它是不推荐使用的，因为无法保证finalize什么时候执行，执行的是否符合预期。使用不当会影响性能，导致程序死锁，挂起等。

### 知识扩展

#### 注意，final 不是 immutable！

```java
 final List<String> strList = new ArrayList<>();
 strList.add("Hello");
 strList.add("world");  
 List<String> unmodifiableStrList = List.of("hello", "world");
 unmodifiableStrList.add("again");
```

final 只能约束 strList这个引用不可以被赋值，但是strList对象行为不被final影响，添加元素等操作完全正常。而List.of()方法（jdk9+）创建的本身就是不可变List，最后那句add会抛出运行时异常。

**资源用完即显示释放，或者利用资源池来尽量重用。**

## 4. 强引用，软引用，弱引用，幻想引用有什么区别？

强引用，软引用，弱引用，幻想引用有什么区别？具体使用场景是什么？
[原文链接](https://time.geekbang.org/column/article/6970)

### 典型回答

不同的引用类型，主要体现的是**对象***不同的可达性(reachable)状态和对垃圾收集的影响*。

强引用：最常见的普通对象引用，只要还有强引用指向一个对象，就能表明对象还“活着”，就不会被GC回收。对于一个普通的对象，如果没有其他的引用关系，只要超过了引用的作用域或者显式地将相应强引用赋值为null，就是可以被垃圾收集的了，当然具体的回收时机还是要看垃圾回收策略。

软引用：是一种相对强引用弱化一些的引用，可以让对象豁免一些垃圾收集，只有当JVM认为内存不足时，才会去试图回收软引用指向的对象。JVM会确保在抛出OOM-Error之前，清理软引用指向的对象。通常用来实现内存敏感的缓存。

弱引用：并不能使对象豁免垃圾收集，仅仅是提供一种访问在弱引用状态下对象的途径。用来构建一种没有特定约束的关系。

幻象引用，也叫虚引用，不能通过它访问对象。幻象引用仅仅是提供了一种确保对象被finalize之后，做某些事情的机制。

### 考点分析

在大多数应用开发中，很少直接操作各种不同引用。考察我们对基础概念的理解，也考察对底层对象生命周期、垃圾收集机制等的掌握。

### 知识扩展

![对象生命周期](https://static001.geekbang.org/resource/image/36/b0/36d3c7b158eda9421ef32463cb4d4fb0.png)

判断对象可达性，是JVM垃圾收集器决定如何处理对象的一部分考虑。

诊断JVM引用情况 JDK8

```bash
-XX:+PrintGCDetails -XX:+PrintGCTimeStamps -XX:+PrintReferenceGC
```

`Reachability Fence`

### 评论学习

**JK-ID:公号-代码荣耀**  
在Java语言中，除了基本数据类型外，其他的都是指向各类对象的对象引用；Java中根据其生命周期的长短，将引用分为4类。

1 强引用

特点：我们平常典型编码Object obj = new Object()中的obj就是强引用。通过关键字new创建的对象所关联的引用就是强引用。 当JVM内存空间不足，JVM宁愿抛出OutOfMemoryError运行时错误（OOM），使程序异常终止，也不会靠随意回收具有强引用的“存活”对象来解决内存不足的问题。对于一个普通的对象，如果没有其他的引用关系，只要超过了引用的作用域或者显式地将相应（强）引用赋值为 null，就是可以被垃圾收集的了，具体回收时机还是要看垃圾收集策略。

2 软引用

特点：软引用通过SoftReference类实现。 软引用的生命周期比强引用短一些。只有当 JVM 认为内存不足时，才会去试图回收软引用指向的对象：即JVM 会确保在抛出 OutOfMemoryError 之前，清理软引用指向的对象。软引用可以和一个引用队列（ReferenceQueue）联合使用，如果软引用所引用的对象被垃圾回收器回收，Java虚拟机就会把这个软引用加入到与之关联的引用队列中。后续，我们可以调用ReferenceQueue的poll()方法来检查是否有它所关心的对象被回收。如果队列为空，将返回一个null,否则该方法返回队列中前面的一个Reference对象。

应用场景：软引用通常用来实现内存敏感的缓存。如果还有空闲内存，就可以暂时保留缓存，当内存不足时清理掉，这样就保证了使用缓存的同时，不会耗尽内存。

3 弱引用

弱引用通过WeakReference类实现。 弱引用的生命周期比软引用短。在垃圾回收器线程扫描它所管辖的内存区域的过程中，一旦发现了具有弱引用的对象，不管当前内存空间足够与否，都会回收它的内存。由于垃圾回收器是一个优先级很低的线程，因此不一定会很快回收弱引用的对象。弱引用可以和一个引用队列（ReferenceQueue）联合使用，如果弱引用所引用的对象被垃圾回收，Java虚拟机就会把这个弱引用加入到与之关联的引用队列中。

应用场景：弱应用同样可用于内存敏感的缓存。

4 虚引用

特点：虚引用也叫幻象引用，通过PhantomReference类来实现。无法通过虚引用访问对象的任何属性或函数。幻象引用仅仅是提供了一种确保对象被 finalize 以后，做某些事情的机制。如果一个对象仅持有虚引用，那么它就和没有任何引用一样，在任何时候都可能被垃圾回收器回收。虚引用必须和引用队列 （ReferenceQueue）联合使用。当垃圾回收器准备回收一个对象时，如果发现它还有虚引用，就会在回收对象的内存之前，把这个虚引用加入到与之关联的引用队列中。
ReferenceQueue queue = new ReferenceQueue ();
PhantomReference pr = new PhantomReference (object, queue); 
程序可以通过判断引用队列中是否已经加入了虚引用，来了解被引用的对象是否将要被垃圾回收。如果程序发现某个虚引用已经被加入到引用队列，那么就可以在所引用的对象的内存被回收之前采取一些程序行动。

应用场景：可用来跟踪对象被垃圾回收器回收的活动，当一个虚引用关联的对象被垃圾收集器回收之前会收到一条系统通知


**JK-ID: 海怪哥哥**  
我的理解，java的这种抽象很有意思。
强引用就像大老婆，关系很稳固。
软引用就像二老婆，随时有失宠的可能，但也有扶正的可能。
弱引用就像情人，关系不稳定，可能跟别人跑了。
幻像引用就是梦中情人，只在梦里出现过。

## 5 String & StringBuffer & StringBuilder 有什么区别？

理解Java的字符串，String、StringBulider、StringBuffer 有什么区别？  
[原文链接](https://time.geekbang.org/column/article/7349)

### 典型回答
 
`String` 是Java语言非常基础和重要的类，提供了构造和管理字符串的各种基本逻辑。它是典型的Immutable类，被声明成为final class，所有属性也都是final的。由于它的不可变性，类似拼接，裁剪字符串等动作，都会产生新的String对象。由于字符串操作的普遍性，所以相关操作的效率往往对应用性能有明显影响。

`StringBuffer` 是为解决String操作产生太多中间对象的问题而提供的一个类，本质是一个线程安全的可修改字符序列。

`StringBuilder` 是Java1.5 中新增的，在能力上和 StringBuffer没有本质区别，但是它去掉了线程安全的部分，有效减小了开销，是绝大部分情况下进行字符串拼接的首选。

### 考点分析

基本的线程安全设计与实现，JVM对象缓存机制的理解，JVM优化Java代码的一些技巧，String池？

### 知识扩展

1. 字符串设计与实现考量
 - Immutable类，原生的保证了基础线程安全，因为你无法对它内部数据进行任何修改，并且对象在拷贝时不需要额外复制数据。
 - StringBuffer的实现细节，通过把各种修改数据的方法都加上 `synchronized` 关键字实现，非常直白。“过早优化是万恶之源”，考虑可靠性、正确性和代码可读性才是大多是应用开发最重要的因素。

 ```java
     /**
     * Constructs a string builder initialized to the contents of the
     * specified string. The initial capacity of the string builder is
     * {@code 16} plus the length of the string argument.
     *
     * @param   str   the initial contents of the buffer.
     */
    public StringBuilder(String str) {
        super(str.length() + 16);
        append(str);
    }
```

- 内部char数组适当避免多次扩容的开销。扩容会产生多重开销，因为要抛弃原有数组，创建新的数组，还要进行arraycopy

2. 字符串缓存

堆转储（Dump Heap），25%字符串，一半重复。

Java6以后，`intern()`方法，实现相应字符串缓存，PermGen，永久代，空间有限，容易OOM；  
在后续版本中，缓存被放置在堆中，永久代在JDK8中被`MetaSpace` 元数据区替代了

```
SymbolTable statistics:
Number of buckets       :     20011 =    160088 bytes, avg   8.000
Number of entries       :     14448 =    346752 bytes, avg  24.000
Number of literals      :     14448 =    619280 bytes, avg  42.863
Total footprint         :           =   1126120 bytes
Average bucket size     :     0.722
Variance of bucket size :     0.715
Std. dev. of bucket size:     0.845
Maximum bucket size     :         6
StringTable statistics:
Number of buckets       :     60013 =    480104 bytes, avg   8.000
Number of entries       :      2554 =     61296 bytes, avg  24.000
Number of literals      :      2554 =    215512 bytes, avg  84.382
Total footprint         :           =    756912 bytes
Average bucket size     :     0.043
Variance of bucket size :     0.043
Std. dev. of bucket size:     0.206
Maximum bucket size     :         3
```

Intern是一种**显式地排重机制**，需要开发者写代码时明确调用，麻烦，污染代码，很难保证效率。  
Oracle JDK 8u20 之后，新特性，G1 GC下的字符串排重，JVM底层的改变。  
`Intrinsic` 机制

3. String自身的演化

### 评论学习

String的创建机理
由于String在Java世界中使用过于频繁，Java为了避免在一个系统中产生大量的String对象，引入了字符串常量池。其运行机制是：创建一个字符串时，首先检查池中是否有值相同的字符串对象，如果有则不需要创建直接从池中刚查找到的对象引用；如果没有则新建字符串对象，返回对象引用，并且将新创建的对象放入池中。但是，通过new方法创建的String对象是不检查字符串池的，而是直接在堆区或栈区创建一个新的对象，也不会把对象放入池中。上述原则只适用于通过直接量给String对象引用赋值的情况。

举例：
```java
String str1 = "123"; //通过直接量赋值方式，放入字符串常量池
String str2 = new String(“123”);//通过new方式赋值方式，不放入字符串常量池
```

## 6 动态代理是基于什么原理


## 15. 如何保证容器是线程安全的？ConcurrentHashMap如何实现高效地线程安全？

https://time.geekbang.org/column/article/8137