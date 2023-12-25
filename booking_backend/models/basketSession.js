const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;
const basketSessionSchema=mongoose.Schema({
    product:{type:ObjectId,ref:"product",required:true},
    qte:{type:String,required:true},
    user:{type:ObjectId,ref:"User",required:true},
    status:{type:String,required:true},
    order:{type:ObjectId,ref:"Order",default: null},
},{timestamps:true})
module.exports=mongoose.model("basket",basketSessionSchema)
