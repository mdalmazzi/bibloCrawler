var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var User = require('./user');


const typeLicense = ["copyright", "creative commons", "pubblico dominio"];
const typeSchool = ["Infanzia", "Primaria", "Secondaria Primo Grado", "Secondaria Secondo Grado"];
const typeContent = ["Page", "Image", "Video", "text/html; charset=UTF-8", "text/html; charset=utf-8", "image/jpeg", "image/png", "video/mp4", "image/gif"];
const typeLanguage = ["Italiano", "Inglese", "Spagnolo", "Francese", "Tedesco"];
const typeMateria = ["Matematica", "Fisica"];

var wordSchema = new Schema({
    // word: { type: String, required: true },
    titolo: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    // body: {
    //     type: String,
    //     required: false,
    //     //minlength: 1, in realtà dovrei scartarlo
    //     trim: true
    // },
    path: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        unique: true // sicuro?
    },
    meta1: {
        type: {
            name: String,
            content: String

        },
        required: false
    },
    meta2: {
        type: {
            name: String,
            content: String
        },
        required: false
    },
    meta3: {
        type: {
            name: String,
            content: String
        },
        required: false
    },
    images: {
        type: Array,
        required: false
    },
    type: {
        type: String,
        required: false,
        minlength: 1,
        trim: true,
        enum: typeContent
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
    word: {
        type: String,
        required: false,
        minlength: 1,
        trim: true

    },
    // body: word.body,
    // image_id: word._id,
    body: {
        type: String,
        required: false,
        minlength: 1,
        trim: true

    },
    image_id: {
        type: String,
        required: false,
        minlength: 1,
        trim: true

    },
});

var Word = mongoose.model('Word', wordSchema);
module.exports = Word;

// make this available to our users in our Node application