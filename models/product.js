const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productType : {
        type: String,
        required :  true
    }
})

const Product = mongoose.model('product', productSchema)

module.exports = Product