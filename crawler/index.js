var Crawler = require('simplecrawler');

var { Todo } = require('../models/todos');
var Progetto = require('../models/progetto');

module.exports.crawl = function(callback) {

    // Todo.findOne({ 'completed': false }, function(error, todo) {

    ///was ok
    //Todo.find({ 'completed': false })

    Progetto.findOne({}, function(err, messages) {
        if (err) {
            return handleError(err);
        }
        if (!messages) {
            return handleError(err);
        }
    })

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

        console.log('Todos: ', messages);

        var todo = messages.sito[0];

        if (!todo) {
            console.log('todo: ', todo);
            return //gestire meglio
        } else {
            var myCrawlerUrl = todo.text;

            // var myCrawler = Crawler.crawl(todo.text);

            var myCrawler = new Crawler(todo.text);
            // var myCrawler2 = new Crawler("http://www.repubblica.it");

            //  myCrawler.maxDepth = 3; // First page and discovered links from it are fetched

            // Aggiungere WhiteList
            var urls = [];
            // myCrawler.interval = 10000; // Ten seconds
            myCrawler.interval = 1000; // One second
            // myCrawler.depth = 2;
            myCrawler.maxConcurrency = 3;
            myCrawler.timeout = 300000;
            myCrawler.maxResourceSize = 8388608;

            // var siti;
            // messages.sito.forEach((element) => {
            //         myCrawler.domainWhitelist.push(element.text);
            //         // myCrawler.queueURL = element.text;
            //         // myCrawler.queueURL(element.text, myCrawler.queue.length + 1, false);
            //         console.log('myCrawler.queue: ', myCrawler.queue);
            //     })
            // console.log('messages.sito -> siti: ', siti);
            // myCrawler.domainWhitelist = siti;
            // myCrawler.domainWhitelist.push('http://www.bitness.it');
            // console.log('myCrawler.domainWhitelist: ', myCrawler.domainWhitelist);
            // crawler.maxResourceSize = 16777216;

            myCrawler.start();

            // messages.sito.forEach((element) => {
            //     myCrawler.domainWhitelist.push(element.text)

            //     // myCrawler.queueURL = element.text;
            //     myCrawler.queueURL(element.text, 0);
            //     console.log('myCrawler.queue: ', myCrawler.queue);
            // })

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

            // console.log('myCrawler', myCrawler);

            // myCrawler2 = Crawler.crawl("http://www.repubblica.it");
            // myCrawler2.start();

            //myCrawler.host = myCrawler.domainWhitelist[1];
            // myCrawler = null;
            // console.log('myCrawler', myCrawler);

            // Todo.findOneAndUpdate({ 'completed': false }, { $set: { 'completed': true } }, { new: true }, function(error, todo) {
            //     if (error) return handleError(err);

            //     console.log(`Stato URL: ${todo.text} database aggiornato a completed!`);]
            // console.log('Prima stop', myCrawler.domainWhitelist[1]);
            // var Url = myCrawler.domainWhitelist[1];
            // var Url = "http://www.mondadorieducation.it/";
            // myCrawler.stop();
            // // myCrawler = new Crawler(Url);
            // // myCrawler.start()
            // myCrawler = Crawler.crawl(Url);
            // myCrawler.queueURL('http://www.mondadorieducation.it/canali/english', 1);
            // myCrawler.start();
            // console.log('Dopo stop', myCrawler.domainWhitelist, myCrawler.queue);
            // });

            // myCrawler2.on("fetchstart", function(queueItem, requestOptions) {
            //     console.log('Fetch2 start at:', queueItem, myCrawler.queue);


            // });

            console.log(process.argv);
            // myCrawler.start();

            //process.exit(1)
        });

        myCrawler.on("queueadd", function(queueItem, referrerQueueItem) {
            console.log(`Aggiunto Item a queue!`, queueItem);

        });

        myCrawler.on("queueerror", function(error, URLData) {
            console.log(`Errore in queue`, error);

        });

        myCrawler.on("fetchstart", function(queueItem, requestOptions) {
            console.log('Fetch start at:', queueItem, myCrawler.queue);


        });

        // myCrawler2.on("fetchstart", function(queueItem, requestOptions) {
        //     console.log('Fetch2 start at:', queueItem, myCrawler.queue);


        // });

    })
}