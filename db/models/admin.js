const seq = require('../connections/mysql_connect'),
      { STRING } = require('../../config/db_type_config');

const Admin = seq.define('admin', {
  username: {
    comment: 'Admin user name',
    type: STRING,
    allowNull: false
  },
  password: {
    comment: 'crypto user name',
    type: STRING,
    allowNull: false
  }
});

module.exports = Admin;