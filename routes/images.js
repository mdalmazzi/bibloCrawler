var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');

var Word = require('../models/word');
var { Todo } = require('../models/todos');
var Page = require('../models/page');

var words = require('../models/word');
var fs = require('fs');

var cheerio = require('cheerio');




//import getThumb from 'video-thumbnail-url';
/* var getThumb = require('video-thumbnail-url');

getThumb('https://www.youtube.com/watch?v=dQw4w9WgXcQ').then(thumb_url => { // thumb_url is  url or null
    console.log(thumb_url); // http://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg
});
 */

/// Printscreen

//var urlToImage = require('url-to-image');
var urlToImage = require('url2img');

function searchForImage($images, $, page) {

    // if ($ != undefined) {
    if ($images) {
        $(($images)).each(function(image) {
            // console.log('$images[image] ', $images[image])
            if ($images[image].attribs.src) {
                if ($images[image].attribs.src.match(/http/g) !== null) {
                    // Salva solo se ha path globale -- forse migliorabile
                    page.images.push($images[image].attribs.src);
                    console.log('Salvo immagine');
                    page.images.save();
                };
            }

        });
    }
    // }

}


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
    cropHeight: 400,

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
    maxTimeout: 10000 * 10,

    // How long in ms do we wait for phantomjs process to finish.
    // If the process is running after this time, it is killed.
    killTimeout: 10000 * 60 * 2,

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

/////// ve

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

    // if ((req.params.materia == 'all') && (req.params.scuola == 'all') && (req.params.risorsa == 'all') && (req.params.fonte == 'all') && (req.params.licenza == 'all')) {
    // Word.find({
    //         "word": req.params.word

    //     })
    // Page.find({ $text: { $search: req.params.word, $caseSensitive: false } },
    Page.find({},
            function(err, messages) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occured',
                        error: err
                    })
                }
            })
        .limit(1000)

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
         
         if (words.type == "video") {

             console.log('thumbnail file downloaded:');

             youtubedl.getThumbs(words.path, options_bis, function(err, files) {
                 if (err) throw err;
                 console.log('thumbnail file downloaded:', files);
             });
         } */

        // for (var i = 0; i < 100; i++) {

        words = messages;


        for (var i = 0; i < 1000; i++) {
            //console.log('i: ', i, words[i].titolo, words[i].images.length);
            if (words[i].images.length == 0) {

                var $ = cheerio.load(messages[i].body);
                var $images = $('img');

                searchForImage($images, $, messages[i]);

                // // if (!messages[i].images.length) {

                // // urlToImage(words[i].path, 'public/img/' + words[i]._id + '.png', options)

                // // .then(function() {
                // //         // do stuff with IMAGE
                // //         console.log('Done:', i);
                // //     })
                // //     .catch(function(err) {
                // //         console.error(err);
                // //     });

                // // } else {

                // // messages[i].save().then(() => { return });

                // //  / }

            }
        }
    });
});

module.exports = router;