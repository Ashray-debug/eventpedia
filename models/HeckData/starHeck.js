const mongoose = require("mongoose")
const userSchema = require('../Schemas/userSchema')

var heckSchema = require("../Schemas/heckSchema")
const Heck = mongoose.model("Heck",heckSchema)
const User = mongoose.model("User",userSchema)
starHeck = (req,res)=>{
    if(req.params.userId != req.user.id){
        res.redirect("loggedIn")
    }else{
        Heck.findById(req.params.heckId,(err,foundHeck)=>{
            if(err){
                req.flash("error","Some Error Occured!!!")
                res.redirect("loggedIn")
            }else{
                User.findById(req.params.userId,(err,foundUser)=>{
                    if(err){
                        req.flash("error","Some Error Occured!!!")
                        res.redirect("loggedIn")
                    }else{
                        if(foundUser.starredHecks.includes(foundHeck.id)){
                            req.flash("error","This Heckothan Is Already Starred")
                            res.redirect("/loggedIn")
                        }else{
                            foundHeck.starredBy += 1
                            foundUser.starredHecks.push(foundHeck)
                            foundUser.numberOfStarredHecks += 1
                            foundUser.save((err,savedUser)=>{
                                if(err){
                                    req.flash("error","Some Error Occured!!!")
                                    res.redirect("/")
                                }else{
                                    foundHeck.save((err,savedHeck)=>{
                                        if(err){
                                          req.flash("error","Some Error Occured!!!")
                                          res.redirect("/")  
                                        }else{
                                            req.flash("success","Heckothan Starred Successfully,Signin To Continue")
                                            res.redirect("/loggedIn")
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    }
}
module.exports = starHeck