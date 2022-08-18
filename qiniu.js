const qiniu = require('qiniu')
const config = require('./config.js')

const uploadToken = getUploadToken()
const putExtra = new qiniu.form_up.PutExtra();
const qiniuConfig = new qiniu.conf.Config();
qiniuConfig.zone = qiniu.zone[config.qiniu.zone];
const formUploader = new qiniu.form_up.FormUploader(qiniuConfig);

module.exports = upload


function upload({ key, localFile }) {
  const p = new Promise((resolve, reject) => {
    // 文件上传
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
      if (respErr) {
        reject()
      } else if (respInfo.statusCode == 200) {
        resolve(respBody)
      } else {
        reject()
      }
    });

  })
  return p
}

function getUploadToken() {
  const { accessKey, secretKey } = config.qiniu
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const putPolicy = new qiniu.rs.PutPolicy(config.qiniu.options);
  const uploadToken = putPolicy.uploadToken(mac);
  return uploadToken
}