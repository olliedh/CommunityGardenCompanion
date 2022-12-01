
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

// Endpoint works
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
// function that posts a new reservation and clears the cart \\
//-----------------------------------------------------\\
//modify this endpoint to post a new reservation and update inventory items

const addNewReservation = async (req, res) => {
//     // get the order info from the body object
    const { name, email, created, tools, datereserved } =
      req.body;
      const _id = uuidv4();
//     // create a new client
    const client = new MongoClient(MONGO_URI, options);
    try {
      // connect to the client
      await client.connect();
      // declare the database
      const db = client.db(DB_NAME);
      // create a new reservation object
      const reservation = {
        //compare to other use of uuid to verify
        _id,
        name,
        email,
        tools,
        datereserved,
        created
        
      };
      //       // insert the reservation into the "reservations" collection
      const result= await db.collection("reservations").insertOne(reservation);
      //updated up to here
      //       // update the tools array to 
            // await db.collection("Inventory").update({tool= {$in :tools }} , $set:{isAvailable:false});
        //       
            // 
            //updateMany({tool= {$in :tools }} , $set:{isAvailable:false})
            //    
            //       // get the reservation just created to send it back to the front end
            const confirmation = await db.collection("reservations").findOne({_id});
//       // send the updated cart
      res.status(200).json({ status: 200, data: reservation });
    } catch (err) {
      // if there is an error, console log it and send a 500 status
      console.log(err.stack);
      res.status(500).json({ status: 500, message: err.message });
    } finally {
      // close the connection
      client.close();
    }
  };
const test=(req,res)=>{
  const test = req.body
  res.status(200).json({status:200 , data:test})
}

module.exports = {getTools, addNewReservation, test}
