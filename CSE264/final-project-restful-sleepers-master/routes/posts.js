const express = require('express');
const Profile = require('../models/Post.js');
const Session = require('../models/sessionList.js');
const router = express.Router();
var unirest = require("unirest");
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
var randomstring = require("randomstring");
//const hash = crypto.createHash('sha256');


//----------------------------- LOGIN/SESSION STUFF --------------------------------------
//This should accept a JSON body and create a new profile element in the profile collection
router.post('/signup', function(req, res, next) {
  const hash = crypto.createHash('sha256');
  //create new user
  console.log("signup route");
  var newUser = new Profile({
    username: req.body.username,
    salt: req.body.password,
    email: req.body.email
  });

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.salt, salt, function(err, hash) {
      if (err) console.log(err);
      newUser.salt = hash;
      var newSession = randomstring.generate();
      newUser.session = newSession;
      newUser.save().catch(err => {
        res.status(400).send("There was an issue saving this user.");
      });
      var info = {session: newSession, admin: newUser.admin};
      res.json(info);
    });
  });

});


router.post("/login/:username", function(req, res, next){
  //const hash = crypto.createHash('sha256');
  var user = req.body.username;
  var pass = req.body.password;
  Profile.findOne({username: user}, function (err, user) {
    //username OK
    if(err){
      console.log(err);
    }

    if (user === null) {
       res.status(404).end();
    }
    else {
      bcrypt.compare(pass, user.salt, function (err, response) {
        //password OK
        if (err) console.log(err);
        if (response) {
          console.log("Login OK, create new session");
          var newSession = randomstring.generate();
          user.session = newSession;
          user.save().catch(err => {
            res.status(400).send("There was an issue saving the recipe to your profile.");
          });
          var admin = user.isAdmin;
          var info = {session: newSession, admin: admin};
          //console.log("my random is "+ newSession.activeID);
          res.json(info);
        }
        else{
          //in correct password res.send()
        }
      });
    }
  });
});

/*
router.post("/logout", function(req, res, next){
  sessionStorage.removeItem('session');
  res.status(200).send("Session Deleted");
});
*/


function isGoodSession(username, session, callback){
  Profile.findOne({username: username}, function (err, user) {
      if (err) console.log(err);
      else {
         var currentSess = user.session;
         var userSess = session
         if (currentSess === userSess) {
           callback(true);
         }
        callback(false);
      }
  });
}



//------------------------------ USER FUNCTIONS --------------------------------------
//get one user
router.get('/users', function(req, res, next) {
  Profile.find(function (err, users) {
    if (err || users === null) res.status(404).send('Collection empty');
    else {
      //console.log("Found the user: " + user);
      res.send(users);
    };    
   });
});

router.get('/:user', function(req, res, next) {
  Profile.findOne({username: req.param("user")}, function (err, user) {
    if (err || user === null) res.status(404).send('Sorry, I cannot find that user.');
    else {
      //console.log("Found the user: " + user);
      res.send(user._id);
    };    
   });
});

//get the saved recipes from a user
router.post('/:id/recipes', function(req, res, next) {
  isGoodSession(req.body.username, req.body.session, function(isGood){
    if (isGood) {
      Profile.findOne({username: req.body.username}, (err, user) => {
        console.log(user.recipes);
        res.send(user.recipes);
      });
    } else {
      //TODO: res.send()
    }
  });
})

//save a recipe
router.post('/:id/save', function(req, res, next){

  isGoodSession(req.body.username, req.body.session, function(isGood){
    if (isGood) {
      Profile.findOne({username: req.body.username}, (err, user) => {
        if (err || user === null) {
          res.status(404).send("User not found.");
        }
        user.recipes.push({
          id: req.body.id,
          title: req.body.title,
          image: req.body.image,
          imageType: req.body.imgType
        });
        user.save().catch(err => {
          res.status(400).send("There was an issue saving the recipe to your profile.");
        });
      });
    }
  });
});

router.post('/:id/unsave/:r_id', function(req, res, next){
  if(isGoodSession(req.body.activeID) ){
    Profile.findOne({_id: req.param("id")}, (err, user) => {
      if (err || user === null) {
        res.status(404).send("User not found.");
      }
      user.recipes.id(req.param("r_id")).remove();
      user.save().catch(err => {
          res.status(400).send("There was an issue saving the recipe to your profile.");
      });
    });
  }
});





//--------------------------- RECIPE API FUNCTIONS -----------------------------------------

/* request a recipe with given ingredients */
router.post('/search', function(req, res, next) {
  console.log("In the search route");
  var str = req.body.ingredients;
  var ingredients = str.replace(/, /g, ",");

  var ask = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients");
  ask.headers({
      "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "x-rapidapi-key": "9ce53b37a0mshf643022a1fed738p1113fcjsn2cc11f39f8ac",
  });
  //Number: The maximal number of recipes to return (default = 5).
  //Ranking: Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
  //Pantry: Whether to ignore pantry ingredients such as water, salt, flour etc..
  ask.query({
    "number": "6",
    "ranking": "1",
    "ignorePantry": "false",
    "ingredients": ingredients
  });
  ask.end(function (response) {
      if (response.error) {
        res.status(400).send("There was an issue retrieving the recipe.");
        throw new Error(response.error);
      }     
      res.send(response.body);
  });
});

//get the full recipe from a given ID
router.get('/search/:id', function(req, res, next){
  var ask = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ req.param("id") + "/information");

  ask.headers({
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": "9ce53b37a0mshf643022a1fed738p1113fcjsn2cc11f39f8ac"
  });

  ask.end(function (response) {
    if (response.error) {
      res.status(400).send("There was an issue retrieving the recipe.");
      throw new Error(response.error);
    }
    res.send(response.body);
  });
});

module.exports = router;
