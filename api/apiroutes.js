var express = require('express')
var apiRoutes = express.Router();

var cityRecord = require('./mockdata/cityRecord.json');
var orderList = require('./mockdata/orderList.json');
var flightList = require('./mockdata/flightList.json');

apiRoutes.get('/cityRecord', function (req, res) {
	res.json(cityRecord);
});
apiRoutes.get('/orderList', function (req, res) {
	res.json(orderList);
});
apiRoutes.get('/flightList', function (req, res) {
	res.json(flightList);
});
module.exports = apiRoutes;
