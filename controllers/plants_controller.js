const express = require('express')
const Plant = require('../models/plants.js')
const plants = express.Router()

// INDEX route
plants.get('/', (req, res) => {
    Plant.find({}, (error, allPlants) => {
        // should this maybe be '../views/plants/index.ejs' ?
        res.render('plants/index.ejs', {
            plants: allPlants
        })
    })
})

// SEED Route
plants.get('/setup/seed', (req, res) => {
    Plant.create(
        [
            {
                commonName: 'Rubber Tree',
                photo: 'https://www.chooseyourplant.com/images/plants/ficus-elastica-tineke-1.jpg',
                scientificName: 'Ficus elastica var. tineke',
                light: 'bright, indirect light',
                dateAcquired: 'July 2021',
                lastWatered: 'October 18',
                notes: [
                    'new leaf coming in with bright red markings',
                    'in south-facing window'
                ]
            },
            {
                commonName: 'Neon Pothos',
                photo: 'https://cdn.shopify.com/s/files/1/0439/6623/4784/products/IMG_4388.jpg?v=1618983200',
                scientificName: 'Epipremnum aureum',
                light: 'bright, indirect light',
                dateAcquired: 'June 2021',
                lastWatered: 'October 15',
                notes: [
                    'currently in a hanging basket on front porch'
                ]
            }
        ]
    )
})

module.exports = plants
