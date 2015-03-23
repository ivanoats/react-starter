//use webpack require API to find the files automatically
var context = require.context('.', true, /-spec\.js$/);
context.keys().forEach(context);
