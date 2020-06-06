var express = require('express');
var app = express();
const port = 3000;
const Twitter = require('./api/helpers/twitter.js');
const twitter = new Twitter();
require('dotenv').config()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})

app.get('/tweets', function (req, res) {
  const query = req.query.q;
  const count = req.query.count;
  const maxId = req.query.max_id;
  twitter.get(query, count, maxId).then((response) => {
    res.status(200).send(response.data);
  }).catch((error) => {
    res.send(400).send(error);
  })

});


app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});