const cp = require('child_process'),
      { resolve } = require('path'),
      { nanoid } = require('nanoid'),
      Qiniu = require('qiniu'),
      { qiniu, cryptoSecret } = require('../config/config'),
      crypto = require('crypto');

function startProcess(options){
  const script = resolve(__dirname, '../crawlers/', options.file),
        child = cp.fork(script, []);

  let invoked = false;
  
  // 子進程接收消息
  child.on('message', (data) => {
    options.message(data);
  });
  
  // 子進程結束
  child.on('exit', (code) => {
    if(invoked){
      return;
    }

    invoked = true;
    options.exit(code);
  });

  // 子進程報錯
  child.on('error', (err) => {
    if(invoked){
      return;
    }

    invoked = true;
    options.error(err);
  });
}

// upload qiniu
function qiniuUpload(options){
  const mac = new Qiniu.auth.digest.Mac(qiniu.keys.ak, qiniu.keys.sk),
        conf = new Qiniu.conf.Config(),
        client = new Qiniu.rs.BucketManager(mac, conf),
        key = nanoid() + options.ext;
     
  return new Promise((resolve, reject) => {
    client.fetch(options.url, options.bucket, key, (err, ret, info)=>{
      if(err){
        reject(err);
      }else{
        if(info.statusCode === 200){
          resolve({ key });
        }else{
          reject(info);
        }
      }
    });
  });            
}

function makeCrypto(str){
  const _md5 = crypto.createHash('md5'),
        content = `str=${str}&secret=${cryptoSecret}`;
   
  return _md5.update(content).digest('hex');      
}

function returnInfo(errorInfo, data){
  if(data){
    errorInfo.data = data;
  }

  return errorInfo;
}

function trimSpace(str){
  return str.replace(/\s+/g, '');
}

module.exports = {
  startProcess,
  qiniuUpload,
  makeCrypto,
  returnInfo,
  trimSpace
}      