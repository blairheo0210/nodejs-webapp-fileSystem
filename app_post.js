var express = require('express');
var bodyParser = require('body-parser');//미들웨어

var app = express();
app.listen(4000, function(){
  console.log('Connected 4000 port');
});
app.locals.pretty = true;

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:false }));

//form을 이용한 정보의 전달
app.get('/form', function(req, res){
  res.render('form');
});

//get 방식으로 요청한 데이터 서버에서 받기
app.get('/form_receiver', function(req, res){
  var title = req.query.title;
  var description = req.query.description;
  res.send(title+', '+description);
});

//post 방식으로 요청한 데이터 서버에서 받기, bodyparser 필요
app.post('/form_receiver', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+', '+description);
});
