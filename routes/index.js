var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

// var User = mongoose.model("users", { name: String });
//
// var user1 = new User({name: 'from Mongoos'}); // creats in memory
// user1.save();
// User.find({}, function(err, data) {
//   console.log(data);
// });

var Question = mongoose.model("Question", {
  body: {type: String, required: true, unique: true},
  email: {type: String, required: true},
  createdAt: {type: Date, default: Date.now(), required: true}
});
// var add500 = function() {
//   var fakeUser = {}, fakePost;
//   for (var i = 0; i < 500; i++) {
//     fakeUser.body = "Body " + i;
//     fakeUser.email = i + ".email@example.com";
//     fakePost = new Question(fakeUser);
//     fakePost.save(function(err, savedQuestion) {
//       if (err) {
//         console.log(err);
//       }
//       console.log(savedQuestion);
//     });
//   }
// };
// add500();
// temp500Qs = Array.apply(null, Array(500)).map(function(n, i) { return {body: "Q" + i, email: "fake@fake.fake"}; });
// Question.create(temp500Qs);
Question.on("index", function(err) {
  console.log(err);
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/test', function(req, res, next) {
  res.send('Just testing');
});
router.post('/test', function(req, res, next) {
  var response = req.body;
  response.serverTime = new Date();
  res.send(response);
});
router.post('/questions', function(req, res) {
  var question = new Question(req.body);
  question.save(function(err, savedQuestion) {
    if (err) {
      res.status(400).json({ error: "Validation Failed" });
    }
    var question = Question.find({})
                    .sort({createdAt: 'desc'})
                    .limit(10).exec(function(err, data) {
      if (err) {
          res.status(400).json({ error: "Invalid questions request" });
      }
      res.json(savedQuestion);
    });
  });
});
router.get('/questions', function(req, res) {
  var question = Question.find({})
                  .sort({createdAt: 'desc'})
                  .limit(10).exec(function(err, data) {
    if (err) {
        res.status(400).json({ error: "Invalid questions request" });
    }
    res.json(data);
  });
});

module.exports = router;
