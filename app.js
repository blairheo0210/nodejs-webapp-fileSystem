//Express 를 이용한 간단한 웹앱 만들기
var express = require('express');
var app = express();
app.listen(3000, function(){
  console.log('Connected 3000 port');
});
app.locals.pretty = true; //코드를 보기 좋게

// jade '템플릿 엔진' 사용
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', function(req, res){
  res.send('Welcome Homepage');
});

//시멘틱 url
app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id +','+ req.params.mode);
});
//query 객체의 사용법
app.get('/topic', function(req, res){
  var topics = [
    'J is...',
    'N is...',
    'E is...'
  ];
  var output = `
    <a href="/topic?id=0">J</a><br>
    <a href="/topic?id=1">N</a><br>
    <a href="/topic?id=2">E</a><br>
    ${topics[req.query.id]}
  `
  res.send(output);
});

//Jade 문법
app.get('/template', function(req, res){
  res.render('temp', {timeVal : Date()});//변수 전달
});

//Express 웹페이지를 표현하는 법
//(동적 파일을 서버 재시작 필요)
app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0; i<5; i++){
    lis += '<li>coding</li>'
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello Dynamic!
      ${lis}
      ${time}
    </body>
  </html>
  `;
  res.send(output);
});

//Express 정적 파일을 서비스 하는 법
app.get('/route', function(req, res){
  res.send('Hello Router, <img src="/sample.png">');
});
app.get('/login', function(req, res){
  res.send('<h1>login plz</h1>');
});
