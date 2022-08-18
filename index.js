

/**
 * typora 自定义上传图片脚本
 * http://notes.jiabanmoyu.com/%E6%9D%82%E8%AE%B0/Typora%E9%85%8D%E7%BD%AE%E5%9B%BE%E7%89%87%E4%B8%8A%E4%BC%A0
 * 使用：
 * 1. 选择 custom command
 * 2. 命令输入：  node /Users/junbin/Desktop/qiniu-upload/typora.js -file
 * /usr/local/n/versions/node/16.16.0/bin/node /Users/wujunbin/me/SideProject/qiniu-upload/typora.js -file
 */
const program = require('commander');
const uploadQiniu = require('./qiniu.js')
const tinify = require("tinify");
const config = require("./config.js")
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


// 测试压缩
// compressImg('/Applications/Typora.app/Contents/Resources/TypeMark/assets/icon/icon_512x512.png').then(res => {
//   console.log(res);
// })
// compressImg('https://static.jindll.com/notes/2020050702.png').then(res => {
//   console.log(res);
// })






