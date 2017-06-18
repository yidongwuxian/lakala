const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const fs = require('fs');
const morgan     = require("morgan");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, '/dist/')));
app.use(express.static(path.join(__dirname, '/dist/static')));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","POST,GET");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

router.all('/', function(req, res, next) {
	res.sendfile("/dist/index.html");
});

app.listen(3303, () => {
    console.log('app listening on port 3303.');
})
