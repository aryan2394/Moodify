const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username should be unique by shri ji"],
        required:[true,"username is required by shri ji"]
    },
    email:{
        type:String,
        unique:[true,"email should be unique by shri ji"],
        required:[true,"email should be required"],
    },
    password:{
        type:String,
        required:[true,"password is required"]
    }
})
const userModel=mongoose.model("users",userSchema);
module.exports=userModel;