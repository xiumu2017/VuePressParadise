---
title: SpringBoot + Indy-SDK 镜像搭建
date: 2021-4-25
sidebar: 'auto'
categories:
  - 区块链
tags:
  - docker
  - 区块链
publish: true
sticky: 1
---
<!-- 文章摘要，用于导航栏显示 -->
***Springboot + Indy-SDK 镜像搭建***

<!-- more -->

[[toc]]

我们项目一直用的一个 SpringBoot Docker 镜像： `wattazoum/springboot-runner`  
DockerHub 地址： [https://hub.docker.com/r/wattazoum/springboot-runner](https://hub.docker.com/r/wattazoum/springboot-runner)  
简单介绍：
> Based on [openjdk:8u121-jre-alpine](https://hub.docker.com/_/openjdk/) docker image.  
> This image is more that just a [Spring Boot](https://projects.spring.io/spring-boot/) runner. I can launch any java command.  
> I created it first because I needed to launch a spring boot application in a container.  
> But I didn't want to:  
>
> - recreate an image for every version
> - customize the docker run command per environment.

因为我们 凭证管理系统App 的接口中需要用到 indy-sdk ，但是官方并没有提供在 docker 容器中安装配置的方法，只能自己去自定义镜像。  

参考已有的 indy-sdk Dockerfile：

```dockerfile
FROM ubuntu:bionic
MAINTAINER author
RUN apt-get update
RUN apt-get install -y gnupg2 software-properties-common
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys CE7709D068DB5E88
RUN add-apt-repository "deb https://repo.sovrin.org/sdk/deb bionic stable"
RUN apt-get update
RUN apt-get install -y libindy
 ... 省略一些 Python 命令
RUN adduser indy
RUN echo 'indy:indypasswd' | chpasswd
RUN mkdir /app
RUN chown -R indy /app
USER indy
WORKDIR /app
```

可以看到这个镜像是基于 `ubuntu:bionic` ，那么我们就可以在 Ubuntu Os 镜像的基础上安装配置 Java 环境，集成已有的 SpringBoot-Runner，那么，我们就需要先分析 springboot-runner 的实现。

## 解析 `wattazoum/springboot-runner`

Github 地址：[https://github.com/wattazoum/docker-springboot-runner](https://github.com/wattazoum/docker-springboot-runner)

可以看到，核心文件就是一个 Dockerfile 和一个脚本文件 `entrypoint.sh`

```dockerfile
FROM openjdk:8u121-jre-alpine
MAINTAINER Oumar Aziz OUATTARA (wattazoum)

RUN apk update && apk add fontconfig ttf-dejavu

RUN adduser -S -u 1000 springboot && \
    mkdir -p /app && \
    chown -R springboot /app

ADD entrypoint.sh /usr/local/bin/

USER springboot

WORKDIR /app

VOLUME /app
EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
```

```shell
#!/bin/sh
set -e

# In case the user wants only to use java with options
if [ $# -gt 0 ]
then
    exec java $@
    exit 0
fi

# Behavior when using the /app folder
#
# In the setenv.sh file you may define the following environment
# variables
#
# JAVA_OPTS : a string containing the list of java options to 
#             pass to the java command.
#             eg. JAVA_OPTS="-Xmx1g -Dfile.encoding=utf8"
# APP_ARGS

SETENV_FILE=/app/setenv.sh

if [ -r $SETENV_FILE ]
then
    source $SETENV_FILE
fi


TMP_JARS_LIST=/tmp/jars_list 

find /app -maxdepth 1 -regex '.*.[jw]ar$' > $TMP_JARS_LIST
nb_jars=$(cat $TMP_JARS_LIST | wc -l)
if [ $nb_jars -gt 1 ]
then
    echo 'ERROR: You may only have one jar/war in the /app folder'
    echo '==================================================='
    cat $TMP_JARS_LIST
    exit 1
elif [ $nb_jars -eq 0 ]
then
    echo 'ERROR: There should be one and only one jar/war in the /app folder'
    echo '=============================================================='
    exit 1
else 
    CMD="java $JAVA_OPTS -jar $(cat $TMP_JARS_LIST) $APP_ARGS"
    echo "Launching the following command:"
    echo "  |"
    echo '  `->  '"$CMD"
    echo 
    exec $CMD
fi

exit 0
```

- 通过 source 命令，写入配置文件的内容到环境变量
- 判断 /app 目录下 jar 包的数量
  - 多于 1 个，报错
  - 少于 1 个，报错
- 执行 `java -jar` 命令

核心就是 Java 环境和 `java -jar` CMD

## 集成 springboot-runner 和 indy-sdk

基于 Ubuntu 镜像，安装 indy-sdk、安装 Jdk 、执行 `java -jar` CMD  

目录结构：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/159222/1619404778512-3eaf24c7-3526-4051-bc23-ce4c9543bbe2.png#clientId=u2bb91da8-87d2-4&from=paste&height=101&id=u6904e306&margin=%5Bobject%20Object%5D&name=image.png&originHeight=201&originWidth=769&originalType=binary&size=28226&status=done&style=none&taskId=u867e1922-cf17-44c9-91bf-d1e08fa4272&width=384.5)
/app-docker

- /app
- docker-compose.yml
- Dockerfile
- entrypoint.sh

`entrypoint.sh` 脚本文件复制上面 runner 的即可；

Dockerfile 配置：

```dockerfile
FROM ubuntu:bionic
MAINTAINER dongzhang@gaoshan.co
RUN apt-get update
RUN apt-get install -y gnupg2 software-properties-common
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys CE7709D068DB5E88 \
 && add-apt-repository "deb https://repo.sovrin.org/sdk/deb bionic stable" \
 && apt-get update \
 && apt-get install -y libindy

RUN apt-get install -y openjdk-8-jdk \
 && java -version

RUN adduser indy \
 && echo 'indy:indypasswd' | chpasswd \
 && mkdir /app \
 && chown -R indy /app

ADD entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/entrypoint.sh

USER indy

WORKDIR /app

VOLUME /app
EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

```

docker-compose.yml 配置参考：

```yaml
version: '3'
services:
  cert-app-center:
    build:
      context: .
      dockerfile: Dockerfile
    image: wattazoum/springboot-runner-local
    container_name: cert-app-center
  #  restart: always
    tty: true
    stdin_open: true
    ports:
      - 8084:8084
    volumes:
      - ./cert-app-center/logs:/mnt/logs
      - ./cert-app-center:/app
      - /etc/localtime:/etc/localtime
    environment:
      - 'TZ="Asia/Shanghai"'
    networks:
      - default
networks:
  default:
    external:
      name: cert_default

```

## 遇到的问题

### permission denied: unknown

OCI runtime create failed: container_linux.go:370: starting container process caused: exec: "/usr/local/bin/entrypoint.sh": permission denied: unknown

解决方案：
    Dockerfile 增加 `RUN chmod +x /usr/local/bin/entrypoint.sh`

### source: not found

解决方案：
    修改 entrypoint.sh 文件头 #!/bin  

> 例如，我装java，解压之后配置环境变量，因为用的是Docker ubuntu自带的终端执行的命令，所以修改的是~/.bashrc文件，修改完了之后要用source命令生效：
> Source ~/.bashrc：报：/bin/sh: 28: source: not found
> 查了下，说是sh 和 bash 是不同的 shell，sh 中没有 source 命令，解决的方法是：
> /bin/bash -c "source 要执行的原内容”
> 若是要执行shell脚本中的该命令，则在 shell 脚本的第一行加上一行 "#!/bin/bash" 即可。这一行指定了shell 脚本解释器的路径，而且这个指定路径 只能放在文件的第一行。

### 启动报错，无法连接 nacos mysql 等其他容器

解决方案：
    修改了 docker-compose.yml ，增加 networks 相关的配置

原因尚不清楚，还有很多需要学习的；
