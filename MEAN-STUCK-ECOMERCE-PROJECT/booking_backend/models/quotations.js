const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema;
const quotationsSchema=mongoose.Schema({
    supplier:{type:ObjectId,ref:"User",required:true},
    date_quotation:{type:String,required:true},
    status:{type:String,required:true},
    delevery_address:{type:String,required:true},
    delevery_date:{type:String,required:true},
    price_totale:{type:String,required:true}

},{timestamps:true})
module.exports=mongoose.model("Quotation",quotationsSchema);
