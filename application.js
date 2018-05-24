var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var boxesRoutes = require('./routes/boxes');
var userRoutes = require('./routes/user');
var ideeRoutes = require('./routes/idee');
var scalettaRoutes = require('./routes/scaletta');
var postloginRoutes = require('./routes/postlogin');
var progettoRoutes = require('./routes/progetto');

var Page = require('./models/page');
var Word = require('./models/word');

var app = express();
//mongoose.connect('dea-lab-user:pwd-dea-lab@ds161793.mlab.com:61793/dea-lab');
//mongoose.connect('localhost:27017/bibblo');
//mongoose.connect('localhost:27017/testYOUTube');
//mongoose.connect('localhost:27017/SpaggiariPage');

mongoose.connect('localhost:27017/SpaggiariPage');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/home', postloginRoutes);
app.use('/boxes', boxesRoutes);
app.use('/user', userRoutes);
app.use('/idee', ideeRoutes);
app.use('/scaletta', scalettaRoutes);
app.use('/dettaglio', postloginRoutes);
app.use('/infoprogetto', progettoRoutes);

app.get('/word/:id', (req, res) => {
    console.log('Salvataggio word')
    Page.find({
        $text: {
            $search: req.params.id,
            // $language: <string>,
            // $caseSensitive: <boolean>,
            // $diacriticSensitive: <boolean>
        }
    }, {
        body: 0
    }).then((words) => {
        var wordsave = words;

        wordsave.forEach((word) => {
            var word = new Word({
                // Inserire tutto
                titolo: word.titolo,
                path: word.path,
                meta1: word.meta1,
                meta2: word.meta2,
                meta3: word.meta3,
                images: word.images,
                type: word.type,
                licenza: word.licenza,
                scuola: word.scuola,
                lingua: word.lingua,
                materia: word.materia,
                word: req.params.id
                    //_creator: req.user._id
            });

            // word.save().then((doc) => {
            //     res.send(doc);
            // }, (e) => {
            //     res.status(400).send(e);
            // });
            word.save(function(err, result) {

                if (err) throw err;
                else {
                    //res.send(result);
                    console.log('Salvataggio word da ricerca full text', result);
                }
            })
        })

        //var body = _.pick(req.body, ['email', 'password']);

    }, (e) => {
        res.status(400).send(e);
    });

});

app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    return res.render('index');
});




module.exports = app;