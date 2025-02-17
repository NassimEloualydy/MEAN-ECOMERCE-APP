const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema;
const productSchema=mongoose.Schema({
    name:{type:String,required:true},
    price:{type:String,required:true},
    qte:{type:String,required:true},
    rating:{type:String,required:true},
    description:{type:String,required:true},
    photo_1:{data:Buffer,contentType:String},
    photo_2:{data:Buffer,contentType:String},
    photo_3:{data:Buffer,contentType:String},
    photo_4:{data:Buffer,contentType:String},
    photo_5:{data:Buffer,contentType:String},
    category:{type:ObjectId,ref:"Category",required:true}
},{timestamps:true})
module.exports=mongoose.model("Product",productSchema);