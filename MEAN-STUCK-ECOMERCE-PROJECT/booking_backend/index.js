const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
require("dotenv").config();

const app=express();
const PORT=process.env.PORT || 5000;

const userRoures=require("./routes/userRoutes");
const categoryRoutes=require("./routes/categoryRoutes");
const productRouter=require("./routes/productRoutes");
const quotationRoutes=require("./routes/quotationRoutes");
const basketRoutes=require("./routes/basketRoutes");
const piamentRoutes=require("./routes/routesPaiment")
const orderRoutes=require("./routes/orderRoutes");
app.use(cors());
app.use(express.json());

app.use("/API/user",userRoures);
app.use("/API/category",categoryRoutes);  
app.use("/API/product",productRouter);
app.use("/API/qautation",quotationRoutes);
app.use("/API/basket",basketRoutes);
app.use("/API/paiment",piamentRoutes);
app.use("/API/order",orderRoutes);


const DATABASE=process.env.DATABASE
;
mongoose.connect(DATABASE).then(()=>{
    console.log(`connected`);

}).catch(err=>console.log(err));

app.listen(PORT,()=>{
    console.log(`app listen on port ${PORT}`)
})