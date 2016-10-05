var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(function(req, res, next){
  console.log('Got a request');
  next();
})

app.use(bodyParser.urlencoded({extended: true}));

app.post('/',function (req, res){
  console.log('req.body=', req.body);
  res.sendStatus(200);
})


app.get('/', function (req, res) {
  console.log('Received a request at', new Date() + '');
  //__dirname corresponds to express_intro
  var file = path.join(__dirname, 'public/views/index.html');
  console.log('file', file);
  res.sendFile(file);
});

app.get('/kittens', function(req, res) {
  console.log('Query params', req.query);
  if(req.query.age > 2) {
    res.send('MEOW!');
  } else {
  res.send('meow');
  }
});

var songs = [];
//steps 1-3
app.post('/songs', function (req, res) {
  console.log('req.body:', req.body);
//loops through the array if there is anything in it
if (songs.length>0){
  console.log("greater than 0");
for(var i=0;i<songs.length;i++){
//if both the song and title are already at and array index it will send error status
  if (req.body.title === songs[i].title && req.body.artist === songs[i].artist){
    console.log("You have already submitted that song!");
    res.sendStatus(404);
  }//ends if
}//ends for
}
//otherwise if the title or artist are empty it will send an error status
 if (req.body.title === '' || req.body.artist === ''){
    console.log("Please fill out the form.");
    res.sendStatus(400);
  } else {
//otherwise it will add a new date to the request body
    req.body.date = new Date() + '';
    console.log("date", req.body.date);
    //and push it to the songs array
    songs.push(req.body);
  }



  //add dateAdded
  console.log('songs', songs);
  res.sendStatus(200);
});

app.get('/songs', function (req, res){
  res.send(songs);
});

//middleware for serving static files
app.use(express.static('public'));

app.listen(3000);
