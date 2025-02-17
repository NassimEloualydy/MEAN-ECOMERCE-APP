const express=require("express")
const Router=express.Router();
const {submitCategory,getCategroyData,deleteCategory}=require("../controllers/categoryController")

Router.post("/submitcategory",submitCategory);
Router.post("/getCategroyData",getCategroyData);
Router.post("/deleteCategory",deleteCategory);

module.exports=Router;