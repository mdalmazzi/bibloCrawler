var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');


var wordSchema = new Schema({
    word: { type: String, required: true },
    titolo: { type: String, required: false },
    body: { type: String, required: false },
    path: { type: String, required: false },
    meta1: { type: { name: String, content: String }, required: false },
    meta2: { type: { name: String, content: String }, required: false },
    meta3: { type: { name: String, content: String }, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    images: { type: Array, required: false },
    type: { type: String, required: false },
    licenza: { type: String, required: false },
    scuola: { type: String, required: false },
    controllato: { type: Boolean, required: false },
    quality: { type: String, required: false }
});


var Word = mongoose.model('Word', wordSchema);
module.exports = Word;



// make this available to our users in our Node applications