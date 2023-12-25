const joi=require("joi");
const Catgory=require("../models/category");
require("dotenv").config();

exports.submitCategory= async (req,res)=>{
    const {_id,name,description}=req.body;
    const schema=new joi.object({
        "name":joi.string().required().messages({"string.empty":"Please the name is required !!","any.required":"Please the name is required !!"}),
        "description":joi.string().required().messages({"string.empty":"Please the description is required !!","any.required":"Please the description is required !!"}),
    })
    const {error}=schema.validate({name,description});
    if (error)
    return res.status(400).json({err:error.details[0].message})
    if(_id==""){
        //add new
    
        var c=await Catgory.find({name}).select();
        if(c.length!=0)
        return res.status(400).json({error:"Please the name is already exist !!"})
    
    
        var c=await Catgory.find({description}).select();
        if(c.length!=0)
        return res.status(400).json({error:"Please the description is already exist !!"})
        const cate=await Catgory.create({
            name,description
        });
        if(cate)
        return res.json({message:"Created with success !!"});
        return res.status(400).json({error:cate});
    }else{
        //update
        var c=await Catgory.find().and([{_id:{$ne:_id}},{name}]).select();
        if(c.length!=0)
        return res.status(400).json({error:"Please the name is already exist !!"})
    
    
        var c=await Catgory.find().and([{_id:{$ne:_id}},{description}]).select();
        if(c.length!=0)
        return res.status(400).json({error:"Please the description is already exist !!"})
        category=await Catgory.findOneAndUpdate(
            {_id},
            {
                $set:{
                    name,
                    description
                }
            }
        ,{
            new:true
        });
        if(category)
        return res.json({message:"Updated with success"});
        return res.status(400).json({error:cate});
    }

}
exports.getCategroyData=async (req,res)=>{
    const {name,description,offset}=req.body;
    const searchQuery={}
    searchQuery.name={$regex:'.*'+name+'.*',$options:'i'};   
    searchQuery.description={$regex:'.*'+description+'.*',$options:'i'};   
    const data=await Catgory.find(searchQuery).select().limit(6).skip(offset);
    if(data)
    return res.json({data})
    return res.status(400).json({err:data});

}
exports.deleteCategory=async (req,res)=>{
    const {id}=req.body;
    const c=await Catgory.findByIdAndDelete({_id:id});
    if(c)
    return res.json({message:"Deleted with success"})
    return res.status(400).json({err:c})
}