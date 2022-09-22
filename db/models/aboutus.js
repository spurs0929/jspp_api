const seq = require('../connections/mysql_connect'),
      { STRING, TEXT, INT } = require('../../config/db_type_config');

const Aboutus = seq.define('aboutus', {
	aid: {
    comment: 'Aboutus ID',
    type: INT,
    allowNull: false,
    unique: true
	},
  posterUrl: {
  	comment: 'Poster',
  	type: STRING,
  	allowNull: false
  },
  title: {
  	comment: 'Title',
  	type: STRING,
  	allowNull: false
  },
  name: {
  	comment: 'Name',
  	type: STRING,
  	allowNull: false
  },
  intro: {
  	comment: 'Introduction',
  	type: TEXT,
  	allowNull: false
  },
  posterKey: {
  	comment: 'Qiniu poster image name',
  	type: STRING,
  	allowNull: false
  }
});

module.exports = Aboutus;