const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register",async(req,res)=>{
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});

        if(user){
            const originPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
            const {password, ...others} = user._doc;
            const accessToken = jwt.sign(
                {id:user._id,isAdmin:user.isAdmin},
                process.env.JWT_SEC,
                {expiresIn:"3d"});
            (originPassword === req.body.password) && res.status(200).json({...others,accessToken});
        }
        else{
            res.status(401).json("Wrong username or password!");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router

// var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
// ​
// var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");