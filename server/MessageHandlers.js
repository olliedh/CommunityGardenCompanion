
// import Mongo Client
const { MongoClient, CommandFailedEvent } = require("mongodb");
// create a constant to use for our Db name
const DB_NAME = "CommunityGardenCompanion";



require("dotenv").config();
// create a constant to use for our connection string
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {v4:uuidv4} = require("uuid")
//endpoint handlers start here //


//THIS ENDPOINT WORKS
const addNewPost = async (req, res) => {
    // get the post info from the body object
    const {
        //  title, content, _id, name, email (as userID), comments
         title, content, time, userId, name, comments } =
      req.body;
      console.log(req.body)
const _id = uuidv4();

    // create a new client
    const client = new MongoClient(MONGO_URI, options);
    try {
      // connect to the client
      await client.connect();
      // declare the database
      const db = client.db(DB_NAME);
      // create a new post object
      const newPost = {
        _id,
        title, content, time, userId, name, comments
      };
      // insert the post into the "posts" collection
      await db.collection("posts").insertOne(newPost);

      res.status(200).json({ status: 200, data: newPost });
    } catch (err) {
      // if there is an error, console log it and send a 500 status
      console.log(err.stack);
      res.status(500).json({ status: 500, message: err.message });
    } finally {
      // close the connection
      client.close();
    }
  };

  //THIS ENDPOINT WORKS
  //this endpoint gets all posts' data but is used to generate the titles alone
const getPosts = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
    const db = client.db(DB_NAME);
    await client.connect();
  
    const result = await db.collection("posts").find().sort({time:-1}).toArray();
    //this result limit logic is lifted from mongodb1, will currently only display  25 posts
    let defaultStart = 0;
    let defaultLimit = 25;
    if (req.query.start) {
      defaultStart = Number(req.query.start);
    }
    if (req.query.limit) {
      defaultLimit = Number(req.query.limit);
    }
    if (defaultStart + defaultLimit > result.length) {
      defaultLimit = result.length;
    }
  
    if (result.length) {
      res.status(200).json({
        status: 200,
        data: result.slice(defaultStart, defaultStart + defaultLimit),
      });
    } else {
      res.status(404).json({ status: 404, data: "Not Found" });
    }
} catch (err) {

} finally {
    client.close();
    console.log("disconnected!");
  };
}

//THIS ENDPOINT WORKS
//get a single post and its comments
const getPost = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(DB_NAME);
  try {
  await client.connect();

  const _id = req.params._id;
  console.log(req.params);
  const postById = await db.collection("posts").findOne({ _id });

postById
    ? res.status(200).json({ status: 200, _id, data: postById})
    : res.status(404).json({ status: 404, _id, data: "Not Found" });}
  catch (err) {
    // if there is an error, console log it and send a 500 status
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
  client.close();}
};

//THIS ENDPOINT WORKS
//pushing comment into nested array of a post
const addComment= async (req, res) => {
  // get the comment info from the body object
  const {
      //  title, content, _id, name, email (as userID), comments
       _id, content, time, userId, name } =
    req.body;
    console.log(req.body)
    const commentId = uuidv4();

  // create a new client
  const client = new MongoClient(MONGO_URI, options);
  try {
    // connect to the client
    await client.connect();
    // declare the database
    const db = client.db(DB_NAME);
    // create a new post object
    const newComment = {
      _id,
    content, time, userId, name, commentId
    };

    
  const query = { _id,};
  console.log("this one is the query ", query);
//this is meant to specify to push the req.body into the value of the comments field (which is an array)
  const newValue = {
    $push: { comments: newComment}
  };
    // insert the comment into the "comments" array of the post
    const update = await db.collection("posts").updateOne(query, newValue);
    console.log(update.modifiedCount)
  if (update.modifiedCount > 0) {   
     res.status(200).json({ status: 200, data: newComment });}
     else {
      res.status(400).json({status: 400, message: "update failed"})
     }

  } catch (err) {
    // if there is an error, console log it and send a 500 status
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    // close the connection
    client.close();
  }
};

//THIS ENDPOINT WORKS
//delete one post (will also delete all comments)
const deletePost = async (req, res) => {
  const { _id } = req.body;
  const client = new MongoClient(MONGO_URI, options);
try {
      // connect to the client
      await client.connect();
      // declare the database
      const db = client.db(DB_NAME);
      // create a new post object

  const deleteMessage = await db.collection("posts").deleteOne({ _id: _id });
  console.log(deleteMessage);
  if (deleteMessage.deletedCount === 1) {
    res.status(200).json({
      status: 204,
      data: deleteMessage,
      message: `entry successfully deleted`,
    });
  } else {
    res.status(404).json({ status: 404, error: "entry was not deleted" });
  }} catch (err) {
    // if there is an error, console log it and send a 500 status
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    // close the connection
    client.close();
  }
};


//THIS ENDPOINT WORKS
//edit a post 
const editPost = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
      // connect to the client
      await client.connect();
      // declare the database
      const db = client.db(DB_NAME);

  const _id = req.body._id;

  const query = { _id };
  console.log("this one is the query ", query);

  const newValue = {
    $set: {
      title: req.body.title,
      content: req.body.content,
      timeofedit: req.body.timeofedit
    },
  };
  const update = await db.collection("posts").updateOne(query, newValue);
  console.log(update);
  if (update.modifiedCount === 1) {
    res
      .status(200)
      .json({ status: 200, _id, title: req.body.title, content: req.body.content, data: update });
  } else {
    return res
      .status(400)
      .json({ status: 404, data: ` error: the id: ${_id} is not a match` });
  }} catch (err) {
    // if there is an error, console log it and send a 500 status
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    // close the connection
    client.close();
  }
};

//DOES NOT WORK FOR NOW message: Update document requires atomic operators
//goes with patch method to update nested comment - double check this is appropriate
const editComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
      // connect to the client
      await client.connect();
      // declare the database
      const db = client.db(DB_NAME);

  const _id = req.params._id;
  const commentId = req.params.commentId;

  const query = { _id, "comments.commentId": commentId };



  console.log("this one is the query ", query);

  const newValue = {
  
      $set: {"comments.$.title": req.body.title, "comments.$.content": req.body.content }
  
  
  };
  const update = await db.collection("posts").updateOne(query, newValue);
  console.log(update);
  if (update.modifiedCount === 1) {
    res
      .status(200)
      .json({ status: 200, _id, title: req.body.title, content: req.body.content, data: update });
  } else {
    return res
      .status(400)
      .json({ status: 404, data: ` error: the id: ${_id} is not a match` });
  }} catch (err) {
    // if there is an error, console log it and send a 500 status
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    // close the connection
    client.close();
  }
};


//DOES NOT WORK FOR NOW
//goes with patch method to delete nested comment - double check this is appropriate
const deleteComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
      // connect to the client
      await client.connect();
      // declare the database
      const db = client.db(DB_NAME);

  const _id = req.params._id;
  const commentId = req.params.commentId;

  const query = { _id, "comments.commentId": commentId };



  console.log("this one is the query ", query);

  const newValue = {
       //$pull method??
      // $set: {"comments.$.title": req.body.title, "comments.$.content": req.body.content }
  
  
  };
  const update = await db.collection("posts").updateOne(query, newValue);
  console.log(update);
  if (update.modifiedCount === 1) {
    res
      .status(200)
      .json({ status: 200, _id, title: req.body.title, content: req.body.content, data: update });
  } else {
    return res
      .status(400)
      .json({ status: 404, data: ` error: the id: ${_id} is not a match` });
  }} catch (err) {
    // if there is an error, console log it and send a 500 status
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    // close the connection
    client.close();
  }
};


  module.exports = {addNewPost, getPosts, addComment, getPost, deletePost, editPost, deleteComment };