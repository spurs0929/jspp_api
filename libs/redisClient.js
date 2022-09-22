const red = require('../db/connections/redis_connect');

// Redis Set
function redisSet(key, value, timeout = 60 * 60){
  if(typeof value === 'object'){
    value = JSON.stringify(value);
  }

  red.set(key, value);
  red.expire(key, timeout);
}

// Redis Get
function redisGet(key){
  return new Promise((resolve, reject) => {
    red.get(key, (error, value) => {
      if(error){
        reject(error);
        return;
      }

      if(value == null){
        resolve(null);
        return;
      }

      try{
        resolve(JSON.parse(value));
      }catch(e){
        resolve(value);
      }
    })
  });
}

module.exports = {
  redisSet,
  redisGet
}
