const {MongoClient} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env

const {v4:uuid} = require("uuid")

const options = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}

const {reservations} = require("./reservations")


const batchImport = async () =>{

    const client  = await new MongoClient(MONGO_URI, options)
    await client.connect()
    const db = client.db("CommunityGardenCompanion")

    const inivitialReservation =  reservations.map((item)=>{return{...item, _id:uuid()}})

    console.log("MONGO_URI", MONGO_URI);
    await db.collection("reservations").insertMany(inivitialReservation)

    client.close()
    console.log("done");
}

batchImport()