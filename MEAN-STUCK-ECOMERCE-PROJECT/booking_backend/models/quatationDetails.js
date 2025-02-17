const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema
const quatationDetails=mongoose.Schema({
    quotation:{type:ObjectId,ref:"Quotation",required:true},
    product:{type:ObjectId,ref:"Product",required:true},    
    qte:{type:String,required:true},
    price:{type:String,required:true}

},{timestamps:true})

module.exports=mongoose.model("QuotationDetails",quatationDetails);
