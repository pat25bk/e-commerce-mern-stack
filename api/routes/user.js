const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE
router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
  try{
    console.log(req.params.id);
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted succesfully!");
  }catch(err){
    res.status(500).json(err);
  }
});

//GET USER INFO
router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
  try{
    const user = await User.findById(req.params.id);
    const {password, ...others} = user._doc;
    res.status(200).json(others);
  }catch(err){
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
  try{
    const query = req.query.new;
    const user = (query==="true")
    ?await User.find().sort({_id:-1}).limit(5)
    :await User.find();
    res.status(200).json(user);
  }catch(err){
    res.status(500).json(err);
  }
});

//GET USER STATSTISTICS: the number of user was created each month in the last year

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
  try {
    const data = await User.aggregate([
      //Step1: Filter users was created from the last year
      { $match: { createdAt: { $gte: lastYear } } },
      //Step 2: Parser the month from the CreatedAt timestamp of users filted from Step1
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      //Step 3: Group filted users based on its month, then calculate the number of users in each group
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;