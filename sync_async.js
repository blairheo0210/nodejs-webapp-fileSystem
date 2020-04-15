var fs = require('fs');
//sync
console.log(1);
var data = fs.readFileSync('data.txt', {encoding:'utf8'});
console.log(data);

//async
console.log(2);
fs.readFile('data.txt', {encoding:'utf8'}, function(err, data2){
  console.log(3);
  console.log(data2);
});
//3보다 먼저 실행됨
console.log(4);
