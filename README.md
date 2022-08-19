# typora-image-qiniu-tinypng

> 自定义 typora 上传图片脚本，使用 nodejs 开发。

使用 tinypng 压缩图片后，上传到七牛云对象存储。

- tinypng：https://tinypng.com/developers/reference/nodejs
- 七牛云：https://developer.qiniu.com/kodo/1289/nodejs

## 前期准备

1. 准备已备案的的域名
2. 申请七牛云对象存储
3. 注册 tinypng 开发者账号
4. 电脑已安装 node 环境

## 如何使用？

1. clone 此项目

```shell
git clone https://github.com/junbin123/typora-image-qiniu-tinypng.git
```

2. cd 到此项目，安装依赖

```shell
cd typora-image-qiniu-tinypng
yarn
```

3. 配置 config.js 的相关参数

```shell
# 执行下面命令后，可以看到生成 config.js 文件，按要求配置
node index.js
```
