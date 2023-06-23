const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String },
    products: [
      {
        productId: {
          type: String,
        },
        size:{type:String},
        color:{type:String},
        price:{type:Number},
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    total:{type:Number,required:true},
    shippingFee:{type:Number,required:true},
    discount:{type:Number,required:true},
    amount: { type: Number, required: true},
    name:{type:String,required:true},
    phone:{type:String,required:true},
    email:{type:String,required:true},
    address: { type: Object, required: true},
    paymentMethod:{type:String, required:true},
    paymentStatus:{type:Boolean,default:false},
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);