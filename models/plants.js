const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
    commonName: {type: String, required: true},
    photo: String,
    scientificName: String,
    light: String,
    dateAcquired: String,
    lastWatered: String,
    notes: [{type: String}]
})

const Plant = mongoose.model('Plant', plantSchema)

module.exports = Plant
