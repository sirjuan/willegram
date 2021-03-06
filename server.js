var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var cloudinary = require('cloudinary');

var app = express();

cloudinary.config({ 
  cloud_name: 'hfttspdhh', 
  api_key: '283212495287685', 
  api_secret: '0k039civAw8agWsahpm-eoY21Uc' 
});



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

// Upload image to cloudinary
app.post("/api/images/upload", function(req, res) {
cloudinary.uploader.upload(req.body.url,
  function(result) { console.log(result); },
  {
    public_id: req.body.id,
    invalidate: true 
})
});




/*
* Endpoint --> "/api/posts"
*/

// GET: retrieve all posts
app.get("/api/posts", function(req, res) {
db.collection("posts").find({}).sort({postTime: -1}).toArray(function(err, docs) {
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
    userId: req.body.userId,
    userName: req.body.userName,
    userProfilePictureUrl: req.body.userPhoto,
    imageUrl: req.body.imageUrl,
    caption: req.body.caption,
    postTime: req.body.postTime,
    tags: req.body.tags,
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

// GET: retrieve posts from followed users

app.get("/api/posts/followed/", function(req, res) {
    if (err) {
handleError(res, err.message, "Failed to get posts");
} else {
 res.status(200).json([]);
}
});




app.get("/api/posts/followed/:users", function(req, res) {
    var data = req.params.users.split(',');
    console.log(data);
    console.log(req.params);
    console.log(req.params.users);
db.collection("posts").find({ userName: { $in: data} }).sort({postTime: -1}).toArray(function(err, docs) {
if (err) {
handleError(res, err.message, "Failed to get posts");
} else {
res.status(200).json(docs);
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

// PUT: add photo to a post or change profile picture
app.put("/api/posts/addImage/:id", function(req, res) {
db.collection("posts").updateOne( { _id: new ObjectID(req.params.id) }, { $set: { "imageUrl": req.body.imageUrl } }, function(err, doc) {
if (err) {
handleError(res, err.message, "Failed to update post");
} else {
res.status(204).end();
}
});
});

// PUT: Change profile picture in posts

app.put("/api/posts/changeProfilePicture/:userName", function(req, res) {
console.log(req.body);
db.collection("posts").updateMany( { userName: req.params.userName }, { $set: { "userProfilePictureUrl": req.body.userProfilePictureUrl  }  }, function(err, doc) {
if (err) {
handleError(res, err.message, "Failed to update post");
} else {
res.status(204).end();
}
});
});

// PUT: Change profile picture in users

app.put("/api/users/changeProfilePicture/:userName", function(req, res) {
db.collection("users").updateMany( { userName: req.params.userName }, { $set: { "profilePictureUrl": req.body.userProfilePictureUrl  }  }, function(err, doc) {
if (err) {
handleError(res, err.message, "Failed to update post");
} else {
res.status(204).end();
}
});
});

// DELETE: delete a post by id (not used on frontend)
app.delete("/api/posts/:id", function(req, res) {
db.collection("posts").deleteOne({_id: new ObjectID(req.params.id) }, function(err, result) {
if (err) {
handleError(res, err.message, "Failed to delete post");
} else {
res.status(204).end();
}
});
});

/*
* Endpoint "/api/posts/user/:userId"
*/

// GET: retrieve posts by userId
app.get("/api/posts/user/:userId", function(req, res) {
    
db.collection("posts").find({userId: req.params.userId}).sort({postTime: -1}).toArray(function(err, result) {
if (err) {
handleError(res, err.message, "Failed to get posts by userId");
} else {
res.status(200).json(result);
}
});
});

/*
* Endpoint "/api/posts/user/:userName"
*/

// GET: retrieve a users by userName
app.get("/api/users/userName/:userName", function(req, res) {
    var searchQuery = '/' + req.params.userName + '/';
db.collection("users").find({ userName: {$regex:req.params.userName,$options:"$i"}}).toArray(function(err, doc) {
if (err) {
handleError(res, err.message, "Failed to get users by userName");
} else {
res.status(200).json(doc);
}
});
});

app.get("/api/users/userName", function(req, res) {
 res.status(200).json([]);
});


// GET: retrieve posts by tags
app.get("/api/posts/tags/:tag", function(req, res) {
var searchQuery = '/' + req.params.tag + '/';
db.collection("posts").find({ tags: {$regex:req.params.tag,$options:"$i"}}).toArray(function(err, doc) {
if (err) {
handleError(res, err.message, "Failed to get posts by tags");
} else {
res.status(200).json(doc);
}
});
});

app.get("/api/posts/tags/", function(req, res) {
 res.status(200).json([]);
});

/*
* Endpoint --> "/api/users"
*/

// GET: retrieve all users
app.get("/api/users", function(req, res) {
db.collection("users").find({}).toArray(function(err, docs) {
if (err) {
handleError(res, err.message, "Failed to get users");
} else {
res.status(200).json(docs);
}
});
});


// POST: create a new user
app.post("/api/users", function(req, res) {
var newUser = {
    userName: req.body.userName,
    profilePictureUrl: "",
    email: req.body.email,
    followers: [],
    follows: []
}

db.collection("users").insertOne(newUser, function(err, doc) {
if (err) {
handleError(res, err.message, "Failed to add user");
} else {
res.status(201).json(doc.ops[0]);
}
});
});

// GET: retrieve a user by id
app.get("/api/users/:id", function(req, res) {
db.collection("users").findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
if (err) {
handleError(res, err.message, "Failed to get post by _id");
} else {
res.status(200).json(doc);
}
});
});

// PUT: update a user by id (like)
app.put("/api/users/:id", function(req, res) {
var updateUser = req.body;
delete updateUser._id;
db.collection("users").updateOne({_id: new ObjectID(req.params.id)}, updateUser, function(err, doc) {
if (err) {
handleError(res, err.message, "Failed to update user");
} else {
res.status(204).end();
}
});
});

// PUT: unlike a post by id
app.put("/api/posts/:id/unlike/:user", function(req, res) {
db.collection("posts").findOneAndUpdate(
    {_id: new ObjectID(req.params.id)},
    { "$pull" : { "likes" :  req.params.user}}, (function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to unlike post");
         } 
        res.status(204).end();
})
)}
);

// PUT: unfollow a user by id
app.put("/api/users/:id/unfollow/:user", function(req, res) {
db.collection("users").findOneAndUpdate(
    {_id: new ObjectID(req.params.id)},
    { "$pull" : { "followers" :  req.params.user}}, (function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update user");
         } 
        res.status(204).end();
})
)}
);

// PUT: unfollow a user by id
app.put("/api/users/:id/unfollower/:user", function(req, res) {
db.collection("users").findOneAndUpdate(
    {_id: new ObjectID(req.params.id)},
    { "$pull" : { "follows" :  req.params.user}}, (function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update user");
         } 
        res.status(204).end();
})
)}
);

// GET: retrieve a user by userName
app.get("/api/users/username/:userName", function(req, res) {
db.collection("users").findOne({ userName: req.params.userName }, function(err, doc) {
if (err) {
handleError(res, err.message, "Failed to get post by userName");
} else {
res.status(200).json(doc);
}
});
});

// GET: retrieve a user by email
app.get("/api/users/email/:email", function(req, res) {
db.collection("users").findOne({ email: req.params.email }, function(err, doc) {
if (err) {
handleError(res, err.message, "Failed to get post by email");
} else {
res.status(200).json(doc);
}
});
});

// Error handler for the api
function handleError(res, reason, message, code) {
console.log("API Error: " + reason);
res.status(code || 500).json({"Error": message});
}