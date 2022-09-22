const { isPrd } = require('./env_config');
module.exports = {
  MYSQL_CONF: {
    base: {
      hose: 'localhost',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 1000
      }
    },
    conf: ['class', 'root', isPrd ? 'xxx' : '12345678']
  },
  REDIS_CONF: ['6379', '127.0.0.1']
}