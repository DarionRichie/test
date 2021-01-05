var express = require('express');
var router = express.Router();
var web3 = require('web3');
var axios = require("axios");

let infuraAPI = 'https://mainnet.infura.io/v3/563d3f2ded2b4f3198fedc4c48566923'; //API infura
let data = {
	"jsonrpc": "2.0",
	"method": "eth_getBlockByNumber",
	"params": ["0x5BAD55", false],
	"id": 1
} //全局data
let header = {
	'Content-Type': 'application/json'
} //全局header
//使用web3js进行请求 --- axios对请求进行封装 --连接数据库进行插入 使用异步方法
/* GET home page. */
router.get('/', function(req, res, next) {

	getTransactionList().then((resolve_list) => {
		console.log(resolve_list);
		getTransationInfo(resolve_list[0]).then((result) => {
			console.log(result);
		})
	});

	//本地开一个服务器进行每一次交易的插入 一个区块的差异的插入 最好使用 异步，更快
	res.render('index', {
		title: 'Express'
	});
});
//封装一下作为一个函数进行resolve 或者使用await

function getTransactionList(number) {
	return new Promise((resolve, reject) => {
		try {
			axios.post(infuraAPI, data, header = header).then((response) => {
				resolve(response.data.result.transactions);
			})
		} catch {
			reject('error');
		}
	})
}

async function waitList(){
	list = await getTransactionList();
	console.log(list);
}
//写成同步 看是否需要
function getTransationInfo(hash) { //使用方法为给定对应的交易的hash进行查询price
	let data = {
		"jsonrpc": "2.0",
		"method": "eth_getTransactionByHash",
		"params": [hash],
		"id": 1
	}
	return new Promise((resolve, reject) => {
		try {
			axios.post(infuraAPI, data, header = header).then((response) => {
				resolve(response.data.result.gasprice);
			})
		} catch {
			reject('error');
		}
	})
}
router.get('/name', function(req, res, next) {

	waitList();
	res.json({
		"A": 221244444222
	});
})

module.exports = router;
