var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = require('./todos');

var schema = new Schema({
    name: { type: String, required: true },
    sito: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    words: [{ type: String, required: false }]
});


// schema.post('remove', function(mappa) {
//     User.findById(mappa.user, function(err, user) {
//         user.mappa.pull(mappa);
//         user.save();

//     })
// });

module.exports = mongoose.model('Progetto', schema);