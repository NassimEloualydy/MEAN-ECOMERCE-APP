const Order=require("../models/order");
const Basket=require("../models/basketSession");
const Product=require("../models/product");
const User=require("../models/user");

const { json } = require("express");
exports.makeOrder=async (req,res)=>{
const {user,basket}=req.body;
const o=await Order.create({
    user:user._id,
    status:"In Progress",
    is_deliverd:"false",
})
// if(!o)
// return res.status(400).json({error:o})
var basket_order=null;
var p=null;
const basket_user=await Basket.find().populate([
    {
        path:"user",
        model:"User",
        select:["_id","first_name","last_name"]
    },
    {
        path:"product",
        model:"Product",
        select:["_id","name","price"]
    }
]).select().and([{user},{status:"In Progress"}])

for(i=0;i<basket_user.length;i++){
    basket_order=await Basket.findOneAndUpdate(
        {_id:basket_user[i]._id},
        {
            $set:{
                order:o._id,
                status:"Confirmed"
            }
        },
        {new:true}
        )
        if(!basket_order)
        return res.status(400).json({error:basket_order})
    qte=await Product.findOne({_id:basket_user[i].product._id}).qte
    
    qte_new=parseInt(qte)-parseInt(basket[i].qte)
    
    p=await Product.findOneAndUpdate(
        {_id:basket_user[i].product._id},
        {$set:{qte:qte_new}},
        {new:true}
        )
    if(!p)
    return res.status(400).json({error:p})
}
 return res.json({message:"Order make with success !!"})
}

exports.getDataOrder=async (req,res)=>{
    // first_name: '1',
    // last_name: '2',
    // date_delivered: '3',
    // status: '4',
    // qte: '5',
    // product: '6'
    const {first_name,last_name,date_delivered,status,qte,product}=req.body;
    console.log(req.body)
    const searchQuery={}
    searchQuery.qte={$regex:'.*'+qte+'.*',$options:'i'}
    searchQuery.status={$regex:'.*'+status+'.*',$options:'i'}
    //searchQuery.date_deleverd={$regex:'.*'+date_delivered+'.*',$options:'i'}
    const orders=await Basket.find(searchQuery)
    .populate(
        [
            {
                path:"product",
                model:"Product",
                select:["name","description","rating","price"],
                match:{
                    name:{$regex:'.*'+product+'.*',$options:'i'},
                }
            },
            {
                path:"user",
                model:"User",
                select:["_id","first_name","last_name"],
                match:{
                    first_name:{$regex:'.*'+first_name+'.*',$options:'i'},
                    last_name:{$regex:'.*'+last_name+'.*',$options:'i'},
                }

            },
            {
                path:"order",
                model:"Order",
                select:["status","_id","is_deliverd"],
                match:{
                    
                }
            }
        ]
    )
    .select()
    if(orders)
    return res.json({orders})
    return res.status(400).json({error:orders})
    // const orders=await Order.
}
exports.updateOrder=async (req,res)=>{

    const {_id,field_updated}=req.body;
    if(field_updated=="Delevered"){
        const order=await Order.updateMany(
            {_id},
            {$set:{
                is_deliverd:"True"
            }
        },
        {new:true} 

        )
        if(order)
        return res.json({message:"Order Delivered with success !!"})
        return res.status(400).json({error:order})
    }
    if(field_updated=="Confirmed"){ 
        const order=await Order.updateMany(
            {_id},
            {
                $set:{
                    status:"Confirmed"
                }
            },
            {
                new:true
            }
        )
    if(!order)
    return res.status(400).json({error:order})
    return res.json({message:"Order Confirmed With success !!"})

    }

}
exports.get_the_most_selling_product=async (req,res)=>{
    const basket=await Basket.aggregate([{
        $group:{
            _id:"$product",
           count:{$sum:1}}
    }
    ,
    {
        $lookup: {
            from: "products",  // Replace "products" with the actual name of your Product collection
            localField: "_id",
            foreignField: "_id",
            as: "product_b"
        }
    },{
        $project:{
            "_id":1,
            "count":1,
            "product_b.name":1,
        }
    }
]);
if(basket)
    return res.json({products:basket})
    return res.status(400).json({error:basket})
}
exports.get_data_cards=async (req,res)=>{
    const clients=await User.find({role:"Client"})
    const orders_confirmed=await Order.find({status:"Confirmed"})
    const orders_delevered=await Order.find({is_deliverd:"true"})
    const orders=await Order.find().select([""])

}