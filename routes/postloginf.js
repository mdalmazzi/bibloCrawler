var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');

var Mappa = require('../models/mappa');
var Word = require('../models/word');
var { Todo } = require('../models/todos');
var Page = require('../models/page');

var words = require('../models/word');
var fs = require('fs');

//import getThumb from 'video-thumbnail-url';
/* var getThumb = require('video-thumbnail-url');

getThumb('https://www.youtube.com/watch?v=dQw4w9WgXcQ').then(thumb_url => { // thumb_url is  url or null
    console.log(thumb_url); // http://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg
});
 */

/// Printscreen

//var urlToImage = require('url-to-image');
var urlToImage = require('url2img');


var options = {
    //fileQuality: 50,
    //width: 1200,
    //height: 800,
    //cropWidth: 400,
    //cropHeight: 400,
    //cropOffsetLeft: 0,
    //cropOffsetTop: 0,
    //cropWidth: 400,
    //cropHeight: 400,
    //requestTimeout: 300,

    // How long in ms do we wait at maximum. The screenshot is
    // taken after this time even though resources are not loaded
    //maxTimeout: 1000 * 10,

    // How long in ms do we wait for phantomjs process to finish.
    // If the process is running after this time, it is killed.
    //killTimeout: 1000 * 60 * 2,

    // If true, phantomjs script will output requests and responses to stdout
    // verbose: false,

    // User agent width
    width: 1200,
    //width: 600,
    // width: 400,

    // User agent height
    height: 800,
    //height: 400,

    //cropWidth: 400,
    //cropHeight: 400,

    // The file type of the rendered image. By default, PhantomJS 
    // sets the output format automatically based on the file extension.
    // Supported: PNG, GIF, JPEG, PDF
    //fileType: 'jpeg',

    // The file quality of the rendered image, represented as a percentage. 
    // This reduces the image size. By default, 100 percent is used.
    //width: 600,
    //height: 800,
    // Give a short time to load additional resources
    //requestTimeout: 100,

    // fileQuality: 50,

    // Sets the width of the final image (cropped from the User agent defined size)
    // By default, no cropping is done.
    cropWidth: false,

    // Sets the height of the final image (cropped from the User agent defined size)
    // By default, no cropping is done.
    //cropHeight: false,

    //Sets the offset of where to begin the image cropping from the left margin 
    // of the page
    //cropOffsetLeft: 0,

    //Sets the offset of where to begin the image cropping from the top margin 
    // of the page
    cropOffsetTop: 0,

    // How long in ms do we wait for additional requests
    // after all initial requests have gotten their response
    // Note: this does NOT limit the amount of time individual request
    //       can take in time
    requestTimeout: 300,

    // How long in ms do we wait at maximum. The screenshot is
    // taken after this time even though resources are not loaded
    maxTimeout: 1000 * 10,

    // How long in ms do we wait for phantomjs process to finish.
    // If the process is running after this time, it is killed.
    killTimeout: 1000 * 60 * 2,

    // If true, phantomjs script will output requests and responses to stdout
    //verbose: false

}

/* 
var youtubedl = require('youtube-dl');
var url = 'https://youtu.be/PizwcirYuGY';

var options_bis = {
    // Downloads available thumbnail.
    all: false,
    // The directory to save the downloaded files in.
    cwd: __dirname,
};

youtubedl.getThumbs(url, options_bis, function(err, files) {
    if (err) throw err;
    console.log('thumbnail file downloaded:', files);
}); */



/* ('www.treccani.it/enciclopedia/acqua_%28Enciclopedia-delle-scienze-sociali%29/', 'treccani.png', options) */


/* urlToImage('http://www.treccani.it/enciclopedia/acqua_%28Enciclopedia-del-Novecento%29/', 'treccani.png', options)
    .then(function() {
        // do stuff with google.png
    })
    .catch(function(err) {
        console.error(err);
    }); */

///

/////// 

/* var Youtube = require('youtube.com');

// You can instantiate the youtube object using the video url
var youtube = Youtube('http://www.youtube.com/watch?v=ategZqxHkz4');

youtube.crop('0:05', '0:25', './file.mp4')
    .then(function() {
        console.log("Done");
    }).catch(function(err) {
        console.log("err : ", err)
    }); */


router.get('/:word/:scuola/:risorsa/:fonte/:materia/:licenza', function(req, res, next) {

    if ((req.params.materia == 'all') && (req.params.scuola == 'all') && (req.params.risorsa == 'all') && (req.params.fonte == 'all') && (req.params.licenza == 'all')) {
        // Word.find({
        //         "word": req.params.word

        //     })
        Page.find({
                    $text: { $search: req.params.word, $caseSensitive: false },

                    // inserito Cairo
                    //'titolo': req.params.word
                    // inserito Cairo

                    // "scuola": { $in: req.params.scuola.split("&") },

                    // "type": (req.params.risorsa == 'all') ? { $exists: true } : {
                    //     // $in: req.params.risorsa.split("&")
                    //     "$regex": req.params.risorsa
                    // }

                }, { score: { $meta: "textScore" } },
                function(err, messages) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occured',
                            error: err
                        })
                    }
                })
            .sort({ score: { $meta: 'textScore' } })
            .limit(50)

        //.sort({ quality: -1 })



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

            /*  words = messages;
             console.log(words);
             if (words.type == "video") {

                 console.log('thumbnail file downloaded:');

                 youtubedl.getThumbs(words.path, options_bis, function(err, files) {
                     if (err) throw err;
                     console.log('thumbnail file downloaded:', files);
                 });
             } */

            // for (var i = 930; i < 980; i++) {

            /* words = messages;

            for (var i = 1500; i < 1600; i++) {
                //console.log('i: ', i, words[i].titolo, words[i].images.length);
                //if (words[i].images.length == 0) {

                urlToImage(words[i].path, words[i]._id + '.png', options)

                .then(function() {
                        // do stuff with IMAGE
                        console.log('Done:', i);
                    })
                    .catch(function(err) {
                        console.error(err);
                    });

            } */

            // }
        });
    } else {

        /* Esempio di text search with AND  */

        // Word.find({
        //             $and: [
        //                 { $text: { $search: req.params.word, $caseSensitive: false } },
        //                 { "meta3.content": (req.params.materia == 'all') ? { $exists: true } : { "$regex": req.params.materia.split("&")[1] } }
        //             ]
        //         },

        /* Esempio di text search with AND  */
        console.log('req.params.scuola.split("&")[0]: ', req.params.scuola.split("&")[0], req.params.risorsa);

        Page.find(

                {

                    // $text: (req.params.type != 'image') ? { $search: req.params.word, $caseSensitive: false } : { $exists: true },
                    // $text: { $search: req.params.word, $caseSensitive: false },
                    // "meta2.content": (req.params.word == 'all') ? { $exists: true } : { "$regex": req.params.word, "$options": "i" }


                    // "meta3.content": (req.params.materia == 'all') ? { $exists: true } : { "$regex": req.params.materia.split("&")[1] },

                    // "scuola": (req.params.scuola == 'all') ? { $exists: true } : {
                    //     $in: req.params.scuola.split("&")
                    // },

                    "scuola": (req.params.scuola.split("&")[0] == 'all') ? { $exists: true } : { $in: req.params.scuola.split("&") },

                    "type": (req.params.risorsa == 'all') ? { $exists: true } : {
                        // $in: req.params.risorsa.split("&")
                        "$regex": req.params.risorsa
                    },

                    // "licenza": (req.params.licenza == 'all') ? { $exists: true } :
                    //     (req.params.licenza.split("&").length == 2) ? {
                    //         "$regex": req.params.licenza.split("&")[1],
                    //         "$options": "i"

                    //     } : { $regex: /copyright|Creative Commons/ },

                    // "path": (req.params.fonte == 'all') ? { $exists: true } :

                    //     (req.params.fonte.split("&").length == 3) ?

                    //     {
                    //         $regex: /treccani|oilproject/
                    //     } : (req.params.fonte.split("&")[1] == 'treccani') ?

                    //     {
                    //         $regex: /treccani/
                    //     } : {
                    //         $regex: /oilproject/
                    //     },

                },

                function(err, messages) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occured',
                            error: err
                        })
                    }
                })
            // .sort({ quality: -1 })



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
            });

            /* words = messages;
            console.log(words);
            if (words.type == "video") {

                console.log('thumbnail file downloaded:');

                youtubedl.getThumbs(words.path, options_bis, function(err, files) {
                    if (err) throw err;
                    console.log('thumbnail file downloaded:', files);
                });
            } */
            /* words = messages;
            for (var i = 310; i < (320); i++) {
                console.log(words)
                if (!words[i].images) {
                    urlToImage(words[i].path, words[i].wordId, options)
                        .then(function() {
                            // do stuff with google.png
                        })
                        .catch(function(err) {
                            console.error(err);
                        });
                }
            } */
            /* words = messages;

            for (var i = 0; i < (50); i++) {
                console.log('i: ', i, words[i].titolo, words[i].images.length);
                if (words[i].images.length == 0) {
                    console.log('Print i: ', i)
                    urlToImage(words[i].path, words[i]._id + '.png', options)

                    .then(function() {
                            // do stuff with IMAGE

                        })
                        .catch(function(err) {
                            console.error(err);
                        });

                }

            } */
        });
    }

});





/* router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Non autenticato',
                error: err
            });
        }
        next();
    })

}); */


/* router.post('/', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred su POST',
                error: err
            })
        }
        var box = new Mappa({
            content: req.body.content,
            testo: req.body.testo,
            rectangle: req.body.rectangle,
            titolo: req.body.titolo,
            numero_mappa: req.body.numero_mappa,
            user: user,
            livello: req.body.livello,
            color: req.body.color
        });
        box.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred su POST',
                    error: err
                })
            }
            user.mappa.push(result);
            user.save();
            res.status(201).json({
                message: 'Box salvato',
                obj: result
            })
        });
    });
}); */


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