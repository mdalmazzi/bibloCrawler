var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var User = require('./user');


const typeLicense = ["copyright", "creative commons", "pubblico dominio"];
const typeSchool = ["Primaria", "Secondaria Primo Grado", "Secondaria Secondo Grado"];
const typeContent = ["Page", "Image", "Video", "text/html; charset=UTF-8", "image/jpeg", "image/png", "video/mp4", "image/gif"];
const typeLanguage = ["Italiano", "Inglese", "Spagnolo", "Francese", "Tedesco"];

const typeMateria = ['Matematica', 'Fisica', 'Geografia', 'Storia', 'Italiano', 'Scienze', 'Inglese', 'Francese', 'Tedesco', 'Spagnolo', 'Tecnologia', 'Arte e Immagine', 'Scienze motorie e sportive', 'Latino', 'Informatica', 'Filosofia', 'Musica', 'Religione', 'Scienze delle Terra', 'Biologia', 'Chimica', 'Diritto ed economia', 'Psicologia', 'Antropologia', 'Pedagogia', 'Sociologia', 'Disegno', 'Greco', 'Geostoria'];

const typeFonte = ["Editore", "Blog", "MOOC"];

var youtubeSchema = new Schema({
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
    // controllato: {
    //     type: Boolean,
    //     required: false
    // },
    // quality: {
    //     type: Number,
    //     required: false,
    //     trim: true,
    //     min: 1,
    //     max: 5
    // },
    // completed: {
    //     type: Boolean,
    //     required: false
    // },
    // word: {
    //     type: String,
    //     required: false,
    //     minlength: 1,
    //     trim: true

    // }
});

var YouTube = mongoose.model('YouTube', youtubeSchema);
module.exports = YouTube;

// make this available to our users in our Node application