var express = require('express');
var router = express.Router();
var crawler = require('../crawler/index');
var scrapper = require('../scrapper/index');

router.get('/', function(req, res, next) {
    res.render('index');

});

router.get('/crawler-go', function(req, res) {

    crawler.crawl(function(content, url, contentType, todo) {

        scrapper.extractData(content, url, contentType, todo);

    });

    // Aggiunto per gestione PAGE - uhm uhm
    res.render('index', { title: 'Crawler attivato' });
    // Aggiunto per gestione PAGE - uhm uhm
});

module.exports = router;