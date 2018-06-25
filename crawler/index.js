var Crawler = require('simplecrawler');

var { Todo } = require('../models/todos');
var Progetto = require('../models/progetto');

module.exports.crawl = function(callback) {

    // Todo.findOne({ 'completed': false }, function(error, todo) {

    ///was ok
    //Todo.find({ 'completed': false })

    Progetto.findOne({})

    .populate({ path: 'sito', match: { 'completed': false } })
        .exec(function(err, messages) {
            if (err) {
                return handleError(err);
                // return res.status(500).json({
                //     title: 'An error occured',
                //     error: err
                // });
            }
            // res.status(200).json({
            //     message: 'Progetto letto con successo',
            //     obj: messages
            // })

            // console.log('Todos: ', messages);

            var todo = messages.sito[0];

            if (!todo) {
                return //gestire meglio
            } else {
                var myCrawlerUrl = todo.text;

                var myCrawler = Crawler.crawl(todo.text);

                //  myCrawler.maxDepth = 3; // First page and discovered links from it are fetched

                // Aggiungere WhiteList
                var urls = [];
                // myCrawler.interval = 10000; // Ten seconds
                myCrawler.interval = 1000; // One second
                myCrawler.maxConcurrency = 3;
                myCrawler.timeout = 300000;
                myCrawler.maxResourceSize = 8388608;

                // var siti;
                messages.sito.forEach((element) => {
                        myCrawler.domainWhitelist.push(element.text)
                    })
                    // console.log('messages.sito -> siti: ', siti);
                    // myCrawler.domainWhitelist = siti;

                console.log('myCrawler.domainWhitelist: ', myCrawler.domainWhitelist);
                // crawler.maxResourceSize = 16777216;

                // myCrawler.start();
            }

            myCrawler.on("crawlstart", function() {
                console.log("Crawler started! Partitooooo");

            });

            myCrawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {

                console.log("Fetched completed! At: ", queueItem);

                callback(responseBuffer, queueItem.url, queueItem.stateData.contentType, todo);
            });

            myCrawler.on("complete", function() {
                console.log(`Crawler ${myCrawlerUrl} completed!`);

                console.log('myCrawler', myCrawler);
                // myCrawler = null;
                // console.log('myCrawler', myCrawler);

                Todo.findOneAndUpdate({ 'completed': false }, { $set: { 'completed': true } }, { new: true }, function(error, todo) {
                    if (error) return handleError(err);

                    console.log(`Stato URL: ${todo.text} database aggiornato a completed!`);
                    myCrawler.stop();
                });

                console.log(process.argv);

                //process.exit(1);
            });

            myCrawler.on("queueadd", function(queueItem, referrerQueueItem) {
                //  console.log(`Aggiunto Item a queue!`, queueItem);

            });

            myCrawler.on("queueerror", function(error, URLData) {
                console.log(`Errore in queue`, error);

            });

            myCrawler.on("fetchstart", function(queueItem, requestOptions) {
                // console.log('Fetch start at:', queueItem);
            });

        })
}