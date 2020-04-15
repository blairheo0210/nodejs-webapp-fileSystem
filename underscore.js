// npm을 이용해서 다른 사람이 만든 모듈을 사용하는 방법
var _ = require('underscore');
var arr = [3,6,9,1,12];
console.log(arr[0]);
console.log(_.first(arr));
console.log(arr[arr.length-1]);
console.log(_.last(arr));
