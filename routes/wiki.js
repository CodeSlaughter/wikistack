const express = require('express')
const router = express.Router();
const models = require('../models');
const User = models.User;
const Page = models.Page;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', function(req, res){
    res.redirect('/');
});

router.get('/add', function(req, res){
    res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next){
    var urlTitle = req.params.urlTitle;
    Page.findOne({
        where : {
            urlTitle : urlTitle
        }
    }).then(function(page){

        res.render('wikipage', { page: page });
    })
    .catch(next);
    
});

router.post('/', urlencodedParser, function(req, res){
    var page = Page.build({
        title: req.body.title,
        content: req.body.content
      });
      page.save()
      .then(res.redirect('/'))
      .catch(console.error); 
});


module.exports = router;