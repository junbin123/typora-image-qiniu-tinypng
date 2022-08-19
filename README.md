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

4. 配置完成，先测试一下

```shell
node index.js -file ./test.jpg
```

打印了远程地址，说明成功了。

![image-20220819142623251](https://image.wujunbin.com/qiniu-1660890383738-image-20220819142623251.png)

5. 打开 typora 的偏好设置，_选择图像>上传服务>Custom Command_

```shell
# 输入以下命令 -file字段名表示传入的图片路径
node 此处填写你的本地路径/typora-image-qiniu-tinypng/index.js -file

# 如果你电脑安装了多个版本的node，例如我安装了n版本切换工具，那么命令就是
/usr/local/n/versions/node/16.16.0/bin/node xxx/typora-image-qiniu-tinypng/index.js -file
```

![image-20220819140356210](https://image.wujunbin.com/qiniu-1660889036746-image-20220819140356210.png)

点击**验证上传选项**按钮，结果打印远程地址，说明成功了。

_不知为啥标题是验证失败，但实际是成功的，不管了_

![image-20220819141348292](https://image.wujunbin.com/qiniu-1660889628469-image-20220819141348292.png)

6. 实际测试一下

   ![image-20220819143043617](https://image.wujunbin.com/qiniu-1660890643805-image-20220819143043617.png)
