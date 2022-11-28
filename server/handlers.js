//need to simplify this and add an endpoint
// import Mongo Client
const { MongoClient } = require("mongodb");
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

const addNewPost = async (req, res) => {
    // get the order info from the body object
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

  
const getPosts = async (req, res) => {

    const client = new MongoClient(MONGO_URI, options);

    try {
    const db = client.db(DB_NAME);
    await client.connect();
  
    const result = await db.collection("posts").find().toArray();
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

  module.exports = {addNewPost, getPosts};