var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');//nodejs가 제공하는 기본 모듈
var app = express();
app.listen(5000, function(){
  console.log('Connected 5000 port');
});
app.locals.pretty = true;

app.set('view engine', 'jade');
app.set('views', './views_file');
app.use(bodyParser.urlencoded({ extended:false }));

//5. 코드의 개선
app.get(['/topic', '/topic/:id'], function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }

    var id = req.params.id;
    if(id){
      //id값이 있을 때만 파일정보 읽음
      fs.readFile('data/'+id, 'utf8', function(err, data){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files, title:id, description:data});
      })
    } else {
      res.render('view', {topics:files, title:'Welcome', description:'hello'})
    }
  })
});

// //4. 본문 읽기
// app.get('/topic/:id', function(req, res){
//   var id = req.params.id;
//
//   fs.readdir('data', function(err, files){
//     if(err){
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     }
//     fs.readFile('data/'+id, 'utf8', function(err, data){
//       if(err){
//         console.log(err);
//         res.status(500).send('Internal Server Error');
//       }
//       res.render('view', {topics:files, title:id, description:data})
//     })
//   })
// });
//
// //3. 글 목록 만들기
// app.get('/topic', function(req, res){
//   fs.readdir('data', function(err, files){
//     if(err){
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     }
//     //files는 data 디렉토리 밑에서 읽어 온 파일명의 배열
//     res.render('view', {topics:files});
//   })
// });

//2. 본문 저장
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;

  fs.writeFile('data/'+title, description, function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    //리다이렉트
    res.redirect('/topic/'+title);
  })
});

//1. 라우팅
app.get('/topic/new', function(req, res){
  res.render('new');
});
