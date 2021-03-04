const mongoose = require('mongoose');
const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;


const postSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    title: String,
    body: String,
    author: String,
    date: {
        type: Date,
        default: Date.now
    },
    comment: [{
        _id:  { type: ObjectId, auto: true },
        title: String,
        body: String,
        author: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;