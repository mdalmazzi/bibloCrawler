var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const { ObjectID } = require('mongodb');

//var User = require('../models/user');

var Progetto = require('../models/progetto');
var Crawler = require('../models/crawler');

router.get('/', function(req, res, next) {

    Crawler.find({}, function(err, messages) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            })
        }
    })

    .populate({ path: 'progetti', populate: { path: 'sito' } })

    .exec(function(err, messages) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        res.status(200).json({
            message: 'Elenco crawlet letto con successo!!',
            obj: messages
        })
    });

});

// corretto escluso per aggiunta sito su progetto
// router.post('/:id', function(req, res, next) {

//     Todo.findById(req.params.id, function(err, todo) {
//         if (err) {
//             return res.status(500).json({
//                 title: 'An error occurred su POST',
//                 error: err
//             })
//         }
//         var progetto = new Progetto({
//             name: req.body.name,
//             sito: todo

//         });
//         progetto.save(function(err, result) {
//             if (err) {
//                 return res.status(500).json({
//                     title: 'An error occurred su POST',
//                     error: err
//                 })
//             }

//             res.status(201).json({
//                 message: 'Progetto salvato',
//                 obj: result
//             })
//         });
//     });
// });


// uso questo ma ritorno tutti i progetti da separare i due router progetto e sito

router.get('/:id', function(req, res, next) {
    // Progetto.find({ 'name': req.params.id },
    Progetto.find({},
        function(err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                })
            }
        })

    // .populate('sito', 'text')
    .populate('sito')

    .exec(function(err, messages) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        res.status(200).json({
            message: 'Progetto letto con successo',
            obj: messages
        })
    });

});

/// Aggiunta Sito a Progetto

router.post('/:id', /* authenticate, */ (req, res, next) => {
    var todo = new Todo({
        text: req.body.text,
        tipologia: req.body.tipologia,
        licenza: req.body.licenza,
        scuola: req.body.scuola,
        lingua: req.body.lingua,
        materia: req.body.materia,

    });

    todo.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred su POST',
                error: err
            })
        }

        //Aggiunta per aggiornare progetto
        Progetto.find({ 'name': req.params.id },
            function(err, progetto) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    })
                }

                // console.log('Fonte: ', result._id);
                // console.log('Progetto: ', progetto);
                progetto[0].sito.push(result._id);
                progetto[0].save();

                // });
            })

        //Aggiunta per aggiornare progetto

        res.status(201).json({
            message: 'Fonte salvata',
            obj: result
        })

    });
});

/// Aggiunta Sito a Progetto


/// Aggiunta Progetto


router.post('/', /* authenticate, */ (req, res, next) => {
    //Aggiunta per aggiornare crawler

    var crawler = new Crawler({
        name: req.body.name,
        progetti: req.body.progetti


    });
    crawler.save(function(err, progetto) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            })
        }
        res.status(201).json({
            message: 'Crawler salvato',
            obj: progetto
        })
    })

});


/// Aggiunta Progetto

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


// router.post('/', function(req, res, next) {
//     var decoded = jwt.decode(req.query.token);

//     User.findById(decoded.user._id, function(err, user) {
//         if (err) {
//             return res.status(500).json({
//                 title: 'An error occurred su POST',
//                 error: err
//             })
//         }
//         var word = new Word({
//             word: req.body.word,
//             titolo: req.body.titolo,
//             path: req.body.path,
//             meta1: req.body.meta1,
//             meta2: req.body.meta2,
//             meta3: req.body.meta2,
//             images: req.body.images,
//             user: user,
//             type: req.body.type,
//             licenza: req.body.licenza,
//             scuola: req.body.scuola,
//             controllato: req.body.controllato,
//             quality: req.body.quality
//         });

//         word.save(function(err, result) {
//             if (err) {
//                 return res.status(500).json({
//                     title: 'An error occurred su POST',
//                     error: err
//                 })
//             }
//             user.word.push(result);
//             user.save();
//             res.status(201).json({
//                 message: 'Box salvato',
//                 obj: result
//             })
//         });
//     });
// });


router.patch('/:id', function(req, res, next) {

    // Crawler.findById(req.params.id, function(err, message) {
    Crawler.find({ 'name': req.body.name }, function(err, message) {

        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Crawler Found',
                error: { message: 'Fonte not FOUND' }
            });
        }
        console.log('Risposta crawler: ', message, message[0].name, req.params.id);

        message[0].progetti.push(req.params.id);
        // message.progetti.push(null, req.params.id);

        message[0].save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Errore nell aggiornamento',
                    error: err
                })
            }
            res.status(201).json({
                message: 'Crawler Update',
                obj: result
            })
        });
    });
});

router.patch('/', function(req, res, next) {

    Progetto.find({}, function(err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Fonte Found',
                error: { message: 'Fonte not FOUND' }
            });
        }

        // message.sito.push(null, req.body.sito._id)
        //user.save();

        message[0].sito = req.body.sito;
        message[0].words = req.body.words;
        // message[0].materia = req.body.materia;
        // message.text = req.body.text;
        // message.text = req.body.text;

        message[0].save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Errore nell aggiornamento',
                    error: err
                })
            }
            res.status(201).json({
                message: 'Aggiornate Words Fonte Update',
                obj: result
            })
        });
    });
});

router.delete('/:id', function(req, res, next) {

    Todo.findById(req.params.id, function(err, message) {

        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Fonte Found',
                error: { message: 'Fonte not FOUND' }
            });
        }

        message.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Errore nell aggiornamento',
                    error: err
                })
            }
            res.status(200).json({
                message: 'Fonte Delete',
                obj: result
            })
        });
    });
});



module.exports = router;