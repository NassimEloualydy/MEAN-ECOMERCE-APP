const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema
const orderSchema=mongoose.Schema({
    user:{type:ObjectId,ref:"User",required:true},
    status:{type:String,required:true},
    is_deliverd:{type:String,required:true},
    date_deleverd:{type:String,default:""},
},{timestamps:true})
module.exports=mongoose.model("Order",orderSchema);


