var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    content: { type: String, required: true },
    testo: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    livello: { type: Number, required: false },
    titolo: { type: Boolean, required: false },
    numero_mappa: { type: Number, required: false },
    color: { type: String, required: false },
    rectangle: { type: { top: Number, bottom: Number, left: Number, right: Number, height: Number, width: Number }, required: false }
});

schema.post('remove', function(mappa) {
    User.findById(mappa.user, function(err, user) {
        user.mappa.pull(mappa);
        user.save();

    })
});

module.exports = mongoose.model('Mappa', schema);