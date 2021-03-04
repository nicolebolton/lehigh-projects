const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const profileSchema = new mongoose.Schema({

    username: String,
    salt: String,
    hash: String,
    recipes: [{ 
        id: Number,
        title: String,
        image: String,
        imageType: String
    }],
    isAdmin: { type: Boolean, default: false },
    email: String,
    session: String
 });


const ProfileSchema = mongoose.model('Profile', profileSchema);

module.exports = ProfileSchema;
