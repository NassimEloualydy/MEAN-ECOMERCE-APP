const express=require("express");
const Router=express.Router();
const {login,submitUser,getDataUser,deleteUse,getPhotoUser,getSuppliers}=require("../controllers/userController");
Router.post("/login",login);
Router.post("/submitUser",submitUser);
Router.post("/getDataUser",getDataUser);
Router.post("/deleteUse",deleteUse);
Router.get("/getPhotoUser/:id",getPhotoUser)
Router.post("/getsuppliers",getSuppliers);

module.exports=Router;
