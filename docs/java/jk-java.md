# Java核心技术36讲

![强烈推荐加入学习](https://cdn.nlark.com/yuque/0/2019/jpeg/159222/1561478304395-47cc50b6-d12b-4006-bef5-20a4866ad6e9.jpeg?x-oss-process=image/resize,w_311)

极客时间 | Java核心技术36讲学习笔记

[[toc]]

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

[原文链接](https://time.geekbang.org/column/article/6849)

Java 语言在设计之初就提供了相对完善的异常处理机制，这也是 Java 得以大行其道的原因之一，因为这种机制大大降低了编写和维护可靠程序的门槛。如今，异常处理机制已经成为现代编程语言的标配。  

请对比 Exception 和 Error，另外，运行时异常与一般异常有什么区别？ 

#### 典型回答 

Exception 和 Error 都是继承了 Throwable 类，在 Java 中只有 Throwable 类型的实例才可以被抛出（throw）或者捕获（catch），它是异常处理机制的基本组成类型。

Exception 和 Error 体现了 Java 平台设计者对不同异常情况的分类。

Exception 是程序正常运行中，可以预料的意外情况，可能并且应该被捕获，进行相应处理。

Error 是指在正常情况下，不大可能出现的情况，绝大部分的 Error 都会导致程序（比如 JVM 自身）处于非正常的、不可恢复状态。既然是非正常情况，所以不便于也不需要捕获，常见的比如 OutOfMemoryError 之类，都是 Error 的子类。

Exception 又分为可检查（checked）异常和不检查（unchecked）异常，可检查异常在源代码里必须显式地进行捕获处理，这是编译期检查的一部分。不检查异常就是所谓的**运行时异常**，类似 `NullPointerException`、`ArrayIndexOutOfBoundsException` 之类，通常是可以编码避免的逻辑错误，具体根据需要来判断是否需要捕获，并不会在编译期强制要求。 

#### 考点分析 

分析 Exception 和 Error 的区别，是从概念角度考察了 Java 处理机制。总的来说，还处于理解的层面，面试者只要阐述清楚就好了。 

我们在日常编程中，如何处理好异常是比较考验功底的，我觉得需要掌握两个方面。 

第一，理解 Throwable、Exception、Error 的设计和分类。比如，掌握那些应用最为广泛的子类，以及如何自定义异常等。 很多面试官会进一步追问一些细节，比如，你了解哪些 Error、Exception 或者 RuntimeException？ 其中有些子类型，最好重点理解一下，比如 NoClassDefFoundError 和 ClassNotFoundException 有什么区别，这也是个经典的入门题目。

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

第一，尽量不要捕获类似 `Exception` 这样的通用异常，而是应该**捕获特定异常**，在这里是 `Thread.sleep()` 抛出的 `InterruptedException`。 这是因为在日常的开发和合作中，我们读代码的机会往往超过写代码，软件工程是门协作的艺术，所以我们有义务让自己的代码能够直观地体现出尽量多的信息，而泛泛的 Exception 之类，恰恰隐藏了我们的目的。另外，我们也要保证程序不会捕获到我们不希望捕获的异常。比如，你可能更希望 RuntimeException 被扩散出来，而不是被捕获。 进一步讲，除非深思熟虑了，否则不要捕获 Throwable 或者 Error，这样很难保证我们能够正确程序处理 OutOfMemoryError。 

第二，不要生吞（swallow）异常。这是异常处理中要特别注意的事情，因为很可能会导致非常难以诊断的诡异情况。 生吞异常，往往是基于假设这段代码可能不会发生，或者感觉忽略异常是无所谓的，但是千万不要在产品代码做这种假设！ 如果我们不把异常抛出来，或者也没有输出到日志（Logger）之类，程序可能在后续代码以不可控的方式结束。没人能够轻易判断究竟是哪里抛出了异常，以及是什么原因产生了异常。 
 
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
     Objects.requireNonNull(filename); 
     //...perform other operations... 
     InputStream in = new FileInputStream(filename); 
     //...read the preferences file... 
} 
 ```

 至于“catch late”，其实是我们经常苦恼的问题，捕获异常后，需要怎么处理呢？最差的处理方式，就是我前面提到的“生吞异常”，本质上其实是掩盖问题。如果实在不知道如何处理，可以选择保留原有异常的 cause 信息，直接再抛出或者构建新的异常抛出去。在更高层面，因为有了清晰的（业务）逻辑，往往会更清楚合适的处理方式是什么。 有的时候，我们会根据需要自定义异常，这个时候除了保证提供足够的信息，还有两点需要考虑： 是否需要定义成 Checked Exception，因为这种类型设计的初衷更是为了从异常情况恢复，作为异常设计者，我们往往有充足信息进行分类。 在保证诊断信息足够的同时，也要考虑避免包含敏感信息，因为那样可能导致潜在的安全问题。如果我们看 Java 的标准类库，你可能注意到类似 java.net.ConnectException，出错信息是类似“ Connection refused (Connection refused)”，而不包含具体的机器名、IP、端口等，一个重要考量就是信息安全。类似的情况在日志中也有，比如，用户数据一般是不可以输出到日志里面的。
 
 我们从性能角度来审视一下 Java 的异常处理机制，这里有两个可能会相对昂贵的地方： try-catch 代码段会产生额外的性能开销，或者换个角度说，它往往会影响 JVM 对代码进行优化，所以建议**仅捕获有必要的代码段**，尽量不要一个大的 try 包住整段的代码；与此同时，利用异常控制代码流程，也不是一个好主意，远比我们通常意义上的条件语句（if/else、switch）要低效。 Java 每实例化一个 Exception，都会对当时的栈进行快照，这是一个相对比较重的操作。如果发生的非常频繁，这个开销可就不能被忽略了。


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

[原文链接](https://time.geekbang.org/column/article/6970)

强引用，软引用，弱引用，幻想引用有什么区别？具体使用场景是什么？

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

[原文链接](https://time.geekbang.org/column/article/7349)

理解Java的字符串，String、StringBulider、StringBuffer 有什么区别？  

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

[原文链接](https://time.geekbang.org/column/article/7489)

通常认为，Java是静态（类型信息编译期检查）的强类型语言（不同类型变量赋值时，需要显式地强制类型转换），但是因为提供了类似反射等机制，也具备了部分动态类型语言的能力。

谈谈Java反射机制，动态代理是基于什么原理？

### 典型回答

反射机制是Java语言提供的一种基础功能，旨在赋予程序在运行时**自省（introspect）** 的能力。通过反射我们可以直接操作类或者对象，比如获取某个对象的类定义，获取类声明的属性和方法，调用方法或者构造对象，甚至可以运行时修改类定义。

动态代理是一种方便运行时构建代理、动态处理代理方法调用的机制，很多场景都是利用类似机制做到的，比如用来包装RPC调用，面向切面的编程（AOP）。

实现动态代理的方式很多，比如JDK自身提供的动态代理，就是主要利用了上面提到的反射机制。还有其他的实现方式，比如利用传说中更高性能的字节码操作机制，类似ASM,cglib，javassit等。

### 考点分析

- 对反射机制的了解和掌握程度
- 动态代理解决了什么问题？在业务系统中的场景？
- JDK动态代理在设计和实现上与cglib等方式的区别，如何取舍？

### 知识扩展

1. 反射机制及其演进

基本场景编程  
运行时修改成员访问限制 AccessibleObject.setAccessible​(boolean flag)

2. 动态代理

代理机制，代理可以看作是对调用目标的一个包装，这样我们对目标代码的调用不是直接发生的，而是通过代理完成。
其实很多动态代理场景，也可以看作是装饰器模式的应用。通过代理可以让调用者与与实现者之间**解耦**。

很多东西暂时看不懂，需要后面回过头来继续深入学习，螺旋上升。

## 7. int 和 Integer有什么区别？

[原文链接](https://time.geekbang.org/column/article/7514)

原始数据类型，int和Integer有什么区别？谈谈Integer的值缓存范围。

### 典型回答

int，整型数字，是Java的8个基本类型之一

Integer是int对应的包装类，它有一个int类型的字段存储数据，并且提供了基本操作，比如数学运算，int和字符串之间的转换等。在Java5中，引入了自动装箱和自动拆箱功能，Java可以根据上下文，自动进行转换，极大地简化了相关编程。

关于Integer的值缓存，在Java5中新增了静态工厂方法valueOf，在调用它的时候会利用一个缓存机制，默认缓存是在[-128,127]

### 考点分析

自动装箱，自动拆箱机制，源码分析等

### 知识扩展

1. 理解自动装箱，自动拆箱

什么是自动装箱和拆箱

自动装箱就是Java自动将原始类型值转换成对应的对象，比如将int的变量转换成Integer对象，这个过程叫做装箱，反之将Integer对象转换成int类型值，这个过程叫做拆箱。因为这里的装箱和拆箱是自动进行的非人为转换，所以就称作为自动装箱和拆箱。原始类型byte,short,char,int,long,float,double和boolean对应的封装类为Byte,Short,Character,Integer,Long,Float,Double,Boolean。
[参考文章](https://droidyue.com/blog/2015/04/07/autoboxing-and-autounboxing-in-java/)
```java
ArrayList<Integer> intList = new ArrayList<Integer>();
intList.add(1); //autoboxing - primitive to object
intList.add(2); //autoboxing

ThreadLocal<Integer> intLocal = new ThreadLocal<Integer>();
intLocal.set(4); //autoboxing

int number = intList.get(0); // unboxing
int local = intLocal.get(); // unboxing in Java

// 编程时，需要注意到这一点，正确地声明变量类型，避免因为自动装箱引起的性能问题。
Integer sum = 0;
 for(int i=1000; i<5000; i++){
   sum+=i;
}

int result = sum.intValue() + i;
Integer sum = new Integer(result);

```

方法重载时不会自动装箱。

2. 源码分析

成员变量，不可变类型

3. 原始类型线程安全

4. Java原始数据类型和引用类型局限性

- 原始数据类型和Java泛型并不能配合使用
- 无法高效的表达数据，也不便于表达复杂的数据结构

### 课后练习

对象的内存结构是什么样的？比如对象头的结构。如何计算或者获取某个对象的大小？

### 评论学习


[JKID-Kyle]  
节选自《深入理解JAVA虚拟机》：
在HotSpot虚拟机中，对象在内存中存储的布局可以分为3块区域：对象头（Header）、实例数据（Instance Data）和对齐填充（Padding）。

HotSpot虚拟机的对象头包括两部分信息，第一部分用于存储对象自身的运行时数据，如哈希码（HashCode）、GC分代年龄、锁状态标志、线程持有的锁、偏向线程ID、偏向时间戳等，这部分数据的长度在32位和64位的虚拟机（未开启压缩指针）中分别为32bit和64bit，官方称它为"Mark Word"。

对象头的另外一部分是类型指针，即对象指向它的类元数据的指针，虚拟机通过这个指针来确定这个对象是哪个类的实例。并不是所有的虚拟机实现都必须在对象数据上保留类型指针，换句话说，查找对象的元数据信息并不一定要经过对象本身，这点将在2.3.3节讨论。另外，如果对象是一个Java数组，那在对象头中还必须有一块用于记录数组长度的数据，因为虚拟机可以通过普通Java对象的元数据信息确定Java对象的大小，但是从数组的元数据中却无法确定数组的大小。

接下来的实例数据部分是对象真正存储的有效信息，也是在程序代码中所定义的各种类型的字段内容。无论是从父类继承下来的，还是在子类中定义的，都需要记录起来。

第三部分对齐填充并不是必然存在的，也没有特别的含义，它仅仅起着占位符的作用。由于HotSpot VM的自动内存管理系统要求对象起始地址必须是8字节的整数倍，换句话说，就是对象的大小必须是8字节的整数倍。

## 8. 对比Vector、ArrayList、LinkedList有何区别？

[原文链接](https://time.geekbang.org/column/article/7810)

### 典型回答

这三者都是实现集合框架中的List，也就是所谓的有序集合，因此功能相似，定位，添加，删除，遍历等。但因为具体的设计区别，在行为，性能，线程安全等方面，表现又有很大不同。

Vetor是Java早期提供的线程安全的动态数组

ArrayList是应用更加广泛的动态数组实现，它本身不是线程安全的

LinkedList是双向链表，不需要调整容量，非线程安全

```java
    private static class Node<E> {
        E item;
        Node<E> next;
        Node<E> prev;

        Node(Node<E> prev, E element, Node<E> next) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }
    }
```

### 考点分析

1. Vetor和ArrayList 作为动态数组，内部元素以数组形式顺序存储，非常适合**随机访问**，除了尾部插入和删除元素，其它操作性能会相对较差。

2. 而LinkedList进行节点插入、删除却高效的多，但是随机访问性能则要比动态数组慢

3. 数据结构与算法，性能与并发

4. 掌握典型排序算法，内部排序，归并，交换，选择，插入等；外部排序，掌握利用内存和外部存储处理超大数据集

### 知识扩展

![狭义的集合框架](https://static001.geekbang.org/resource/image/67/c7/675536edf1563b11ab7ead0def1215c7.png)  

- List，有序集合，提供了方便的访问、插入、删除等操作
- Set，Set不允许元素重复，不存在两个对象equals返回true，保证唯一性
- Queue/Deque，则是Java提供的标准队列结构的实现

**TreeSet默认利用TreeMap实现，HashSet其实也是以HashMap为基础实现的，Map的马甲**

- TreeSet 支持自然顺序访问，但是添加、删除、包含等操作相对低效（`log(n)`）
- HashSet 利用哈希算法，理想情况下，如果哈希散列正常，可以提供常数时间的添加、删除、包含等操作，但是它不保证有序
- LinkedHashSet，内部构建了一个记录插入顺序的双向链表，因此提供了按照插入顺序遍历的能力，与此同时，也保证了常数时间的添加，删除，包含等操作，这些操作性能略低于HashSet，因为需要维护链表的开销
- 在遍历元素时，HashSet性能受自身容量影响，所以初始化时，除非有必要，否则不要将其背后的HashMap容量设置过大。而对于LinkedHashSet，由于其内部链表提供的方便，遍历性能只和元素多少有关系。

:::warning
Q: 如何进行容器的性能测试呢？
:::

这些集合类都不是线程安全的，但是可以通过 `Collections` 工具类的 `synchronized` 实现线程安全：

```java
List list = Collections.synchronizedList(new ArrayList());
```

:::danger @TODO
1. 扩展学习 `Collections` 集合工具类提供的静态方法
2. ArrayList 源码实现
:::

Java 提供的默认排序算法：

- 对于原始数据类型，目前使用的是所谓双轴快速排序（Dual-Pivot QuickSort），是一种改进的快速排序算法
- 对于对象数据类型，目前是则是使用TimSort，思想上也是一种归并和二分插入排序结合的优化排序算法

Java 8 改进：
支持Lambda和Stream，函数式代码；  
Java 8 在语言层面的新特性，允许接口实现默认方法；  

Java 9 改进：
Java标准类库提供了一系列的静态工厂方法，比如，`List.of()` `Set.of()`，代码简洁，同时是不可变的。
```java
List<String> simpleList = List.of("Hello","world");
```

## 9. 对比Hashtable，HashMap，TreeMap有什么不同

[原文链接](https://time.geekbang.org/column/article/8053)

[从HashMap 开始...](https://www.yuque.com/paradise/wxs9x9/cxgbug)

### 负载因子，容量

## 10. 如何保证容器是线程安全的？ConcurrentHashMap如何实现高效地线程安全？

[原文链接](https://time.geekbang.org/column/article/8137)

::: tip 典型回答

Java提供了不同层面的线程安全支持。在传统集合框架内部，除了Hashtable等同步容器，还提供了所谓的同步包装器（Synchronized Wrapper）,我们可以调用 `Collections` 工具类提供的包装方法，来获取一个同步的包装容器，但是它们都是利用非常粗粒度的同步方式，在高并发情况下，性能比较低下。

更加普遍的选择是利用并发包提供的线程安全容器类，它提供了：

1. 各种并发容器，比如 `ConcurrentHashMap`,`CopyOnWriteArrayList`
2. 各种线程安全队列（`Queue`/ `Deque`）,`ArrayBlockingQueue` `SynchronousQueue`
3. 各种有序容器的线程安全版本等。

  具体保证线程安全的方式，从简单的sychronize方式，到基于更加精细化的，比如基于分离锁实现的`ConcurrentHashMap`等并发实现等。总体来说，并发包内提供的容器通用场景，远优于早期的简单同步实现。
:::

::: tip 知识扩展

**为什么需要ConcurrentHashMap？**
Hashtable 低效，HashMap 非线程安全；同步包装器的内部实现还是利用了'this' 作为互斥的mutex，没有真正意义上的改进。只适合在非高度并发的场景下。

**ConcurrentHashMap分析**

*完全没有看懂* ，无法体会那种场景，cas是什么 unsafe 又是什么？

:::


## 11. Java I/O 方式？NIO如何实现多路复用？

这一章节配合Tomcat & Jetty 源码食用。

[whats-the-difference-between-jetty-and-netty](https://stackoverflow.com/questions/5385407/whats-the-difference-between-jetty-and-netty)

:::tip
**Jetty** is a lightweight servlet container, easy to embed within a java application, there is an easy to use jetty client also.

**Netty** is an asynchronous event-driven network application framework. You can write your own servlet container or http client app with help of the Netty framework for example.

Edit:

Forgot to mention that Jetty 8 and Apache Tomcat 7 support servlet 3.0 spec, but netty doesn't. Because it's not a servlet container.

Netty 不是 servlet 容器，异步事件驱动网络程序框架。
:::


## 12. Java 文件拷贝方式

[原文链接](https://time.geekbang.org/column/article/8393)

[参考文章](https://www.journaldev.com/861/java-copy-file)

[参考源码](https://github.com/xiumu2017/ddp/blob/transitMonitor/src/main/java/com/paradise/interview/io/file/FileCopyDemo.java)
```java
    /**
     * Java io 实现 文件拷贝
     *
     * @param source 源文件
     * @param dest   目的文件
     * @throws IOException IO 异常
     */
    private static void copy(String source, File dest) throws IOException {
        try (
                InputStream inputStream = new FileInputStream(source);
                OutputStream outputStream = new FileOutputStream(dest)) {
            byte[] buffer = new byte[1024];
            int length;
            while ((length = inputStream.read(buffer)) > 0) {
                outputStream.write(buffer, 0, length);
            }
        }
    }
```

## 13. 谈谈抽象类和接口的区别

:::tip 典型回答
接口和抽象类是Java面向对象设计的两个基础机制。

接口是对行为的抽象，它是抽象方法的集合，利用接口可以达到API定义和实现分离的目的。  
接口不能实例化，不能包含任何非常量成员，任何field都是隐含着`public static final`的意义；  
同时，没有非静态方法实现，也就是说要么是静态方法，要么是抽象方法。

抽象类是不能实例化的类，用abstract关键字修饰class，其目的主要是代码重用。除了不能实例化，形式上和一般的Java类没有太大区别，可以有一个或者多个抽象方法，也可以没有抽象方法。抽象类大多用于抽取Java类的共用方法实现或者是共同成员变量，然后通过继承达到代码复用的目的。
:::

:::warning 知识扩展

Java 8 以后，接口也是可以有方法实现的！比如 `Collection`

## 14. 设计模式