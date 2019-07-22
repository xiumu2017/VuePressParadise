# Spring 生态体系

## SpringBoot

### SpringBoot 常用注解及其作用

启动类，配置，控制器，业务层，数据库层，通用注解

@Controller

@RestController



### SpringMVC

### Spring 原理

### where 和 join 有什么区别？

能用where就用where，left join 不能过滤左边

### OSI七层模型

1. 物理层    网线
2. data link 
3. network   ip
4. transport tcp
5. 会话层
6. 表示层
7. 应用层

- 物理层：利用传输介质为数据链路层提供物理连接，实现比特流的透明传输。
- 数据链路层：负责建立和管理节点间的链路。
- 网络层：通过路由选择算法，为报文或分组通过通信子网选择最适当的路径。
- 传输层：向用户提供可靠的端到端的差错和流量控制，保证报文的正确传输。
- 会话层：向两个实体的表示层提供建立和使用连接的方法。
- 表示层：处理用户信息的表示问题，如编码、数据格式转换和加密解密等。
- 应用层：直接向用户提供服务，完成用户希望在网络上完成的各种工作。

### 三次握手，四次挥手

[大白话理解三次握手四次挥手](https://github.com/jawil/blog/issues/14)

精选内容：

引用知乎上的别人引用的一个回答，从另外一个角度阐释：

> 在Google Groups的TopLanguage中看到一帖讨论TCP“三次握手”觉得很有意思。贴主提出“TCP建立连接为什么是三次握手？”的问题，在众多回复中，有一条回复写道：“这个问题的本质是, 信道不可靠, 但是通信双发需要就某个问题达成一致. 而要解决这个问题, 无论你在消息中包含什么信息, 三次通信是理论上的最小值. 所以三次握手不是TCP本身的要求, 而是为了满足"在不可靠信道上可靠地传输信息"这一需求所导致的. 请注意这里的本质需求,信道不可靠, 数据传输要可靠. 三次达到了, 那后面你想接着握手也好, 发数据也好, 跟进行可靠信息传输的需求就没关系了. 因此,如果信道是可靠的, 即无论什么时候发出消息, 对方一定能收到, 或者你不关心是否要保证对方收到你的消息, 那就能像UDP那样直接发送消息就可以了.”。这可视为对“三次握手”目的的另一种解答思路。

Socket 原理

位码即TCP标志位，有6种表示
1. SYN synchronous建立联机
2. ACK acknowledgement 确认
3. PSH push传送
4. FIN finish结束
5. RST reset重置
6. URG urgent紧急


:::tip GitChat Interview
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

:::

## The History of Spring

Spring 是Java 历史中很重要的组成部分。

# 《Spring in Action》

路线图

- 第一部分：Spring框架的核心知识
- 第二部分：使用Spring构建Web应用程序
- 第三部分：在应用程序的后端使用Spring
- 第四部分：Spring与其他的应用和服务的集成

## 第一章： Spring 之旅

### 1.1 简化 Java 开发

- 基于POJO的轻量级和最小侵入式编程
- 通过依赖注入和面向接口实现松耦合
- 基于切面和惯例进行声明式编程
- 通过切面和模板减少样板式代码


#### 依赖注入 DI

构造器注入  *constructor injection* 

Spring 通过应用上下文 *Application Context* 装载bean的定义并把它们组装起来；
`ClassPathXmlApplicationContext` 加载位于应用程序类路径下的一个或者多个XML配置文件


#### 应用切面

DI能够让相互协作的软件组织保持松散耦合，而 **面向切面编程** （AOP,aspect-oriented programming）允许你把遍布应用各处的功能分离出来形成可重用的组件。

> 们可以把切面想象为覆盖在很多组件之上的一个外壳。应用是由那些实现各自业务功能的模块组成的。借助AOP，可以使用各种功能层去包裹核心业务层。这些层以声明的方式灵活地应用到系统中，你的核心应用甚至根本不知道它们的存在。这是一个非常强大的理念，可以**将安全、事务和日志关注点与核心业务逻辑相分离**。

#### 使用模板消除样式代码

exp. JdbcTemplate

### 1.2 容纳你的Bean

在Spring 应用中，对象由 Spring 容器创建和装配，并存在容器之中

> Spring自带了多个容器实现，可以归为两 种不同的类型。  
bean工厂（由`org.springframework.beans.factory.BeanFactory`接口定义）是最简单的容器，提供基本的DI支持。  
应用上下文（由`org.springframework.context.ApplicationContext`接口定义）基于BeanFactory构建，并提供应用框架级别的服务，例如从属性文件解析文本信息以及发布应用事件给感兴趣的事件监听者。

#### 使用应用上下文 Application Context

> Spring自带了多种类型的应用上下文。  
- AnnotationConfigApplicationContext：从一个或多个基于 Java的配置类中加载Spring应用上下文。   
- AnnotationConfigWebApplicationContext：从一个或多个基 于Java的配置类中加载Spring Web应用上下文。 
- ClassPathXmlApplicationContext：从类路径下的一个或多个 XML配置文件中加载上下文定义，把应用上下文的定义文件作为 类资源。 
- FileSystemXmlapplicationcontext：从文件系统下的一个或多 个XML配置文件中加载上下文定义。 
- XmlWebApplicationContext：从Web应用下的一个或多个XML 配置文件中加载上下文定义。

#### bean 的生命周期

> 在传统的Java应用中，bean的生命周期很简单。使用Java关键字new进行 bean实例化，然后该bean就可以使用了。一旦该bean不再被使用，则由 Java自动进行垃圾回收。 

1. Spring对bean进行实例化； 
2. Spring将值和bean的引用注入到bean对应的属性中； 
3. 如果bean实现了BeanNameAware接口，Spring将bean的ID传递给 setBean-Name()方法； 
4. 如果bean实现了BeanFactoryAware接口，Spring将调 用setBeanFactory()方法，将BeanFactory容器实例传入； 
5. 如果bean实现了ApplicationContextAware接口，Spring将调 用setApplicationContext()方法，将bean所在的应用上下文的引用 传入进来；
6. 如果bean实现了BeanPostProcessor接口，Spring将调用它们的 post-ProcessBeforeInitialization()方法；
7. 如果bean实现了InitializingBean接口，Spring将调用它们的 after-PropertiesSet()方法。类似地，如果bean使用init-method 声明了初始化方法，该方法也会被调用；
8. 如果bean实现了BeanPostProcessor接口，Spring将调用它们的 post-ProcessAfterInitialization()方法； 
9. 此时，bean已经准备就绪，可以被应用程序使用了，它们将一直驻留在应用上下文中，直到该应用上下文被销毁；
10. 如果bean实现了DisposableBean接口，Spring将调用它的destroy()接口方法。同样，如果bean使用destroy-method声明了销毁方法，该方法也会被调用。

### 1.3 俯瞰 Spring 风景线

- Spring 核心容器
- 面向切面编程
- 数据访问与集成
- Web与远程调用
- instrument
- 测试Test

## 第二章： 装配Bean

### 2.1 Spring 配置的可选方案

三种主要的装配机制： 
- 在XML中进行显式配置
- 在Java中进行显式配置
- 隐式的bean发现机制和自动装配

### 2.2 自动化转配Bean

Spring从两个角度来实现自动化装配：
- 组件扫描（component scanning）：Spring会自动发现应用上下文中所创建的bean。
- 自动装配（autowiring）：Spring自动满足bean之间的依赖。


@Configuration  @Component  

@Configuration注解表明这个类是一个配置类，该类应该包含在 Spring应用上下文中如何创建bean的细节。 

@ComponentScan 注解启用了组件扫描

可以考虑在包中创建一个用来进行扫描的空标记接口（marker interface）。通过标记接口的方式，能够保持对重构友好的接口引用，但是可以避免引用任何实际的应用程序代码（在稍后重构中，这些应用代码有可能会从想要扫描的包中移除掉）。

> Spring应用上下文中所有的bean都会给定一个ID。但Spring会根据类名为其指定一个ID，也就是将类名的第一个字母变为小写。如果想为这个bean设置不同的ID，你所要做的就是将期望的ID作为值传递给 `@Component` 注解。

@Autowired 自动装配  
不管是构造器、Setter方法还是其他的方法，Spring都会尝试满足方法参数上所声明的依赖。假如有且只有一个bean匹配依赖需求的话，那么这个bean将会被装配进来。 如果有多个bean都能满足依赖关系的话，Spring将会抛出一个异常，表明没有明确指定要选择哪个bean进行自动装配。

@Inject注解来源于Java依赖注入规范，该规范同时还为我们定义了 @Named注解。在自动装配中，Spring同时支持@Inject和 @Autowired。尽管@Inject和@Autowired之间有着一些细微的差别， 但是在大多数场景下，它们都是可以互相替换的。

### 2.3 通过Java代码装配bean

@Bean  
注解会告诉Spring这个方法将会返回一个对象，该对象要注册为 Spring应用上下文中的bean。方法体中包含了最终产生bean实例的逻辑。

默认情况下，bean的ID与带有@Bean注解的方法名是一样的。想为其设置成一个不同的名字的话，那么可以重命名该方法，也可以通过name属性指定一个不同的名字。

带有@Bean注解的方法可以采用任何必要的Java功能来产生bean实例。构造器和Setter方法只是@Bean方法的两个简单样例。这 里所存在的可能性仅仅受到Java语言的限制。

### 2.4 通过XML装配bean

```
<beans>
<bean>
<list>
<set>
<value>
<property>
```

### 2.5 导入和混合配置

#### 在 JavaConfig 中引用XML配置

@Import  
@ImportResource

#### 在 XML 配置中引用 JavaConfig

`<import>`


### 2.6 小结

建议尽可能使用自动化配置，以避免显式配置所带来的维护成本。但是，如果你确实需要显式配置Spring的话，应该优先选择基于Java的配置，它比基于XML的配置更加强大、类型安全并且易于重构。 

## 第三章： 高级装配

- Spring profile
- 条件化的bean声明
- 自动装配与歧义性
- bean 的 作用域
- Spring 表达式语言

### 3.1 环境与 profile

在Java配置中，可以使用 `@Profile` 注解指定某个bean属于哪一个profile `@Profile("dev")`

Spring在确定哪个profile处于激活状态时，需要依赖两个独立的属性：
- `spring.profiles.active`
- `spring.profiles.default`

如果设置了 `spring.profiles.active` 属性的话，那么它的值就会用来确定哪个profile是激活的。  
但如果没有设置`spring.profiles.active` 属性的话，那Spring将会查找`spring.profiles.default` 的值。
如果 `spring.profiles.active`和 `spring.profiles.default` 均没有设置的话，那就没有激活的profile，因此只会创建那些没有定义在profile中的bean。

有多种方式来设置这两个属性：
- 作为DispatcherServlet的初始化参数；
- 作为Web应用的上下文参数； 
- 作为JNDI条目； 
- 作为环境变量； 
- 作为JVM的系统属性； 
- 在集成测试类上，使用 `@ActiveProfiles` 注解设置。

### 3.2 条件化的 bean

Spring 4 引入了 一个新的 `@Conditional` 注解，它可以用到带有 `@Bean` 注解的方法上。  
如果给定的条件计算结果为true，就会创建这个bean，否则的话，这个 bean会被忽略。 

设置给`@Conditional` 的类可以是任意实现了 `Condition接口` 的类型。 
可以看出来，这个接口实现起来很简单直接，只需提供matches()方法的实现即可。

```java
public interface Condition {    
    boolean matches(ConditionContext ctxt, AnnotatedTypeMetadata metadata); 
}
```

通过 `ConditionContext` ，我们可以做到如下几点： 
- 借助 `getRegistry()` 返回的 `BeanDefinitionRegistry` 检查bean定义； 
- 借助 `getBeanFactory()` 返回的 `ConfigurableListableBeanFactory` 检查bean是否存在，甚至探查bean的属性； 
- 借助 `getEnvironment()` 返回的 `Environment` 检查环境变量是否存在以及它的值是什么； 
- 读取并探查 `getResourceLoader()` 返回的 `ResourceLoader` 所加载的资源； 
- 借助 `getClassLoader()` 返回的 `ClassLoader` 加载并检查类是否存在。

`AnnotatedTypeMetadata` 则能够让我们检查带有 `@Bean` 注解的方法上 还有什么其他的注解。
像ConditionContext一 样，AnnotatedTypeMetadata也是一个接口。

```java
public interface AnnotatedTypeMetadata {  

    boolean isAnnotated(String annotationType);  

    Map<String, Object> getAnnotationAttributes(String annotationType);  

    Map<String, Object> getAnnotationAttributes(String annotationType, boolean classValuesAsString);  

    MultiValueMap<String, Object> getAllAnnotationAttributes(String annotationType);  

    MultiValueMap<String, Object> getAllAnnotationAttributes(String annotationType, boolean classValuesAsString); 
}

```

非常有意思的是，从Spring 4开始，`@Profile` 注解进行了重构，使其基于 `@Conditional` 和 `Condition` 实现。

### 3.3 处理自动装配的歧义性

`NoUniqueBeanDefinitionException`

将可选bean中的某一个设为首选（primary）的bean，或者使用限定符（qualifier）来帮助Spring将可选的bean的范围缩小到只有一个bean。 

在Spring中，可以通过 `@Primary` 来表达最喜欢的方案。  
`@Primary` 能够与 `@Component` 组合用在组件扫描的bean上，也可以与 `@Bean` 组合用在Java配置的bean声明中。

`@Qualifier` 注解是使用限定符的主要方式。  
它可以与 `@Autowired` 和 `@Inject` 协同使用，在注入的时候指定想要注入进去的是哪个bean。  

```java

@Autowired
@Qualifier("iceCream") 
public void setDessert(Dessert dessert) {
    this.dessert = dessert; 
}

```

为了创建自定义的条件化注解，我们创建一个新的注解并在这个注解上添加了 `@Conditional`。  
为了创建自定义的限定符注解，我们创建一个新的注解并在这个注解上添加了`@Qualifier`。  
这种技术可以用到很多的Spring注解中，从而能够将它们组合在一起形成特定目标的自定义注解。  


### 3.4 bean 的作用域

> 在默认情况下，Spring应用上下文中所有bean都是作为以单例 （singleton）的形式创建的。
也就是说，不管给定的一个bean被注入到其他bean多少次，每次所注入的都是同一个实例。

Spring定义了多种作用域，可以基于这些作用域创建bean，包括： 
- 单例（Singleton）：在整个应用中，只创建bean的一个实例。
- 原型（Prototype）：每次注入或者通过Spring应用上下文获取的时候，都会创建一个新的bean实例。 
- 会话（Session）：在Web应用中，为每个会话创建一个bean实例。 
- 请求（Rquest）：在Web应用中，为每个请求创建一个bean实例。

`@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)`

**使用会话和请求作用域**

`@Scope(value=WebApplicationContext.SCOPE_SESSION, proxyMode=ScopedProxyMode.INTERFACES) `
proxyMode属性被设置成了 `ScopedProxyMode.INTERFACES` ，
这表明这个代理要实现 `ShoppingCart` 接口，并将调用委托给实现bean。

如果ShoppingCart是接口而不是类的话，这是可以的（也是最为理想的代理模式）。  
但如果ShoppingCart是一个具体的类的话，Spring就没有办法创建 **基于接口的代理**了。  
此时，它必须使用 **CGLib** 来生成基于类的代理。  
所以，如果bean类型是具体类的话，我们必须要将proxyMode属性设置为
`ScopedProxyMode.TARGET_CLASS` ，以此来表明要以生成目标类扩展的方式创建代理。

### 3.5 运行时值注入

有时候硬编码是可以的，但有的时候，我们可能会希望避免硬编码值， 而是想让这些值在运行时再确定。  
为了实现这些功能，Spring提供了两种在运行时求值的方式：
- 属性占位符（Property placeholder）
- Spring表达式语言（SpEL）

很快你就会发现这两种技术的用法是类似的，不过它们的目的和行为是有所差别的。

使用 `@PropertySource` 注解和 `Environment`

```java
String getProperty(String key) 
String getProperty(String key, String defaultValue) 
T getProperty(String key, Class<T> type) 
T getProperty(String key, Class<T> type, T defaultValue)

getRequiredProperty() IllegalStateException

// 检查一下某个属性是否存在
boolean containsProperty();

// 将属性解析为类的话
getPropertyAsClass();

// Environment还提供了一些方法来检查哪些 profile处于激活状态： 
// 返回激活profile名称的数组； 
String[] getActiveProfiles()
// 返回默认profile名称的数组； 
String[] getDefaultProfiles()
// 如果 environment支持给定profile的话，就返回true。
boolean acceptsProfiles(String... profiles);

```
`@Value("${...}")`
为了使用占位符，我们必须要配置一个 `PropertyPlaceholderConfigurer` bean 或 `PropertySourcesPlaceholderConfigurer` bean。  
从Spring 3.1开始，推荐使用 `PropertySourcesPlaceholderConfigurer`，因为它能 够基于Spring Environment及其属性源来解析占位符。  

如下的@Bean方法在Java中配置
```java
@Bean 
public static PropertySourcesPlaceholderConfigurer placeholderConfigurer() {
      return new PropertySourcesPlaceholderConfigurer(); 
}
```

#### 3.5.2 使用Spring 表达式语言进行装配

Spring 3 引入了Spring表达式语言（Spring Expression Language， SpEL），
它能够以一种强大和简洁的方式将值装配到bean属性和构造器参数中，在这个过程中所使用的表达式会在运行时计算得到值。
使用 SpEL，你可以实现超乎想象的装配效果，这是使用其他的装配技术难以做到的（甚至是不可能的）。

SpEL拥有很多特性，包括： 
- 使用bean的ID来引用bean； 
- 调用方法和访问对象的属性； 
- 对值进行算术、关系和逻辑运算； 
- 正则表达式匹配； 
- 集合操作。

```java
// #{1} 
// #{T(System).currentTimeMillis()}
// #{sgtPeppers.artist} 
// #{systemProperties['disc.title']}


```

:::warning
扩展学习 spel 详细语法
:::

### 3.6 小结

:::tip 

我们在本章介绍了许多背景知识，在第2章所介绍的基本bean装配基础 之上，又学习了一些强大的高级装配技巧。

首先，我们学习了Spring profile，它解决了Spring bean要跨各种部署环境的通用问题。
在运行时，通过将环境相关的bean与当前激活的profile 进行匹配，Spring能够让相同的部署单元跨多种环境运行，而不需要进行重新构建。
Profile bean是在运行时条件化创建bean的一种方式，但是Spring 4提供了一种更为通用的方式，
通过这种方式能够声明某些bean的创建与否要依赖于给定条件的输出结果。
结合使用@Conditional注解和Spring Condition接口的实现，能够为开发人员提供一种强大和灵活的机制，实现条件化地创建bean。 

我们还看了两种解决自动装配歧义性的方法：首选bean以及限定符。尽管将某个bean设置为首选bean是很简单的，但这种方式也有其局限性，所以我们讨论了如何将一组可选的自动装配bean，借助限定符将其范围 缩小到只有一个符合条件的bean。

除此之外，我们还看到了如何创建自定义的限定符注解，这些限定符描述了bean的特性。 

尽管大多数的Spring bean都是以单例的方式创建的，但有的时候其他的创建策略更为合适。Spring能够让bean以单例、原型、请求作用域或会话作用域的方式来创建。

在声明请求作用域或会话作用域的bean的时候，我们还学习了如何创建作用域代理，它分为基于类的代理和基于接口的代理的两种方式。

最后，我们学习了Spring表达式语言，它能够在运行时计算要注入到 bean属性中的值。 

:::

## 第四章： 面向切面的Spring

本章内容：
- 面向切面编程的基本原理
- 通过POJO创建切面
- 使用@AspectJ注解
- 为AspectJ切面注入依赖

> 在软件开发中，散布于应用中多处的功能被称为横切关注点（crosscutting concern）。通常来讲，这些横切关注点从概念上是与应用的业务
逻辑相分离的（但是往往会直接嵌入到应用的业务逻辑之中）。把这些横切关注点与业务逻辑相分离正是面向切面编程（AOP）所要解决的问题。


定义AOP术语，通知advice、切点pointcut、连接点join point。

- 前置通知 before
- 后置通知 after
- 返回通知 after-returning
- 异常通知 after-throwing
- 环绕通知 around

引入 introduction

织入 weaving

织入是把切面应用到目标对象并创建新的代理对象的过程。

切面在指定的连接点被织入到目标对象中。在目标对象的生命周期里有多个点可以进行织入：

- 编译期：切面在目标类编译时被织入。这种方式需要特殊的编译器。AspectJ的织入编译器就是以这种方式织入切面的。 
- 类加载期：切面在目标类加载到JVM时被织入。这种方式需要特殊的类加载器（ClassLoader），它可以在目标类被引入应用之前增强该目标类的字节码。AspectJ5的加载时织入（load-time weaving，LTW）就支持以这种方式织入切面。 
- 运行期：切面在应用运行的某个时刻被织入。一般情况下，在织入切面时，AOP容器会为目标对象动态地创建一个代理对象。Spring AOP就是以这种方式织入切面的。 

Spring提供了4种类型的AOP支持： 
- 基于代理的经典Spring AOP；
- 纯POJO切面； 
- @AspectJ注解驱动的切面； 
- 注入式AspectJ切面（适用于Spring各版本）。 

**Spring在运行时通知对象**

通过在代理类中包裹切面，Spring在运行期把切面织入到Spring管理的bean中。
代理类封装了目标类，并拦截被通知方法的调用，再把调用转发给真正的目标bean。
当代理拦截到方法调用时，在调用目标bean方法之前，会执行切面逻辑。

> Spring的切面由包裹了目标对象的代理类实现。 代理类处理方法的调用，执行额外的切面逻辑，并调用目标方法。

### 4.2 通过切点来选择连接点

关于Spring AOP的AspectJ切点，最重要的一点就是Spring仅支持AspectJ 切点指示器（pointcut designator）的一个子集。

`"execution(* com.woyi.mas..dao.*Mapper.*ByPage(..))`

@Pointcut注解能够在一个@AspectJ切 面内定义可重用的切点

|注　　解 | 通　　知 |
|---| --- |
|@After | 通知方法会在目标方法返回或抛出异常后调用|
|@AfterReturning | 通知方法会在目标方法返回后调用|
|@AfterThrowing | 通知方法会在目标方法抛出异常后调用|
|@Around | 通知方法会将目标方法封装起来|
|@Before | 通知方法会在目标方法调用之前执行|

可以在**配置类的类级别上**通过使用 `EnableAspectJ-AutoProxy` 注解启用自动代理功能。

**创建环绕通知**

环绕通知是最为强大的通知类型。它能够让你所编写的逻辑将被通知的 目标方法完全包装起来。实际上就像在一个通知方法中同时编写前置通知和后置通知。

它接受 `ProceedingJoinPoint` 作为参数。这个对象是必须要有的，因为你要在通知中通过它来调用被通知的方法。
通知方法中可以做任何的事情，当要将控制权交给被通知的方法时，它需要调用 `ProceedingJoinPoint` 的 `proceed()` 方法。 

使用Spring AOP，我们可以为bean引入新的方法。 代理拦截调用并委托给实现该方法的其他对象。

```java
@Aspect 
public class EncoreableIntroducer {
    @DeclareParents(value="concert.Performance+", defaultImpl=DefaultEncoreable.class)  
    public static Encoreable encoreable;
}
```

可以看到，`EncoreableIntroducer` 是一个切面。
但是，它与我们之前 所创建的切面不同，它并没有提供前置、后置或环绕通知，
而是通过 `@DeclareParents` 注解，将 `Encoreable` 接口引入到 `Performance` bean 中。

`@DeclareParents` 注解由三部分组成： 
- value属性指定了哪种类型的bean要引入该接口。在本例中，也就是所有实现Performance的类型。（标记符后面的加号表示是Performance的所有子类型，而不是Performance本身） 
- defaultImpl属性指定了为引入功能提供实现的类。在这里，我们 指定的是 `DefaultEncoreable` 提供实现。
- `@DeclareParents` 注解所标注的静态属性指明了要引入了接口。 在这里，我们所引入的是 `Encoreable` 接口。 

:::danger
在本书前面的内容中，我曾经建立过这样一种原则，
那就是基于注解的配置要优于基于Java的配置，
基于Java的配置要优于基于XML的配置。 
但是，如果你需要声明切面，但是又不能为通知类添加注解的时候，那么就必须转向XML配置了。 
:::

### 4.5 注入 AspectJ 切面

### 4.6 小结

AOP是面向对象编程的一个强大补充。通过AspectJ，我们现在可以把之前分散在应用各处的行为放入可重用的模块中。我们显示地声明在何处如何应用该行为。这有效减少了代码冗余，并让我们的类关注自身的主要功能。

Spring提供了一个AOP框架，让我们把切面插入到方法执行的周围。现在我们已经学会如何把通知织入前置、后置和环绕方法的调用中，以及为处理异常增加自定义的行为。

关于在Spring应用中如何使用切面，我们可以有多种选择。通过使用 `@AspectJ` 注解和简化的配置命名空间，在Spring中装配通知和切点变得非常简单。

最后，当Spring AOP不能满足需求时，我们必须转向更为强大的 AspectJ。对于这些场景，我们了解了如何使用Spring为AspectJ切面注入依赖。

---

## 第五章： 构建 Spring Web 应用程序