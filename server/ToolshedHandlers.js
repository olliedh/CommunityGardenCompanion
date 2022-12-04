
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
// function that posts a new reservation, updates inventory and sends reservation to frontend \\
//-----------------------------------------------------\\
//modify this endpoint - isAvailable boolean no longer required

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
      //      
      
      // update the tools array to isAvailable = false
            
          //  const updateInventory =  await db.collection("Inventory").updateMany({tool: {$in:tools} } 
          //   ,[{ $set:{isAvailable:false}}]);

            // 
            //updateMany({tool= {$in :tools }} , $set:{isAvailable:false})
            //    
            //       // get the reservation just created to send it back to the front end
            const confirmation = await db.collection("reservations").findOne({_id});
//       // send the updated cart
if (result) 
   {  
     res.status(200).json({ status: 200, data: confirmation, message: "success, reservation confirmed" });}
     else {

      res.status(400).json({status: 400, message: "not found", data: reservation})
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





//isn't used directly by the front
const getAllReservations =  async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

try {
  await client.connect();
  // declare the database
  const db = client.db(DB_NAME);
  // create a new reservation object

  const allReservations =  await db.collection("reservations").find().toArray();
 console.log(allReservations);
  if (allReservations) 
  {  
    res.status(200).json({ status: 200, data: {}, message: "success, reservation confirmed" });}
    else {

     res.status(400).json({status: 400, message: "not found"})
    }

} catch (err) {
  // if there is an error, console log it and send a 500 status
  console.log(err.stack);
  res.status(500).json({ status: 500, message: err.message });
} finally {
  // close the connection
  client.close();
}


}




const getReservationsByDate =  async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

try {
  await client.connect();
  // declare the database
  const db = client.db(DB_NAME);
  // create a new reservation object


 const filteredReservations = await filterReservationsByDate(req, res, db);

  

  /////////////this res conditional needs fixing to fail if say, there's an error in dates//////////
 console.log()
  if (true) ///
  {  
    res.status(200).json({ status: 200, data: {filter}, message: "success, reservations by date found" });}
    else {

     res.status(400).json({status: 400, message: "reservations by date not found"})
    }

} catch (err) {
  // if there is an error, console log it and send a 500 status
  console.log(err.stack);
  res.status(500).json({ status: 500, message: err.message });
} finally {
  // close the connection
  client.close();
}


}

///Endpoint for the fetch on selection
const isReservedByDate = async(req,res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    // declare the database
    const db = client.db(DB_NAME);
    // create a new reservation object
  
  
   const filteredReservations = await filterReservationsByDate(req, res, db);
//maps over reservtions and turns the tool array of arrays into an array of strings
  const tools = filteredReservations.map( (reservation) => {
  return  reservation.tools
  })
  .flat()

  res.status(200).json({ status: 200, data: {tools}, message: "success" });}
  

catch (err) {
  // if there is an error, console log it and send a 500 status
  console.log(err.stack);
  res.status(500).json({ status: 500, message: err.message });
} finally {
  // close the connection
  client.close();
}
   
  

}
 
//
const filterReservationsByDate = async(req, res, db) => {
//get the date from params
  const date =  req.params.date
  console.log(req.params)
  //get reservations
  const ReservationsByDate =  await db.collection("reservations").find().toArray();

  //find reservations made on a specific date
  const filteredReservations = ReservationsByDate.filter((reservation)=> {

return   reservation.datereserved === date

  } )
  return filteredReservations
}


module.exports = {getTools, addNewReservation, getAllReservations, getReservationsByDate, isReservedByDate}
