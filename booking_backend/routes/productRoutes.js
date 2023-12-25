const express=require("express");
const Router=express.Router();
const {addProduct,getCategories,getProductInfo,getImageProduct_2,getImageProduct_3,getImageProduct_4,getImageProduct_5,submitProduct,getDataProduct,getMainImage,deleteProduct,getProductsQutation}=require("../controllers/productController");

Router.post("/addProduct",addProduct);
Router.post("/getCategories",getCategories);
Router.post("/submitProduct",submitProduct);
Router.post("/getDataProduct",getDataProduct);
Router.post("/deleteProduct",deleteProduct);
Router.post("/getProductInfo",getProductInfo);
Router.get("/getMainImage/:id",getMainImage);
Router.get("/getImageProduct_1/:id",getMainImage);
Router.get("/getImageProduct_2/:id",getImageProduct_2);
Router.get("/getImageProduct_3/:id",getImageProduct_3);
Router.get("/getImageProduct_4/:id",getImageProduct_4);
Router.get("/getImageProduct_5/:id",getImageProduct_5);
Router.post("/getProductsQutation",getProductsQutation);




module.exports=Router
