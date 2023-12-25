const Catgory=require("../models/category");
const Product=require("../models/product");
const formidable=require("formidable");
const joi=require("joi");
const fs=require("fs");
exports.addProduct=async (req,res)=>{
    console.log("hell");
}
exports.getCategories=async (req,res)=>{
 const categories=await Catgory.find().select();
 if(categories)
 return res.json({data:categories});
 return res.status(400).json({error:categories});
}
exports.submitProduct=async (req,res)=>{
 const form=new formidable.IncomingForm();
 form.keepExtensions=true;
 form.parse(req,async(err,fields,files)=>{
     const {_id,name,description,rating,category,price,qte}=fields;
    if(_id!=""){
            const schema=new joi.object({
                name:joi.string().required().messages({"string.empty":"Please the name is required !!","any.required":"Please the name is required !!"}),
                description:joi.string().required().messages({"string.empty":"Please the description is required !!","any.required":"Please the description is required !!"}),
                rating:joi.string().required().messages({"string.empty":"Please the rating is required !!","any.required":"Please the rating is required !!"}),
                price:joi.string().required().messages({"string.empty":"Please the price is required !!","any.required":"Please the price is required !!"}),
                category:joi.string().required().messages({"string.empty":"Please the category is required !!","any.required":"Please the category is required !!"}),
                qte:joi.string().required().messages({"string.empty":"Please the quantity is required !!","any.required":"Please the quantity is required !!"}),
    
            })
            const {error}=schema.validate({name,description,rating,category,price,qte});
            if(error){
                return res.status(400).json({error:error.destails[0].message});
            }
            
            var p=await Product.find().select("-photo -photo_1 -photo_2 -photo_3 -photo_4").and([{_id:{$ne:_id}},{name}])
            if(p.length!=0)
            return res.status(400).json({error:"Please the name is already exist !!"});
            
            var p=await Product.find().select("-photo -photo_1 -photo_2 -photo_3 -photo_4").and([{_id:{$ne:_id}},{description}])
            if(p.length!=0)
            return res.status(400).json({error:"Please the description is already exist !!"});
            var product=await Product.findOneAndUpdate(
                {_id},
                {
                    $set:{
                        name,description,rating,category,price,qte        
                    }
                },
                {new:true}
            )
            if(files.photo_1){
                product=await Product.findOneAndUpdate(
                    {_id},
                    {
                        $set:{
                            photo_1:{data:fs.readFileSync(files.photo_1.path),contentType:files.photo_1.type}
                        }
                    },
                    {new:true}
                )
            }
            if(files.photo_2){
                product=await Product.findOneAndUpdate(
                    {_id},
                    {
                        $set:{
                            photo_2:{data:fs.readFileSync(files.photo_2.path),contentType:files.photo_2.type}
                        }
                    },
                    {new:true}
                )
            }
            if(files.photo_3){
                product=await Product.findOneAndUpdate(
                    {_id},
                    {
                        $set:{
                            photo_3:{data:fs.readFileSync(files.photo_3.path),contentType:files.photo_3.type}
                        }
                    },
                    {new:true}
                )
            }
            if(files.photo_4){
                product=await Product.findOneAndUpdate(
                    {_id},
                    {
                        $set:{
                            photo_4:{data:fs.readFileSync(files.photo_4.path),contentType:files.photo_4.type}
                        }
                    },
                    {new:true}
                )
            }
            if(files.photo_5){
                product=await Product.findOneAndUpdate(
                    {_id},
                    {
                        $set:{
                            photo_5:{data:fs.readFileSync(files.photo_5.path),contentType:files.photo_5.type}
                        }
                    },
                    {new:true}
                )
            }
            
            if(product)
            return res.json({message:"Product Updated With Success"});
            return res.status(400).json({error:product});
    }else{
        if(files.photo_5 && files.photo_1 && files.photo_2 && files.photo_3 && files.photo_4){
            const schema=new joi.object({
                name:joi.string().required().messages({"string.empty":"Please the name is required !!","any.required":"Please the name is required !!"}),
                description:joi.string().required().messages({"string.empty":"Please the description is required !!","any.required":"Please the description is required !!"}),
                rating:joi.string().required().messages({"string.empty":"Please the rating is required !!","any.required":"Please the rating is required !!"}),
                price:joi.string().required().messages({"string.empty":"Please the price is required !!","any.required":"Please the price is required !!"}),
                category:joi.string().required().messages({"string.empty":"Please the category is required !!","any.required":"Please the category is required !!"}),
                qte:joi.string().required().messages({"string.empty":"Please the quantity is required !!","any.required":"Please the quantity is required !!"}),
    
            })
            const {error}=schema.validate({name,description,rating,category,price,qte});
            if(error){
                return res.status(400).json({error:error.destails[0].message});
            }
            
            var p=await Product.find({name}).select("-photo_5 -photo_1 -photo_2 -photo_3 -photo_4")
            if(p.length!=0)
            return res.status(400).json({error:"Please the name is already exist !!"});
            
            var p=await Product.find({description}).select("-photo_5 -photo_1 -photo_2 -photo_3 -photo_4")
            if(p.length!=0)
            return res.status(400).json({error:"Please the description is already exist !!"});
            
            var product=await Product.create({
                name,description,rating,category,price,qte,
                photo_5:{data:fs.readFileSync(files.photo_5.path),contentType:files.photo_5.type},
                photo_1:{data:fs.readFileSync(files.photo_1.path),contentType:files.photo_1.type},
                photo_2:{data:fs.readFileSync(files.photo_2.path),contentType:files.photo_2.type},
                photo_3:{data:fs.readFileSync(files.photo_3.path),contentType:files.photo_3.type},
                photo_4:{data:fs.readFileSync(files.photo_4.path),contentType:files.photo_4.type},
            });
            if(product)
            return res.json({message:"Product Added With Success"});
            return res.status(400).json({error:product});
        }else{  
            return res.status(400).json({error:"Please all the photos are required !!"});
        }
    }


 })   
}

exports.getDataProduct=async (req,res)=>{

  const {name,description,rating,category,price,qte}=req.body;
  const searchQuery={}
  searchQuery.name={$regex:'.*'+name+'.*',$options:'i'};
  searchQuery.description={$regex:'.*'+description+'.*',$options:'i'};
  searchQuery.rating={$regex:'.*'+rating+'.*',$options:'i'};
  searchQuery.price={$regex:'.*'+price+'.*',$options:'i'};
  searchQuery.qte={$regex:'.*'+qte+'.*',$options:'i'};
  const products=await Product.find(searchQuery).populate(
    [
        {
            path:"category",
            model:"Catgory",
            select:["name","description"],
            match:{
                name:{$regex:'.*'+category+'.*',$options:'i'}
            }
        }
    ]
  ).select("-photo -photo_1 -photo_2 -photo_3 -photo_4");
  if(products)
  return res.json({products})
  return res.status(400).json({error:products});
  
}
exports.getMainImage= async (req,res)=>{
    const _id=req.params.id;
    // console.log(_id);
    const p=await Product.findOne({_id});
    const {data,contentType}=p.photo_1;
    res.set("contentType",contentType);
    return res.send(data);
}
exports.deleteProduct=async (req,res)=>{
    const {_id}=req.body;
    const p=await Product.findOneAndDelete({_id});
    if(p)
    return res.json({message:"Deleted with success"});
    return res.status(400).json({err:p});
}
exports.getProductInfo=async (req,res)=>{
    const {_id}=req.body;
    console.log(_id)
    const p=await Product.find({_id}).populate(
        [{
            path:"category",
            model:"Catgory",
            select:["name","description"]
        }]
    ).select("-photo_1 -photo_2 -photo_3 -photo_4 -photo_5")
    if(p)
    return res.json({product:p})
    return res.status(400).json({error:p})
}

exports.getImageProduct_2= async (req,res)=>{
    const _id=req.params.id;
    // console.log(_id);
    const p=await Product.findOne({_id});
    const {data,contentType}=p.photo_2;
    res.set("contentType",contentType);
    return res.send(data);
}
exports.getImageProduct_3= async (req,res)=>{
    const _id=req.params.id;
    // console.log(_id);
    const p=await Product.findOne({_id});
    const {data,contentType}=p.photo_3;
    res.set("contentType",contentType);
    return res.send(data);
}
exports.getImageProduct_4= async (req,res)=>{
    const _id=req.params.id;
    // console.log(_id);
    const p=await Product.findOne({_id});
    const {data,contentType}=p.photo_4;
    res.set("contentType",contentType);
    return res.send(data);
}
exports.getImageProduct_5= async (req,res)=>{
    const _id=req.params.id;
    // console.log(_id);
    const p=await Product.findOne({_id});
    const {data,contentType}=p.photo_5;
    res.set("contentType",contentType);
    return res.send(data);
}

exports.getProductsQutation=async(req,res)=>{
    const {name,offset}=req.body;
    const searchQuery={}
    searchQuery.name={$regex:'.*'+name+'.*',$options:'i'};
    const Products=await Product.find(searchQuery).select("-photo_1 -photo_2 -photo_3 -photo_4 -photo_5").limit(6).skip(offset) 
    if(Products)
    return res.json({Products});
    return res.status(400).json({error:Products});
}