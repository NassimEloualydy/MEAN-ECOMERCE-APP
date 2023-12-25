const express=require("express");
const Router=express.Router();
const { submitQuatation,getDataQuatation,deleteQuatation,getProductQuatationBasket}=require('../controllers/quotationController');
Router.post("/submitQuatation",submitQuatation);
Router.post("/getDataQuatation",getDataQuatation);
Router.post("/deleteQuatation",deleteQuatation);
Router.post("/getProductQuatationBasket",getProductQuatationBasket);
module.exports=Router;
