const jwt=require("jsonwebtoken")
exports.generateToken=(id)=>{
    require("dotenv").config();
    return jwt.sign({id},process.env.JWT_SECRETE,{
        expiresIn:'30d'
    })

}