const express = require('express')
const Plant = require('../models/plants.js')
const Wishlist = require('../models/wishlist.js')
const plants = express.Router()

// middleware that restricts certain functionality to logged in user
const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}
// CREATE wishlist plant
plants.post('/wishlist/', (req, res) => {
    Wishlist.create(req.body, (error, createdWishlistPlant) => {
        res.redirect('/plants/wishlist')
    })
})
// new wishlist plant
plants.get('/wishlist/new', isAuthenticated, (req, res) => {
    res.render('plants/newW.ejs', {currentUser: req.session.currentUser})
})
// delete from wishlist
plants.delete('/wishlist/:id', (req, res) => {
    Wishlist.findByIdAndRemove(req.params.id, (err, deletedPlant) => {
        res.redirect('/plants/wishlist')
    })
})
// WISHLIST route
plants.get('/wishlist', (req, res) => {
    Wishlist.find({}, (error, allWishlist) => {
        res.render('plants/wishlist.ejs', {
            wishlist: allWishlist,
            currentUser: req.session.currentUser
        })
    })
})

// NEW plant Route
plants.get('/new', isAuthenticated, (req, res) => {
    res.render('plants/new.ejs', {currentUser: req.session.currentUser})
})
// CREATE
plants.post('/', (req, res) => {
    req.body.notes = req.body.notes.split("/")
    Plant.create(req.body, (error, createdPlant) => {
        res.redirect('/plants')
    })
})

// SHOW Route
plants.get('/:id', (req, res) => {
    Plant.findById(req.params.id, (error, foundPlant) => {
        res.render('plants/show.ejs', {
            plant: foundPlant,
            currentUser: req.session.currentUser
        })
    })
})

// EDIT route
plants.get('/:id/edit', (req, res) => {
    Plant.findById(req.params.id, (error, foundPlant) => {
        res.render('plants/edit.ejs', {
            plant: foundPlant,
            currentUser: req.session.currentUser
        })
    })
})
// DELETE
plants.delete('/:id', (req, res) => {
    Plant.findByIdAndRemove(req.params.id, (err, deletedPlant) => {
        res.redirect('/plants')
    })
})
// PUT route
plants.put('/:id', (req, res) => {
    req.body.notes = req.body.notes.split("/")
    Plant.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true},
        (error, updatedModel) => {
            res.redirect('/plants')
        }
    )
})
// INDEX route
plants.get('/', (req, res) => {
    // res.send('success')
    Plant.find({}, (error, allPlants) => {
        // should this maybe be '../views/plants/index.ejs' ?
        res.render('../views/plants/index.ejs', {
            plants: allPlants,
            currentUser: req.session.currentUser
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
        ],
        (error, data) => {
            res.redirect('/plants')
        }
    )
})

module.exports = plants
