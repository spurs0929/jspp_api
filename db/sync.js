const seq = require('./connections/mysql_connect');

require('./models');

seq.authenticate().then(() => {
  console.log('MySQL server is connected completely.');
}).catch((error) => {
  console.log('MySQL server is failed to be connected. Error information is below: ' + error);
});

seq.sync({
  // force: true
}).then(() => {
  console.log('success')
  process.exit();
})