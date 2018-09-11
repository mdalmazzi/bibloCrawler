var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var User = require('./user');


// text/plain
// text/html
// image/jpeg
// image/png
// audio/mpeg
// audio/ogg
// audio/*
// video/mp4

const typeLicense = ["copyright", "creative commons", "pubblico dominio"];
const typeSchool = ["Primaria", "Secondaria Primo Grado", "Secondaria Secondo Grado"];
const typeContent = ["Page", "Image", "Video", "text/html; charset=UTF-8", "text/html; charset=utf-8", "text/html", "image/jpeg", "image/png", "video/mp4", "image/gif", "PDF", "pdf", "Pdf"];



const typeLanguage = ["Italiano", "Inglese", "Spagnolo", "Francese", "Tedesco"];
const typeMateria = ["Matematica", "Fisica"];

var pageSchema = new Schema({
    // word: { type: String, required: true },
    titolo: {
        type: String,
        required: false,
        //minlength: 1,
        trim: true
    },
    body: {
        type: String,
        required: false,
        //minlength: 1, in realtà dovrei scartarlo
        trim: true
    },
    path: {
        type: String,
        required: true,
        minlength: 6,
        trim: true, // sicuro?
        unique: true
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
    }
    // controllato: { type: Boolean, required: false },
    // quality: { type: String, required: false }

});

var Page = mongoose.model('Page', pageSchema);
module.exports = Page;

// make this available to our users in our Node application