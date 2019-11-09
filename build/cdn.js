const {
  uploadToCdn,
  cdnConfig,
  prod
} = require('../config');

if (!uploadToCdn || (uploadToCdn && !cdnConfig)) {
  return;
}

const path = require('path');
const fs = require('fs');
const fileList = [];

function readAllFilePath(dir, baseDir = '') {
  if (!fs.existsSync(dir)) {
    throw new Error(`${dir} is not exist.`);
  }
  const files = fs.readdirSync(path.resolve(dir));
  files.forEach(f => {
    const stat = fs.statSync(path.join(dir, f));
    if (stat.isFile() && !f.endsWith('.html')) {
      fileList.push([path.join(dir, f), baseDir + '/' + f]);
    }
    if (stat.isDirectory()) {
      readAllFilePath(path.join(dir, f), baseDir + '/' + f);
    }
  });
}

readAllFilePath(path.join(__dirname, '..', 'dist'));
const qiniu = require("qiniu");
const accessKey = 'QIPytRNK0T-cwaoI429Itnd9yKBXO-T25L-UtUBf';
const secretKey = 'ays-QtaDtKKpHCx-71LpzMWe7Hvkn_YYzDjNkiTq';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: 'lucaspic',
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;
const formUploader = new qiniu.form_up.FormUploader(config);

//构造上传函数
function uploadFile(uptoken, key, localFile) {
  const putExtra = new qiniu.form_up.PutExtra();
  formUploader.putFile(uptoken, key, localFile, putExtra, function (err) {
    if (!err) {
      // 上传成功， 处理返回值
      console.log(key, '上传成功');
    } else {
      // 上传失败， 处理返回代码
      console.log(err);
      console.log(key, '上传失败');
    }
  });
}

fileList.forEach(f => {
  //生成上传 Token
  let key = prod.publicPath + f[1];
  key = key.replace(/^([\/\\]+)/g, '');
  uploadFile(uploadToken, key.replace(/([\/\\]+)/g, '/'), f[0]);
});