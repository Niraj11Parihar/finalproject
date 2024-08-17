const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
})

const UserModel = mongoose.model("userDatatbl1",userSchema);

module.exports = UserModel;