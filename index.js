

/**
 * typora 自定义上传图片脚本
 * http://notes.jiabanmoyu.com/%E6%9D%82%E8%AE%B0/Typora%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87%E4%B8%8A%E4%BC%A0
 * 使用：
 * 1. 选择 custom command
 * 2. 命令输入：  node /Users/junbin/Desktop/qiniu-upload/typora.js -file
 * /usr/local/n/versions/node/16.16.0/bin/node /Users/wujunbin/me/SideProject/qiniu-upload/typora.js -file
 */


const config = getConfig()
const program = require('commander');
const uploadQiniu = require('./qiniu.js')
const tinify = require("tinify");
const fs = require('fs')
tinify.key = config.tinypng.apikey
program.option('-file, --LocalFile <LocalFile>', '要上传的本地文件');
program.parse(process.argv);




upload();



async function upload() {
  const { LocalFile } = program.opts();

  if (new RegExp(`^${config.qiniu.imageUrl}`).test(LocalFile)) {
    console.log(LocalFile);
  }

  const { compressPath, fileName } = await compressImg(LocalFile)
  const qiniuImg = await uploadQiniu({ key: fileName, localFile: compressPath })
  const qiniuUrl = `${config.qiniu.imageUrl}/${qiniuImg.key}`
  console.log(qiniuUrl);
  require('fs').unlinkSync(compressPath)
}


/**
 * tinypng图片压缩
 * @param {string} localPath 本地图片路径或远程图片链接
 * @returns {Object} res
 * @returns {string} res.compressPath 压缩后的本地图片路径
 * @returns {string} res.fileName 文件名称
 */
async function compressImg(localPath) {
  let source = null
  if (/^(https:\/\/|http:\/\/)/.test(localPath)) {
    source = tinify.fromUrl(localPath)
  } else {
    source = tinify.fromFile(localPath)
  }

  let fileName = localPath.split(/[\/|\\]/);
  fileName = `qiniu-${new Date().getTime()}-${fileName[fileName.length - 1]}`

  const compressPath = `${__dirname}/${fileName}` // 压缩后保存的本地路径
  await source.toFile(compressPath)
  return { compressPath, fileName }
}




// 获取configj.js配置，没有则创建
function getConfig() {
  const path = './config.js'
  try {
    //   const a = require('fs').existsSync(`${__dirname}/config.js`)
    //   console.log({ a });
    // } catch (err) {
    //   console.log(12);
    // }
    if (require('fs').existsSync(`${__dirname}/config.js`)) {
      return require(path)
    } else {
      const configStr = `
  module.exports = {
    "tinypng": {  // tinypng配置信息 https://tinypng.com/developers/reference/nodejs
      "apikey": ""  // https://tinify.com/dashboard/api
    },
    "qiniu": { // 七牛云配置信息 https://developer.qiniu.com/kodo/1289/nodejs
      "options": {  // 
        "scope": ""  // 七牛云的空间名称
      },
      "accessKey": "",
      "secretKey": "",

      /**
       * zone和机房的对应关系
       * 机房	Zone对象
       * 华东	qiniu.zone.Zone_z0
       * 华北	qiniu.zone.Zone_z1
       * 华南	qiniu.zone.Zone_z2
       * 北美	qiniu.zone.Zone_na0
       */
      "zone": "Zone_z0", // 机房位置
      // 图片访问域名前缀，例如：图片文件 image.png，那么访问地址就是 https://example.com/image.png
      "imageUrl": "https://example.com"
    }
  }
        `
      fs.writeFileSync(path, configStr)
      console.log('请在config.js中配置密码')
      process.exit(0)
    }
  } catch (err) {
    console.log(err);
  }
}


// 测试压缩
// compressImg('/Applications/Typora.app/Contents/Resources/TypeMark/assets/icon/icon_512x512.png').then(res => {
//   console.log(res);
// })
// compressImg('https://static.jindll.com/notes/2020050702.png').then(res => {
//   console.log(res);
// })