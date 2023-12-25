const express=require("express");
const Router=express.Router()
const {submitBasket,getBasket,addOneProductToBasket}=require("../controllers/basketController");
Router.post("/submitBasket",submitBasket);
Router.post("/getBasket",getBasket);
Router.post("/addOneProductToBasket",addOneProductToBasket)
module.exports=Router;
