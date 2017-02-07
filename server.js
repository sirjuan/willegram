var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var mongodb = require('mongodb'),
mongoClient = mongodb.MongoClient,
ObjectID = mongodb.ObjectID, // Used in API endpoints
db; // We'll initialize connection below

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(cors()); // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.use(express.static("www")); // Our Ionic app build is in the www folder (kept up-to-date by the Ionic CLI using 'ionic serve')

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://heroku_vn17t7s4:mv05rge4sm4jeh90snm7ha3u9q@ds139939.mlab.com:39939/heroku_vn17t7s4';

// Initialize database connection and then start the server.
mongoClient.connect(MONGODB_URI, function (err, database) {
if (err) {
process.exit(1);
}

db = database; // Our database object from mLab

console.log("Database connection ready");

// Initialize the app.
app.listen(app.get('port'), function () {
console.log("You're a wizard, Harry. I'm a what? Yes, a wizard, on port", app.get('port'));
});
});

/*
* Endpoint --> "/api/posts"
*/

// GET: retrieve all posts
app.get("/api/posts", function(req, res) {
db.collection("posts").find({}).toArray(function(err, docs) {
if (err) {
handleError(res, err.message, "Failed to get posts");
} else {
res.status(200).json(docs);
}
});
});

// POST: create a new post
app.post("/api/posts", function(req, res) {
var newPost = {
    userId: 'joku',
    userName: 'sirjuan',
    imageUrl: req.body.image,
    caption: req.body.caption,
    postTime: '10:16',
    tags: [],
    comments: [],
    likes: []
}

db.collection("posts").insertOne(newPost, function(err, doc) {
if (err) {
handleError(res, err.message, "Failed to add post");
} else {
res.status(201).json(doc.ops[0]);
}
});
});





/*
* Endpoint "/api/posts/:id"
*/

// GET: retrieve a post by id -- Note, not used on front-end
app.get("/api/posts/:id", function(req, res) {
db.collection("posts").findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
if (err) {
handleError(res, err.message, "Failed to get post by _id");
} else {
res.status(200).json(doc);
}
});
});

// PUT: update a post by id
app.put("/api/posts/:id", function(req, res) {
var updatePost = req.body;
delete updatePost._id;

db.collection("posts").updateOne({_id: new ObjectID(req.params.id)}, updatePost, function(err, doc) {
if (err) {
handleError(res, err.message, "Failed to update post");
} else {
res.status(204).end();
}
});
});

// DELETE: delete a post by id
app.delete("/api/posts/:id", function(req, res) {
db.collection("posts").deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
if (err) {
handleError(res, err.message, "Failed to delete post");
} else {
res.status(204).end();
}
});
});

app.delete("/api/posts/:id/likes/user", function(req, res) {
db.collection("posts.likes").deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
if (err) {
handleError(res, err.message, "Failed to delete post");
} else {
res.status(204).end();
}
});
});

// USER: create a new user
app.post("/api/users", function(req, res) {
var newPost = {
    userName: req.body.userName,
    profilePictureUrl: '',
    email: req.body.email,
    followers: [],
    follows: []
}

db.collection("posts").insertOne(newPost, function(err, doc) {
if (err) {
handleError(res, err.message, "Failed to add post");
} else {
res.status(201).json(doc.ops[0]);
}
});
});

// Error handler for the api
function handleError(res, reason, message, code) {
console.log("API Error: " + reason);
res.status(code || 500).json({"Error": message});
}