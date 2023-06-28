var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');

const {formatDate} = require('../modules/formatDate')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Find a trip by Departure and Arrival
router.get('/:departure/:arrival/:date', (req,res) => {
  const departure = req.params.departure;
  const arrival = req.params.arrival;
  const date = formatDate(req.params.date);
  Trip.find({departure:{$regex: new RegExp(departure, "i")}, arrival:{$regex: new RegExp(arrival, "i")}, date:{$gte:date.dateStart, $lte:date.dateEnd}})
  .then(data => {
      if(data[0]) {
      res.json({result : true, trip: data});
    } else{
      res.json({result: false})
    }
    }
    )
})
//Find a trip by Date
router.get('/byDate/:date', (req,res) => {
  const date = formatDate(req.params.date)
  Trip.find({date:{$gte:date.dateStart, $lte:date.dateEnd}})
  .then(data => {
    if(data[0]) {
      res.json({result: true, trip:data});
    } else{
      res.json({result:false})
    }
  })
})

module.exports = router;
