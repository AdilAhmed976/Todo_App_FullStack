const {Router} = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {UserModel} = require("../model/User.model")

const userController = Router()

const { validator } = require("../middlewares/validator");
const { validatorLogin } = require("../middlewares/validatorLogin");

userController.post("/signup", validator,(req,res) => {
    const {email,password} = req.body
    bcrypt.hash(password,5, async function (err,hash) {
        if(err) {
            res.json({msg:"something went wrong , Plz try again later"})
        } 
        const user = UserModel ({
            email,
            password:hash
        })
        console.log(user)
        try {
            
            await user.save()
            res.json({msg:"Signup Successfull"})
        }
        catch(err) {
            console.log(err)
            res.json({msg:"something went wrong"})
        } 
    });
})

userController.post("/login", validatorLogin,async(req,res) => {
    const {email,password} = req.body
    const user = await UserModel.findOne({email})
    const hash = user.password

    bcrypt.compare(password, hash, function(err, result) {
        if(err) {
            res.json({msg:"something went wrong , Plz try again later"})
        }
        if(result) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            res.json({msg:"Login Successfull" , token})
        } 
        else {
            res.json({msg:"Invalid Credentials"})
        }
    });
}) 
module.exports ={
    userController
}