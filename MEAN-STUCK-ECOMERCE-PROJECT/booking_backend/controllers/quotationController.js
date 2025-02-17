const joi=require('joi');
const Quotation=require('../models/quotations');
const quatationDetails = require('../models/quatationDetails');
const Product=require("../models/product");
exports.submitQuatation=async (req,res)=>{
    const {basketQuatation,priceTotalOfAcotation
        ,supplier,
        status,
        deleverd_addresse,
        delevered_date,
        dateQuatation,
        _id
    }=req.body;
    if(_id!=""){
        const schema=new joi.object({
            "supplier":joi.string().required().messages({"string.empty":"Please the supplier is required !!","any.required":"Please the supplier is required !!"}),
            "status":joi.string().required().messages({"string.empty":"Please the status is required !!","any.required":"Please the status is required !!"}),
            "deleverd_addresse":joi.string().required().messages({"string.empty":"Please the delevered address is required !!","any.required":"Please the delevered address is required !!"}),
            "delevered_date":joi.string().required().messages({"string.empty":"Please the delevered date is required !!","any.required":"Please the delevered date is required !!"}),
            "dateQuatation":joi.string().required().messages({"string.empty":"Please the date is required !!","any.required":"Please the date is required !!"}),
    
        })
        const {error}=schema.validate({
            supplier,
            status,
            deleverd_addresse,
            delevered_date,
            dateQuatation
        })
        if(error)
        return res.status(400).json({error:error.details[0].message});
        if(basketQuatation.length==0)
        return res.status(400).json({error:"Please you need at least to add one product !!"});
    
        if(priceTotalOfAcotation==0)
        return res.status(400).json({error:"Please you need at least to add one product in the qte !!"});

        const quot=await Quotation.findOneAndUpdate({_id},{
            $set:{
                supplier,date_quotation:dateQuatation,status:status,
                delevery_address:deleverd_addresse,delevery_date:delevered_date,
                price_totale:priceTotalOfAcotation
    
            }
        },
        {
            new:true
        }
        )
        if(!quot)
        return res.status(400).json({error:quot})
        var qd=null;
        const basket=await quatationDetails.deleteMany({quotation:_id})
        if(!basket)
        return res.status(400).json({error:basket})
        for(i=0;i<basketQuatation.length;i++){
            qd=await quatationDetails.create({
                quotation:quot._id,
                product:basketQuatation[i]._id,
                qte:basketQuatation[i].qte,
                price:basketQuatation[i].price
            })

            if(!qd){
                return res.status(400).json({error:qd});
            }
            console.log(status)
            if(status=="Confirmed"){
                console.log(status)

             var p=await Product.findOne({_id:basketQuatation[i]._id})
             var product=await Product.findOneAndUpdate(
                {_id:basketQuatation[i]._id},
                {
                    $set:{qte:parseInt(basketQuatation[i].qte)+parseInt(p.qte)}
                },
                {new:true}
                ) 
            }
        }
        return res.json({message:"Quatation Updated With Success !!"});
    }else{

        const schema=new joi.object({
            "supplier":joi.string().required().messages({"string.empty":"Please the supplier is required !!","any.required":"Please the supplier is required !!"}),
            "status":joi.string().required().messages({"string.empty":"Please the status is required !!","any.required":"Please the status is required !!"}),
            "deleverd_addresse":joi.string().required().messages({"string.empty":"Please the delevered address is required !!","any.required":"Please the delevered address is required !!"}),
            "delevered_date":joi.string().required().messages({"string.empty":"Please the delevered date is required !!","any.required":"Please the delevered date is required !!"}),
            "dateQuatation":joi.string().required().messages({"string.empty":"Please the date is required !!","any.required":"Please the date is required !!"}),
    
        })
        const {error}=schema.validate({
            supplier,
            status,
            deleverd_addresse,
            delevered_date,
            dateQuatation
        })
        if(error)
        return res.status(400).json({error:error.details[0].message});
        if(basketQuatation.length==0)
        return res.status(400).json({error:"Please you need at least to add one product !!"});
    
        if(priceTotalOfAcotation==0)
        return res.status(400).json({error:"Please you need at least to add one product in the qte !!"});
        const quot=await Quotation.create({
            supplier,date_quotation:dateQuatation,status:status,
            delevery_address:deleverd_addresse,delevery_date:delevered_date,
            price_totale:priceTotalOfAcotation
        })
        if(!quot)
        return res.status(400).json({error:quot})
        var qd=null;
        for(i=0;i<basketQuatation.length;i++){
            qd=await quatationDetails.create({
                quotation:quot._id,
                product:basketQuatation[i]._id,
                qte:basketQuatation[i].qte,
                price:basketQuatation[i].price
            })
            if(status=="Confirmed"){
                var p=await Product.findOne({_id:basketQuatation[i]._id})
                var product=await Product.findOneAndUpdate(
                   {_id:basketQuatation[i]._id},
                   {
                       $set:{qte:parseInt(basketQuatation[i].qte)+parseInt(p.qte)}
                   },
                   {new:true}
                   ) 
               }
   
            if(!qd){
                return res.status(400).json({error:qd});
            }
        }
        return res.json({message:"Quatation Addedd With Success !!"});
    }


}
exports.getDataQuatation=async (req,res)=>{
    const {FirstNamesupplierSearch,
        LastNamesupplierSearch,
  dateQuatation,
  deleveredDate,
  address,
  priceTotalSearch,
  offsetQuatation,
  status}=req.body;
  const searchQuery={};
  searchQuery.date_quotation={$regex:'.*'+dateQuatation+'.*',$options:'i'}
  searchQuery.status={$regex:'.*'+status+'.*',$options:'i'}
  searchQuery.delevery_address={$regex:'.*'+address+'.*',$options:'i'}
  searchQuery.delevery_date={$regex:'.*'+deleveredDate+'.*',$options:'i'}
  searchQuery.price_totale={$regex:'.*'+priceTotalSearch+'.*',$options:'i'}

  const quatations=await Quotation.find(searchQuery).populate(
    [
        {
            path:"supplier",
            model:"User",
            select:["_id","first_name","last_name"],
            match:{
                first_name:{$regex:'.*'+FirstNamesupplierSearch+'.*',$options:'i'},
                last_name:{$regex:'.*'+LastNamesupplierSearch+'.*',$options:'i'},
            }
        }
    ]
  ).limit(6).skip(offsetQuatation)
  if(quatations)
  return res.json({quatations})
  return res.status(400).json({error:quatations});
  
}
exports.deleteQuatation=async (req,res)=>{
    const {_id}=req.body;
    const q=await Quotation.findOneAndDelete({_id});
    if(q)
    return res.json({message:"Delete with success"})
    return res.status(400).json({error:q});
}
exports.getProductQuatationBasket=async (req,res)=>{
    const {_id}=req.body;
    const basket=await quatationDetails.find({quotation:_id}).populate(
        [{
            path:"product",
            model:"Product",
            select:["_id","name","price","qte","rating","description"]
        }]
    )
    if(basket)
    return res.json({basket});
    return res.status(400).json({error:basket});
}