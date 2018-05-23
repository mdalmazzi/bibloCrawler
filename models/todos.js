var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var User = require('./user');


const typeLicense = ["copyright", "creative commons", "pubblico dominio"];
const typeSchool = ["Primaria", "Secondaria Primo Grado", "Secondaria Secondo Grado"];
const typeContent = ["Page", "Image", "Video", "text/html; charset=UTF-8", "image/jpeg", "image/png", "video/mp4", "image/gif"];
const typeLanguage = ["Italiano", "Inglese", "Spagnolo", "Francese", "Tedesco"];
const typeMateria = ["Matematica", "Fisica"];
const typeFonte = ["Editore", "Blog", "MOOC"];

var todoSchema = new Schema({
    // word: { type: String, required: true },

    text: {
        type: String,
        required: true,
        minlength: 6,
        trim: true // sicuro?
    },


    tipologia: {
        type: String,
        required: false,
        minlength: 1,
        trim: true,
        enum: typeFonte
    },
    licenza: {
        type: String,
        required: false,
        minlength: 1,
        trim: true,
        enum: typeLicense
    },
    scuola: {
        type: [String],
        required: false,
        minlength: 1,
        trim: true,
        enum: typeSchool

    },
    lingua: {
        type: [String],
        required: false,
        minlength: 1,
        trim: true,
        enum: typeLanguage

    },
    materia: {
        type: [String],
        required: false,
        minlength: 1,
        trim: true,
        enum: typeMateria
    },
    controllato: {
        type: Boolean,
        required: false
    },
    quality: {
        type: Number,
        required: false,
        trim: true,
        min: 1,
        max: 5
    },
    // word: {
    //     type: String,
    //     required: false,
    //     minlength: 1,
    //     trim: true

    // }
});

var Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;

// make this available to our users in our Node application