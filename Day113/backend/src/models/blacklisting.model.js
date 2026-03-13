const mongoose=require("mongoose");
const blacklistingSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token sholud be required by shri ji"]
    }
},{
    timestamps:true
})
const blacklistingModel=mongoose.model("blacklists",blacklistingSchema);
module.exports=blacklistingModel;