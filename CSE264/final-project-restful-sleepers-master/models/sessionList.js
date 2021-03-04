const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sessionSchema = new mongoose.Schema({
    activeID: String,
 });


const SessionSchema = mongoose.model('Sessions', sessionSchema);

module.exports = SessionSchema;
