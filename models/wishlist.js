const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    commonName: {type: String, required: true},
    photo: String,
    scientificName: String,
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist
