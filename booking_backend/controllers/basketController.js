const Product=require("../models/product");
const User=require("../models/user");
const Basket=require("../models/basketSession");
exports.submitBasket=async (req,res)=>{
    const basketUser=req.body;
    var b=null
    const basket_deleted=await Basket.deleteMany({
        user:basketUser[0].user_id,
        status:'In Progress'
    })
    if(!basket_deleted)
    return res.status(400).json({error:basket_deleted});
    
    for(i=0;i<basketUser.length;i++){
     b=await Basket.create({
        product:basketUser[i]._id,
        qte:basketUser[i].qte,
        user:basketUser[i].user_id,
        status:'In Progress'
     })
     if(!b)
     return res.status(400).json({error})

    }
    return res.json({message:"Product add to basket with success !!"});
}
exports.getBasket=async (req,res)=>{
    const {user}=req.body;
    const basket=await Basket.find().populate([
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
    if(basket)
    return res.json({basket})
    return res.status(400).json({error:basket})
}
exports.addOneProductToBasket=async (req,res)=>{
    const {name,price,qte,price_qte,user_id,_id}=req.body;
    const basket=await Basket.find().select().and([{user: user_id},{product:_id},{status:'In Progress'}])
    if(basket.length==1){
        qte_new=parseInt(qte)+parseInt(basket[0].qte)
        const basket_udpdated=await Basket.updateOne(
            {user:user_id,product:_id,status:"In Progress"},
            {qte:qte_new}
        )
        if(basket_udpdated)
        return res.json({message:"Product added to the basket with success"})
        return res.status(400).json({error:basket_udpdated})
    }else{
        const b=await Basket.create({
            product:_id,
            qte:qte,
            user: user_id,
            status:'In Progress'
        })
        if(b)
        return res.json({message:"Product Add To Basket with success "})
        return res.status(400).json({error:b})
    }
}