# [EchoMesh](https://github.com/KoukinSG/EchoMesh)


为本地部署的AI模型提供有用户登录功能的前端界面，基于Vue3+Vite。

主要通过Api与本地AI框架进行交互，前端只控制用户登录验证与界面展示。后续可能在前端中嵌入OCR、语音转文字等插件。

由于没有开发配套的后端用户管理系统，用户名和密码暂时以Json格式保存在本地服务端。





## 如何在本地部署

在终端中运行以下命令

**1、本地部署**

安装环境

```
npm install
```

运行部署命令

```
npm run dev
```

**2、本地部署（局域网）**

安装环境的命令与上面一样，部署命令需要加’-- --host‘。

```
npm run dev -- --host
```



命令运行成功后，根据终端返回的提示访问网页，如：

> Local:   https://localhost:3000/
>
> Network: https://192.168.0.5:3000/

如果需要修改端口号，可以在vite.config.js中修改：

```
server: {
        port: 3000 ##此处修改端口号
    }
```





## 如何在Nginx上部署

### 打包代码文件，以及安装Nginx

首先，在vue项目根目录下使用命令打包当前项目。

```
npm run build
```

如果打包成功，项目中会出现一个dist文件。
然后安装Nginx，相关步骤请自行Bing/Google，WIN / LINUX / MAC系统各有不同。

如下上Nginx安装成功后，可能用到的一些路径（MAC）。

|            说明             |                  路径                  |
| :-------------------------: | :------------------------------------: |
| nginx配置路径（conf等文件） |   /opt/homebrew/etc/nginx/nginx.conf   |
| nginx上面部署的项目放包地址 | /opt/homebrew/Cellar/nginx/1.27.4/html |
|        nginx中的日志        |      /opt/homebrew/var/log/nginx       |
|   nginx中访问默认首页地址   |        /opt/homebrew/etc/nginx         |
|          安装路径           |   /opt/homebrew/Cellar/nginx/1.27.4    |

或者使用命令查看Nginx下所有文件夹路径

```
nginx -V

or

brew info nginx
```

**Mac启动Nginx**

```
nginx
```

如果要指定启动的nginx.conf文件

```
nginx -c /根路径
```

Mac停止Nginx

```
nginx -s stop
```

Mac重启Nginx

```
nginx -s reload
```

### 定义配置文件

Mac修改Nginx配置文件路径，具体如何修改暂时请百度了解。

```
vim /opt/homebrew/etc/nginx/nginx.conf
```

[自动生成配置的网站](https://www.digitalocean.com/community/tools/nginx?domains.0.php.php=false&domains.0.routing.index=index.html&domains.0.routing.fallbackHtml=true&global.app.lang=zhCN)

<font size=4.5>**配置时，重点注意一下几点**</font>

- 确保Nginx对应的nginx.conf文件中，root路径是否为绝对路径。
- 确保在配置中加入重定向跳转，否则刷新后会报404。在server/location中加入“try_files $uri $uri/ /index.html;”。
- **如果需要局域网部署**，把server_name设置为本机IP。
- **如果需要使用https**，先下载OpenSSL，*待续*。

启动Nginx后，如果终端不出现报错，则部署成功，访问http://localhost:8080 即可进入网页。



