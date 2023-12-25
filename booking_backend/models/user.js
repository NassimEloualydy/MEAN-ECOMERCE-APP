const mongoose=require("mongoose");
const bcryptjs=require("bcryptjs");
const userSchema=mongoose.Schema({
    photo:{data:Buffer,contentType:String},
    cni:{type:String,required:true},
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    role:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    tel:{type:String,required:true},
    role:{type:String,required:true},
    status:{type:String,required:true}
},{timestamps:true});
userSchema.methods.matchPassword=async function(enter_password){
    return await bcryptjs.compare(enter_password,this.password);
} 
userSchema.pre("save",async function(next){
 if(!this.isModified('password')){
    next();
    const salt=await bcryptjs.genSalt(10);
    this.password=await bcryptjs.hash(this.password,salt);
 }
});
module.exports=mongoose.model("User",userSchema);