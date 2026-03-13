const mongoose=require("mongoose");
const connectToDb=async ()=>
{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database is connected by shri ji")
    } catch (error) {
        throw error;
    }
}
module.exports=connectToDb