const Voucher = require("../models/Voucher");

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");

const router = require("express").Router();

//CREATE ORDER
router.post("/",verifyToken,async(req,res)=>{
    const newVoucher = new Voucher(req.body);
    try{
      const voucher = await newVoucher.save();
      res.status(200).json(voucher);
    }catch(err){
      res.status(500).json(err);
    }
  });
  
  //UPDATE
  router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
      try {
        const updatedVoucher = await Voucher.findOneAndUpdate(
          {code:req.params.id},
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedVoucher);
      } catch (err) {
        res.status(500).json(err);
      }
    });
    
    //DELETE
    router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
      try{
        console.log(req.params.id);
        await Voucher.findOneAndDelete({code:req.params.id});
        res.status(200).json("Voucher has been deleted succesfully!");
      }catch(err){
        res.status(500).json(err);
      }
    });
    
    //Get voucher info
    router.get("/find/:id",async(req,res)=>{
      try{
        const voucher = await Voucher.find({code:req.params.id});
        res.status(200).json(voucher);
      }catch(err){
        res.status(500).json(err);
      }
    });

    module.exports = router;