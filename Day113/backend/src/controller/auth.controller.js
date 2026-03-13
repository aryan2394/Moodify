const userModel=require("../models/user.model.js");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const blacklistingModel=require("../models/blacklisting.model.js")
async function registerController(req,res)
{
    const {username,email,password}=req.body;
    // console.log(username,email,password);
    const isUserExist=await userModel.findOne({
        $or:[
            {
                email:email
            },
            {
                username:username
            }
        ]
    })
    if(isUserExist)
    {
        return res.status(409).json({
            "user":"user alread exist by shri ji",
            "shriji":isUserExist
        })
    }
    const hash=await bcrypt.hash(password,10);
    const user=await userModel.create({
        username,email,password:hash
    })
    const token=jwt.sign(
        {
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"3d"
        }
    )
    res.cookie("token",token);
    res.status(201).json({
        "user":"user register by shri ji",
        "shriji":{
            id:user._id,
            username:user.username,
            email:user.email,
        }
    })
}
async function loginController(req,res)
{
    const {email,username,password}=req.body;
    const userExist=await userModel.findOne({
        $or:[
            {
                email
            },
            {
                username
            }
        ]
    }).select("+password")
    if(!userExist)
    {
        return res.status(409).json({
            // "user":"not exist user by shri ji therefore first register"
            // hum kabhi bhi user not found aisa nahi bhjete hai uski jagah hum message bhejte hai invalid credentials WANT TO KNOW THE REASON 
            // SEE THE NOTES FOLDER 
            "user":"INVALID CREDENTAILS"
        })
    }
    const passwordCheck=await bcrypt.compare(password,userExist.password);
    if(!passwordCheck)
    {
        return res.status(401).json({
            // "user":"password is wrong by shri ji"
            "user":'INVALID CREDENTAILS'
        })
    }
    const token=jwt.sign(
        {
            id:userExist._id,
            username:userExist.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"3d"
        }
    )
    res.cookie("token",token);
    res.status(200).json({
        "user":"user login by shri ji",
        "shriji":{
            username:userExist.username,
            email:userExist.email,
        }
    })
}
async function getMeController(req,res)
{
    const user=await userModel.findById(req.user.id);
    res.status(200).json({
        "user":"user details by shri ji",
        "shriji":user
    })
}
async function logoutController(req,res)
{
    // sabse pahle cookies ko remove kardo browser se phir usko blacklisting mein daal do
    // pahle toh hum blacklsiting ke liye mongoose ka hi use karenge lekin baad mein hum uske liye redis ka use kar lenege
    const token=req.cookies.token;
    const blackListToken=await blacklistingModel.create({
        token
    })
    res.clearCookie("token");
    res.status(200).json({
        "user":"user logout successfully by shri ji"
    })
}
module.exports={
    registerController,
    loginController,
    getMeController,
    logoutController
}