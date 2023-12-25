const express=require("express");
const Router=express.Router();
const {getToken}=require("../controllers/paiment")
Router.post("/getTokenPaiment",getToken)
module.exports=Router
