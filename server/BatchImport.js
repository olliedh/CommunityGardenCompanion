const {MongoClient} = require("mongodb")
require("dotenv").config()
const {MONGO_URI} = process.env

const {v4:uuid} = require("uuid")

const options = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}

const {inventory} = require("./inventory")


const batchImport = async () =>{
    //console.log("inventory", inventory);
    const client  = await new MongoClient(MONGO_URI, options)
    await client.connect()
    const db = client.db("CommunityGardenCompanion")

    const updatedInventory = inventory.map((item)=>{return{...item, _id:uuid()}})

    //console.log("updatedInventory", updatedInventory);
    console.log("MONGO_URI", MONGO_URI);
    await db.collection("Inventory").insertMany(updatedInventory)

    client.close()
    console.log("done");
}

batchImport()