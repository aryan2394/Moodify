const express=require("express");
const authRouter=express.Router();
const authController=require("../controller/auth.controller.js")
const authMiddleware=require("../middlewares/auth.middleware.js");
authRouter.post("/register",authController.registerController);
authRouter.post("/login",authController.loginController);
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController);
authRouter.post("/logout",authController.logoutController);
module.exports=authRouter;