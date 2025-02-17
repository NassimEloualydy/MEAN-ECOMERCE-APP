const express=require("express");
const Router=express.Router();
const {makeOrder,getDataOrder,updateOrder,get_the_most_selling_product,get_data_cards}=require("../controllers/orderController");

Router.post("/makeOrder",makeOrder);
Router.post("/getDataOrder",getDataOrder);
Router.post("/updateOrder",updateOrder);
Router.post("/get_the_most_selling_product",get_the_most_selling_product)
Router.post("/get_data_cards",get_data_cards);
module.exports=Router
