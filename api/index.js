const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const voucherRoute = require("./routes/voucher");
// const bodyParser = require("body-parser");
const crypto = require("crypto-js");

const app = express();
dotenv.config();
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.use(express.json())

mongoose.set('strictQuery', false);
const mongoLink = "mongodb://127.0.0.1:27017/eShopDB";
mongoose.connect(mongoLink).then(()=>{console.log("Connect successfully to Atlas")}).catch((err)=>{console.log(err)});

function _1stMiddleWare(req,res,next){
  console.log("Executing first MW");
  next();
}

function _2ndMiddleWare(req,res,next){
  console.log("Executing second MW");
  next();
}

app.get("/",(req,res)=>{
  res.send("Hello World");
})

app.use(cors());
app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/product",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/order",orderRoute);
app.use("/api/stripe",stripeRoute);
app.use("/api/voucher",voucherRoute);

app.listen(5000, function(){
  console.log("Server starting at port 5000");
})