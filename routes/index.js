const express = require('express')
const router = express.Router();
const wikiRouter = require('./wiki');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.use('/wiki', wikiRouter);

router.get('/', function(req, res){
    res.send('Hi!');
})

module.exports = router;