const morgan = require('morgan');
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const app = express();
const router = require('./routes');
const models = require('./models');


var env = nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/', router);

app.use(express.static('public'));

models.db.sync()
    .then(function () {
        console.log('db synced')
    }).then(function () {
        app.listen(3000, function () {
            console.log('listening on port 3000')
        })
    })
    .catch(function (err) {
        console.log('ERR', err)
    })
