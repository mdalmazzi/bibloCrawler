var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');

//var User = require('../models/user');

var Todo = require('../models/todos');
var YouTube = require('../models/youtube');
var Progetto = require('../models/progetto');

router.get('/', function(req, res, next) {

    YouTube.find({},

        function(err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured',
                    error: err
                })
            }
        })

    .exec(function(err, messages) {
        if (err) {
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        res.status(200).json({
            message: 'Elenco canali letto con successo!!',
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

router.post('/', /* authenticate, */ (req, res, next) => {
    var youtube = new YouTube({
        text: req.body.text,
        tipologia: req.body.tipologia,
        licenza: req.body.licenza,
        scuola: req.body.scuola,
        lingua: req.body.lingua,
        materia: req.body.materia,
        // completed: req.body.completed
        //_creator: req.user._id
    });

    youtube.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred su POST',
                error: err
            })
        }
        console.log(result);
        res.status(201).json({
            //             message: 'Progetto salvata',
            //             obj: progetto
            //         }).status(201).json({
            message: 'canale salvato',
            obj: result
        })

        //Aggiunta per aggiornare progetto
        // Progetto.find({ 'name': req.params.id },
        //     function(err, progetto) {
        //         if (err) {
        //             return res.status(500).json({
        //                 title: 'An error occured',
        //                 error: err
        //             })
        //         }

        //         // progetto[0].sito.push(result._id);
        //         progetto[0].sito = progetto[0].sito.concat([result._id]);
        //         progetto[0].save();

        //         res.status(201).json({
        //             message: 'Fonte salvata',
        //             obj: result
        //         })
        //     })

        //Aggiunta per aggiornare progetto

        // res.status(201).json({
        //     message: 'Fonte salvata',
        //     obj: result
        // })

    });
});

/// Aggiunta Sito a Progetto


/// Aggiunta Progetto

// router.post('/', /* authenticate, */ (req, res, next) => {
//     //Aggiunta per aggiornare progetto
//     var progetto = new Progetto({
//         name: req.body.name,
//         // titolo: req.body.titolo,
//         // path: req.body.path,

//     });
//     progetto.save(function(err, progetto) {
//         if (err) {
//             return res.status(500).json({
//                 title: 'An error occured',
//                 error: err
//             })
//         }

//         res.status(201).json({
//             message: 'Progetto salvata',
//             obj: progetto
//         })
//     })

// });


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

        // message.sito.push(null, req.body.sito._id)
        //user.save();



        message.scuola = req.body.scuola;
        // message.
        message.lingua = req.body.lingua;
        message.materia = req.body.materia;
        message.completed = req.body.completed;
        // message.text = req.body.text;
        // message.text = req.body.text;

        message.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Errore nell aggiornamento',
                    error: err
                })
            }
            res.status(201).json({
                message: 'Fonte Update',
                obj: result
            })
        });
    });
});

router.patch('/', function(req, res, next) {

    Progetto.find({ 'name': req.body.name }, function(err, message) {
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

        console.log('Router message: ', message);

        if (req.body.sito.length >= 6) {
            message[0].sito = req.body.sito;
        }

        message[0].words = req.body.words;

        console.log('Req Body: ', req.body);

        message[0].save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Errore nell\'aggiornamento',
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