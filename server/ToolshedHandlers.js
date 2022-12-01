
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

const {v4:uuidv4} = require("uuid");
const { inventory } = require("./inventory");
//endpoint handlers start here //

// endpoint was tested
const getTools = async (req, res) => {
    // creates a new client
    const client = new MongoClient(MONGO_URI, options);
    //database name in variable
    const db = client.db(DB_NAME);
  try {
    await client.connect();
  
    const tools = await db.collection("Inventory").find().toArray();
 
    if (tools.length) {
        res.status(200).json({
          status: 200,
          data: tools
        });
      } else {
        res.status(404).json({ status: 404, data: "Inventory Not Found" });
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


  //-----------------------------------------------------\\
// function that posts a new order and clears the cart \\
//-----------------------------------------------------\\
//modify this endpoint to post a new reservation and update inventory items

// const postOrder = async (req, res) => {
//     // get the order info from the body object
//     const { _id, name, email, address, purchasedCart, date, phoneNumber } =
//       req.body;
  
//     // create a new client
//     const client = new MongoClient(MONGO_URI, options);
//     try {
//       // connect to the client
//       await client.connect();
//       // declare the database
//       const db = client.db(DB_NAME);
//       // create a new order object
//       const order = {
//         _id: Number(_id),
//         name,
//         email,
//         address,
//         purchasedCart,
//         date,
//         phoneNumber,
//       };
//       // insert the order into the "orders" collection
//       await db.collection("orders").insertOne(order);
//       // clear the cart
//       await db.collection("cart").updateOne(
//         {}, // filter
//         {
//           $set: {
//             cartItems: [], // update
//             totalPrice: 0,
//             numOfCartItems: 0,
//           },
//         }
//       );
//       // grab the whole cart object from the "cart" collection to send it back to the front end
//       const cart = await db.collection("cart").findOne();
//       // send the updated cart
//       res.status(200).json({ status: 200, data: cart });
//     } catch (err) {
//       // if there is an error, console log it and send a 500 status
//       console.log(err.stack);
//       res.status(500).json({ status: 500, message: err.message });
//     } finally {
//       // close the connection
//       client.close();
//     }
//   };


module.exports = {getTools}