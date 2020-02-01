const mongoose = require("mongoose")
const userSchema = require('../Schemas/userSchema')
const User = mongoose.model("User",userSchema)
const passport = require("passport")

signup = (req,res)=>{
    if(req.body.password !== req.body.confirmPassword){
        req.flash("error","Passwords don't match")
        res.redirect("/")
    }else{
        User.findOne({ email : req.body.email },(err,foundUser)=>{
            if(err){
                console.log(err)
                req.flash("error","Some Error Occured!!! Please Try Again Later")
                res.redirect("/")
            }else{
                if(foundUser != null){
                    req.flash("error","Email already taken")
                    res.redirect("/")
                }else{
                    User.findOne({ mobile : req.body.mobile },(err,foundUser)=>{
                        if(err){
                            console.log(err)
                            req.flash("error","Some Error Occured!!! Please Try Again Later")
                            res.redirect("/")
                        }else{
                            if(foundUser != null){
                                req.flash("error","Mobile Already Taken")
                                res.redirect("/")
                            }else{
                                User.register(new User({ email : req.body.email,mobile : req.body.mobile,joinedOn : Date.now(),username : req.body.username,
                                    numberOfStarredHecks : 0,numberOfHecks : 0, userType : req.body.userType,collegeName : req.body.collegeName,numberOfRegisteredHecks : 0 }),req.body.password,(err,user)=>{
                                    if(err){
                                        console.log(err)
                                        req.flash("error","Some Error Occured!!! Please Try Again Later")
                                        res.redirect("/")
                                    }else{
                                        passport.authenticate("local")
                                        req.flash("error","Please Sigin To Continue!!!")
                                        res.redirect("/")
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })    
    }
}
module.exports = signup