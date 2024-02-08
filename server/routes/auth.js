const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const corsMiddleware = require("../middleWares/corsMiddleware")

router.post("/register", corsMiddleware, async(req,res)=>{
    
    try{
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        })
        const user = await newUser.save();
        res.status(201).json(user);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});


router.post("/login", corsMiddleware, async(req,res)=>{
    
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(401).json("Wrong credentials");
        }
        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);   

        originalPassword !== req.body.password && res.status(401).json("Wrong credentials");
        const { password, ...info } = user._doc;

        const accessToken = jwt.sign(
            {id: user._id}, 
            process.env.SECRET_KEY,
        );

        res.cookie("jwt",accessToken,{
            httpOnly: true,
            sameSite: 'none',
            secure: true
        }); 

        res.status(200).json({...info});
    }catch(err){
        res.status(501).json({error: err.message});
    }
})


module.exports = router;