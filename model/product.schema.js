const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title : String,
    price : Number,
    description : String,
    image : String
})

const productModel = mongoose.model("producttbl",productSchema);

module.exports = productModel;