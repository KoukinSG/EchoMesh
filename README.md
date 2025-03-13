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

