const User=require("../models/user");
const joi=require("joi");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
const formidable=require("formidable");
const {generateToken}=require("../utils/generateToken");
const fs=require("fs");
exports.login= async (req,res)=>{
    const schema=new joi.object({
        email:joi.string().required().messages({"any.required":"Please the email is required","string.empty":"Please the email is required !!"}),
        password:joi.string().required().messages({"any.required":"Please the password is required","string.empty":"Please the password is required !!"}),
    });
const {email,password}=req.body;
const {error}=schema.validate({email,password});
if(error){
    return res.status(400).json({err:error.details[0].message});
}
const u=await User.findOne({email}).select("-photo");
if(!u)
return res.status(400).json({err:"Please the email is not found !!"});
if(await u.matchPassword(password))
return res.json({u,token:generateToken(u.id)});
return res.status(400).json({err:"Please password doesn't match the login !!"})
}
exports.submitUser=async (req,res)=>{
const form=formidable.IncomingForm();
form.keepExtensions=true;
form.parse(req,async (err,fields,files)=>{
    
    const {_id,cni,first_name,last_name,role,email,password,tel}=fields;
    if(_id!=""){
        const schema=new joi.object({
            cni:joi.string().required().messages({"string.empty":"Please the cni is required !!","any.required":"Please the cni is required !!"}),
            first_name:joi.string().required().messages({"string.empty":"Please the first name is required !!","any.required":"Please the first name is required !!"}),
            last_name:joi.string().required().messages({"string.empty":"Please the last name is required !!","any.required":"Please the last name is required !!"}),
            role:joi.string().required().messages({"string.empty":"Please the role is required !!","any.required":"Please the role is required !!"}),
            email:joi.string().required().messages({"string.empty":"Please the email is required !!","any.required":"Please the email is required !!"}),
            password:joi.string().required().messages({"string.empty":"Please the password is required !!","any.required":"Please the password is required !!"}),
            tel:joi.string().required().messages({"string.empty":"Please the phone is required !!","any.required":"Please the phone is required !!"}),
    
        })
        const {error}=schema.validate({cni,first_name,last_name,role,email,password,tel})
        if(error)
        return res.status(400).json({error:error.details[0].message});
        
        var user=await User.find().and([{_id:{$ne:_id}},{cni}]).select("-photo")
        if(user.length!=0)
        return res.status(400).json({error:"Please the cni is already exist !!"})
        
        user=await User.find().select("-photo").and([{_id:{$ne:_id}},{first_name,last_name}])
        if(user.length!=0)
        return res.status(400).json({error:"Please the first name and last name is already exist !!"})
        
        user=await User.find().and([{_id:{$ne:_id}},{tel}]).select("-photo")
        if(user.length!=0)
        return res.status(400).json({error:"Please the phone is already exist !!"})
        
        user=await User.find().and([{email},{_id:{$ne:_id}}]).select("-photo")
        if(user.length!=0)
        return res.status(400).json({error:"Please the email is already exist !!"})
        
        const salt=await bcryptjs.genSalt(10);
        password_new=await bcryptjs.hash(password,salt);
    
        var u=await User.findOneAndUpdate(
            {_id},
            {$set:{cni,first_name,last_name,email,password:password_new,role,tel,status:"disconnected"
            
            }},{new:true}
        )
        if(files.photo){
            u=await User.findOneAndUpdate(
                {_id},
                {$set:{
                    photo:{data:fs.readFileSync(files.photo.path),contentType:files.photo.type}
                }},{
                    new:true
                }
            )
        }
        if(u)
        return res.json({message:"Updated With Success !!"});
        return res.status(400).json({error:u});
    }else{

        if(!files.photo){
            return res.status(400).json({error:"Please the photo is required !!"});
        }
        const schema=new joi.object({
            cni:joi.string().required().messages({"string.empty":"Please the cni is required !!","any.required":"Please the cni is required !!"}),
            first_name:joi.string().required().messages({"string.empty":"Please the first name is required !!","any.required":"Please the first name is required !!"}),
            last_name:joi.string().required().messages({"string.empty":"Please the last name is required !!","any.required":"Please the last name is required !!"}),
            role:joi.string().required().messages({"string.empty":"Please the role is required !!","any.required":"Please the role is required !!"}),
            email:joi.string().required().messages({"string.empty":"Please the email is required !!","any.required":"Please the email is required !!"}),
            password:joi.string().required().messages({"string.empty":"Please the password is required !!","any.required":"Please the password is required !!"}),
            tel:joi.string().required().messages({"string.empty":"Please the phone is required !!","any.required":"Please the phone is required !!"}),
    
        })
        const {error}=schema.validate({cni,first_name,last_name,role,email,password,tel})
        if(error)
        return res.status(400).json({error:error.details[0].message});
        
        var user=await User.find({cni}).select("-photo")
        if(user.length!=0)
        return res.status(400).json({error:"Please the cni is already exist !!"})
        
        user=await User.find().select("-photo").and([{first_name,last_name}])
        if(user.length!=0)
        return res.status(400).json({error:"Please the first name and last name is already exist !!"})
        
        user=await User.find({tel}).select("-photo")
        if(user.length!=0)
        return res.status(400).json({error:"Please the phone is already exist !!"})
        
        user=await User.find({email}).select("-photo")
        if(user.length!=0)
        return res.status(400).json({error:"Please the email is already exist !!"})
        
        const salt=await bcryptjs.genSalt(10);
        password_new=await bcryptjs.hash(password,salt);
    
        const u=await User.create(
            {cni,first_name,last_name,email,password:password_new,role,tel,status:"disconnected"
            ,photo:{data:fs.readFileSync(files.photo.path),contentType:files.photo.type}
            }
        )
        if(u)
        return res.json({message:"Added With Success !!"});
        return res.status(400).json({error:u});
    }
    
})
}
exports.getDataUser=async (req,res)=>{
    const {cni,first_name,offset,last_name,email,tel,role}=req.body;
    const searchQuery={};
    searchQuery.first_name={$regex:'.*'+first_name+'.*',$options:'i'};
    searchQuery.last_name={$regex:'.*'+last_name+'.*',$options:'i'};
    searchQuery.email={$regex:'.*'+email+'.*',$options:'i'};
    searchQuery.tel={$regex:'.*'+tel+'.*',$options:'i'};
    searchQuery.role={$regex:'.*'+role+'.*',$options:'i'};
    searchQuery.cni={$regex:'.*'+cni+'.*',$options:'i'};
    const users=await User.find(searchQuery).select("-photo").limit(6).skip(offset);
    if(users)
    return res.json({users});
    return res.status(400).json({error:users});
}
exports.deleteUse=async (req,res)=>{
    const {_id}=req.body;
    const user=await User.findByIdAndDelete({_id});
    if(user)
    return res.json({message:"Deleted with success"});
    return res.status(400).json({error:user});
}
exports.getPhotoUser=async (req,res)=>{
    const _id=req.params.id;
    const u=await User.findOne({_id});
    const {data,contentType}=u.photo;
    res.set("contentType",contentType);
    return res.send(data);
}
exports.getSuppliers=async (req,res)=>{
    const suppliers=await User.find({role:'Supplier'}).select("-photo");
    if(suppliers)
    return res.json({suppliers});
    return res.status(400).json({error:suppliers});
}