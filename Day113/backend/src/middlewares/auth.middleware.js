const jwt=require("jsonwebtoken");
const blacklistingModel=require("../models/blacklisting.model.js")
async function authUser(req,res,next)
{
    const token=req.cookies.token;
    // maanlo token expire ho gaya because humne xpires in lagaya hai taaki hum check kar sakte hai ki token expre toh nahi ho gaya hai
    if(!token)
    {
        return res.status(401).json({
            "user":"user not have a token by shri ji "
        })
    }
    const isTokenBlacklisted=await blacklistingModel.findOne({token});
    if(isTokenBlacklisted)
    {
        return res.status(401).json({
            "user":"Invalid token"
        })
    }
    try {
        const payload=await jwt.verify(token,process.env.JWT_SECRET);
        req.user=payload;
        next();
    } catch (error) {
        return res.status("invalid credentials by shri ji")
    }
}
module.exports={
    authUser
}