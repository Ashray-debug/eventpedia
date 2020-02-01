const mongoose = require("mongoose")
const userSchema = require('../Schemas/userSchema')
const User = mongoose.model("User",userSchema)

editUserData = (req,res)=>{
    User.findById(req.params.id,(err,foundUser)=>{
        if(err){
            console.log(err)
            res.redirect("/loggedIn")
        }else{
            foundUser.username = req.body.username
            foundUser.mobile = req.body.mobile
            foundUser.save((err,savedUser)=>{
                if(err){
                    console.log(err)
                    res.redirect("/loggedIn")
                }else{
                    req.flash("error","Signin To Continue")
                    res.redirect("/")
                }
            })
        }
    })
}
module.exports = editUserData