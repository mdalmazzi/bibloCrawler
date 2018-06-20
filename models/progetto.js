var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = require('./todos');

var schema = new Schema({
    name: { type: String, required: true },
    sito: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    words: [{ type: String, required: false }]
});




module.exports = mongoose.model('Progetto', schema);