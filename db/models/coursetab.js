const seq = require('../connections/mysql_connect'),
      { STRING, BIGINT } = require('../../config/db_type_config');

const CourseTab = seq.define('course_tab', {
  cid: {
  	comment: 'Course category ID',
  	type: BIGINT,
  	allowNull: false,
  	unique: true
  },
  title: {
  	comment: 'Course tab item title text',
  	type: STRING,
  	allowNull: false
  }
});

module.exports = CourseTab;