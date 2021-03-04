const express = require('express');
const Post = require('../models/Post.js');
const router = express.Router();

/////////////Post Routes////////////////

/* GET posts */
router.get('/', function(req, res) {
    const query = req.query.search;

    //if search query present
    if (query) {
        //find with params on title and body
        Post.find({$or: [{title: {$regex: query, $options: 'i'}}, { body: { $regex: query, $options: 'i' }}]}, function (err, post) {
            if (err) {
                return res.status(500).json({success: false, msg: err});
            }
            if (!post) {
                return res.status(200).json({success: true, msg: 'No results found'});
            }
            res.status(200).send(post);
        });
    }
    //no search query, return all posts
    else {
        Post.find({}, function (err, post) {
            if (err) {
                return res.status(500).json({success: false, msg: err});
            }
            if (!post) {
                return res.status(404).json({success: false, msg: 'Post not found'});
            }
            res.status(200).send(post);
        });
    }

});

/* POST a new blog post*/
router.post('/', function(req, res) {
    //create a new post with req values
    Post.create({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    }, function (err, post) {
        if (err) {
            return res.status(500).json({success: false, msg: err});
        }
        res.status(200).json({success: true, msg: 'Post Created.'});
    });
});

/* GET specific post */
router.get('/:post_id', function(req, res) {
    //find post with given id
    Post.findOne({_id: req.params.post_id}, function(err, post) {
        if (err) {
            return res.status(500).json({success: false, msg: err});
        }
        if (!post) {
            return res.status(404).json({success: false, msg: 'Post not found'});
        }
        res.status(200).send(post);
    });
});

/* PUT to update or create post */
router.put('/:post_id', function(req, res) {
    const query = {_id: req.params.post_id},
      update = {title: req.body.title, body: req.body.body, author: req.body.author},
      options = { upsert: true, new: true, setDefaultsOnInsert: true };
    //find post and update with req values
    Post.findOneAndUpdate(query, update, options, function(err, post) {
        if (err) {
            return res.status(500).json({success: false, msg: err});
        }
        res.status(200).json({success: true, msg: 'Post Updated.'});
    });
});

/* DELETE post */
router.delete('/:post_id', function(req, res){
    //find post_id and delete it
    Post.findOneAndRemove({_id: req.params.post_id}, function(err, post) {
        if (err) {
            return res.status(500).json({success: false, msg: err});
        }
          if (!post) {
              return res.status(404).json({success: false, msg: 'Post not found'});
          }
          res.status(200).json({success: true, msg: 'Post deleted.'});
      });
});

/////////////Comment Routes////////////////

/* POST a new comment in a post*/
router.post('/:post_id/comments', function(req, res){
    const comment = {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    }
    const query = {_id: req.params.post_id};

    //find post and push comment
    Post.findOneAndUpdate(query, {$push: {comment: comment}}, function(err, post) {
        if (err) {
            return res.status(500).json({success: false, msg: err});
        }
        if (!post) {
            return res.status(404).json({success: false, msg: 'Post not found'});
        }
        res.status(200).json({success: true, msg: 'Comment created.'});
    });
});

/* GET all comments from post */
router.get('/:post_id/comments', function(req, res) {
    const query = req.query.search;

    //if search query present
    if (query) {
        Post.findOne({_id: req.params.post_id,
              $or: [{'comment.title': {$regex: query, $options: 'i'}}, { 'comment.body': { $regex: query, $options: 'i' }}]},
          function(err, post){
              if (err) {
                  return res.status(500).json({success: false, msg: err});
              }
              if (!post) {
                  return res.status(200).json({success: true, msg: 'No results found'});
              }
              const comments = post.comment;
              const results = [];
              comments.forEach(comment => {
                  if (comment.body.includes(query) || comment.title.includes(query)) {
                      results.push(comment);
                  }
              })
              res.status(200).send(results);
          });
    }

    //no search query, find all comments
    else {
        Post.findOne({_id: req.params.post_id}, function(err, post) {
            if (err) {
                return res.status(500).json({success: false, msg: err});
            }
            if (!post) {
                return res.status(404).json({success: true, msg: 'Post not found'});
            }
            res.status(200).send(post.comment);
        });
    }
});

/* GET comment from post*/
router.get('/:post_id/comments/:comment_id', function(req, res) {
    //check if post_id with the comment_id exists
    Post.findOne({_id: req.params.post_id, 'comment._id': req.params.comment_id}, function(err, post) {
        if (err) {
            return res.status(500).json({success: false, msg: err});
        }
        if (!post) {
            return res.status(404).json({success: false, msg: 'Post not found'});
        }
        //search through comments to find the one with the id we want
        const comments = post.comment;
        comments.forEach(comment => {
            if (comment._id.equals(req.params.comment_id)) {
                res.status(200).send(comment);
            }
        })
    });
});

/* PUT update comment & create new if comment DNE */
router.put('/:post_id/comments/:comment_id', function(req, res) {
    var comment = {
        'comment.$.title': req.body.title,
        'comment.$.body': req.body.body,
        'comment.$.author': req.body.author
    }

    //find comment_id with post_id and if exists set/update the comment
    Post.findOneAndUpdate({_id: req.params.post_id, 'comment._id': req.params.comment_id}, { $set: comment }, function(err, comments) {
        if (err) {
            return res.status(500).json({success: false, msg: err});
        }
        //if did not locate a comment with that id
        if (!comments) {
            //create a new comment
            const query = {_id: req.params.post_id}
            const newComment = {
                _id: req.params.comment_id,
                title: req.body.title,
                body: req.body.body,
                author: req.body.author
            }
            //find post_id and push comment
            Post.findOneAndUpdate(query, {$push: {comment: newComment}}, function(err, post) {
                if (err) {
                    return res.status(500).json({success: false, msg: err});
                }
                if (!post) {
                    return res.status(404).json({success: false, msg: 'Post not found'});
                }
                res.status(200).json({success: true, msg: 'New comment created.'});
            });
        }
        else {
            return res.status(200).json({success: true, msg: 'Comment updated.'});
        }
    });
});

/* DELETE comment */
router.delete('/:post_id/comments/:comment_id', function(req, res) {
    //find post_id with comment_id and pull the given comment from the post
    Post.findOneAndUpdate( {_id: req.params.post_id, 'comment._id': req.params.comment_id},
      {$pull: { comment: { _id: req.params.comment_id } }}, function(err, post) {
          if (err) {
              return res.status(500).json({success: false, msg: err});
          }
          else if (!post) {
              return res.status(404).json({success: false, msg: 'Comment not found'});

          } else {
              return res.status(200).json({success: true, msg: 'Comment deleted.'});
          }
      });
});


module.exports = router;
