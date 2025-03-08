# [EchoMesh](https://github.com/KoukinSG/EchoMesh)

为本地部署的AI模型提供有用户登录功能的前端界面，基于Vue3+Vite。

主要通过Api与本地AI框架进行交互，前端只控制用户登录验证与界面展示。后续可能在前端中嵌入OCR、语音转文字等插件。

由于没有开发配套的后端用户管理系统，用户名和密码暂时以Json格式保存在本地服务端。





## 如何将代码保存到本地仓库和远程仓库

**Step 1**：打开终端或命令行工具。在项目文件夹下，使用命令”git init”初始化本地仓库。

**Step 2**：使用命令”git add .” 将所有修改过的代码文件添加到暂存区。

```git
git add
```

**保存在本地**：使用命令”git commit -m ‘提交信息'” 将暂存区的文件提交到本地仓库。提交信息是对本次提交的简要描述，可以自定义。

```
git commit -m ‘提交信息'
```

**关联本地仓库与远程仓库：在终端或命令行中输入”git remote add origin 远程仓库地址” 来关联本地仓库与远程仓库

```
git remote add origin git@github.com:KoukinSG/EchoMesh.git
```

**将本地仓库推送至远程**：使用命令”git push -u origin 分支名称” 将本地仓库的代码推送到远程仓库。分支名称可以是主分支（通常是“main”）或自定义分支。



