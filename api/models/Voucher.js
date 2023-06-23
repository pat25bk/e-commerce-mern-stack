const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discription:{type:String},
    maxUseNumber:{type:Number},
    usedNumber:{type:Number},
    startDate:{type:Date},
    expireDate:{type:Date},
    type: { type: String, required: true},//Discount by amount or percentage
    value:{ type:Number, required:true},
    active:{type:Boolean},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voucher", VoucherSchema);