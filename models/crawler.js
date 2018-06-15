var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Progetto = require('./progetto');

var schema = new Schema({
    name: { type: String, required: true },
    progetti: [{ type: Schema.Types.ObjectId, ref: 'Progetto' }],
});


module.exports = mongoose.model('Crawler', schema);