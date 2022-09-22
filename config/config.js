const { REDIS_CONF } = require('./db_config'),
      { isPrd } = require('./env_config');

module.exports = {
  qiniu: {
    keys: {
      ak: 'SWTeyxvCuYNjodNOjy9aCAWlc08_SSMNvWKIADHm',
      sk: 'j1eS5b_U-akfcKiv2yyUNM5CuBPCzvYrOcagCrTs'
    },
    bucket: {
      img: {
        bucket_name: 'js-image',
        domain: 'http://jsimage.jsplusplus.xyz'
      }
    },
  },
  crawler: {
    url: {
      main: 'https://msiwei.ke.qq.com/?tuin=304a784b#tab=0&category=-1',
      course: 'https://msiwei.ke.qq.com/?tuin=304a784b#tab=1&category=-1',
      teacher: 'https://msiwei.ke.qq.com/?tuin=304a784b#tab=2&category=-1',
      aboutus: 'https://msiwei.ke.qq.com/?tuin=304a784b#tab=3&category=-1'
    }
  },
  sessionInfo: {
    keys: ['$t*YSK^RUFLB%ZPg'],
    name: 'class.sid',
    prefix: 'class.sess'
  },
  cookieInfo: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  redisInfo: {
    all: `${REDIS_CONF[1]}:${REDIS_CONF[0]}`
  },
  adminAccount: {
   username: 'admin',
   password: 'admin' 
  },
  cryptoSecret: 'D%TYE&*#0205asdwi90a^^&*^*d111',
  corsOrigin: isPrd ? 'http://admin.jsplusplus.xyz' : 'http://localhost:3001'
}