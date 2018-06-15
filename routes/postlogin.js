var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');

// var Mappa = require('../models/mappa');
var Word = require('../models/word');

router.get('/:id', function(req, res, next) {
    // Mappa.find()
    // Word.find()

    // Word.find({ 'word': req.params.id },

    // Word.find({ "meta2.content": { "$regex": req.params.id, "$options": "i" } },
    // Word.find({ $text: { $search: req.params.id, $caseSensitive: false } },
    Word.find({ 'word': req.params.id },

            function(err, messages) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    })
                }
            })
        //.sort({ quality: -1 })

    //   .populate('user', 'firstName')

    .exec(function(err, messages) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        res.status(200).json({
            message: ' Success',
            obj: messages
        })
    });

});

// router.use('/', function(req, res, next) {
//     jwt.verify(req.query.token, 'secret', function(err, decoded) {
//         if (err) {
//             return res.status(401).json({
//                 title: 'Non autenticato',
//                 error: err
//             });
//         }
//         next();
//     })

// });


router.post('/', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);

    User.findById(decoded.user._id, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred su POST',
                error: err
            })
        }
        var word = new Word({
            word: req.body.word,
            titolo: req.body.titolo,
            path: req.body.path,
            meta1: req.body.meta1,
            meta2: req.body.meta2,
            meta3: req.body.meta3,
            images: req.body.images,
            user: user,
            type: req.body.type,
            licenza: req.body.licenza,
            scuola: req.body.scuola,
            controllato: req.body.controllato,
            quality: req.body.quality
        });

        word.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred su POST',
                    error: err
                })
            }
            user.word.push(result);
            user.save();
            res.status(201).json({
                message: 'Box salvato',
                obj: result
            })
        });
    });
});


router.patch('/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Word.findById(req.params.id, function(err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Word Found',
                error: { message: 'Word not FOUND' }
            });
        }
        /*  if (message.user != decoded.user._id) {
             return res.status(401).json({
                 title: 'Non autenticato',
                 error: { message: 'user do not match' }
             });
         } */
        message.word = req.body.word;
        message.titolo = req.body.titolo;
        message.path = req.body.path;
        message.meta1 = req.body.meta1;
        message.meta2 = req.body.meta2;
        message.meta3 = req.body.meta3;
        message.licenza = req.body.licenza;
        message.scuola = req.body.scuola;
        message.controllato = req.body.controllato;
        message.type = req.body.type;
        message.quality = req.body.quality;
        message.images = req.body.images;

        message.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Errore nell aggiornamento',
                    error: err
                })
            }
            res.status(200).json({
                message: 'Word Update',
                obj: result
            })
        });
    });
});

router.delete('/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);

    //Mappa.findById(req.params.id, function(err, message) {
    Word.findById(req.params.id, function(err, message) {

        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Box Found',
                error: { message: 'Box not FOUND' }
            });
        }
        /* if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Non autenticato',
                error: { message: 'user do not match' }
            }); 
        }*/
        message.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Errore nell aggiornamento',
                    error: err
                })
            }
            res.status(200).json({
                message: 'Box Delete',
                obj: result
            })
        });
    });
});

module.exports = router;