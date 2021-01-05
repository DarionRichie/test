var express = require('express');
var router = express.Router();
var axios = require("axios");
/* GET users listing. */
router.get('/', function(req, res, next) {
	let Rapid
	let Fast
	let Standard
	let Slow
	let gasNow = {
	}
		
	let station = {
	}
	axios.get('https://gasnow.sparkpool.com/api/v3/gas/price?utm_source=help').then((ress)=>{
		 console.log(ress.data.data);	
		
		gasNow.Rapid = ress.data.data.rapid;
		gasNow.Fast = ress.data.data.fast;
		gasNow.Standard = ress.data.data.standard;
		gasNow.Slow = ress.data.data.slow;
		res.json(gasNow);
		// axios.get('https://ethgasstation.info/api/ethgasAPI.json?api-key=182ad00dca1f4145b3d8c6e6de8c8c0f3b6f7d3d69a3156916fdabe4f4bc').then((re)=>{
		// 	// console.log(re.data)
		// 	station.Rapid = ress.data.fastest;
		// 	station.Fast = ress.data.fast;
		// 	station.Standard = ress.data.average;
		// 	station.Slow = ress.data.safeLow;
		// 	console.log(station.Slow)
		// 	res.json({
		// 		"Rapid":(parseInt(station.Rapid*10**8)+parseInt(gasNow.Rapid)/2),
		// 		"Fast":(parseInt(station.Fast*10**8)+parseInt(gasNow.Fast)/2),
		// 		"Standard":(parseInt(station.Standard*10**8)+parseInt(gasNow.Standard)/2),
		// 		"Slow":(parseInt(station.Slow*10**8)+parseInt(gasNow.Slow)/2)
		// 	});
		// })
	})
  
});

module.exports = router;
