const mongoose = require("mongoose")
const userSchema = require('../Schemas/userSchema')
var heckSchema = require("../Schemas/heckSchema")
const Heck = mongoose.model("Heck",heckSchema)
const User = mongoose.model("User",userSchema)
unstarHeck = (req,res)=>{
    var index = 0; var count = 0;
    if(req.params.userId != req.user.id){
        res.redirect("loggedIn")
    }else{
        Heck.findById(req.params.heckId,(err,foundHeck)=>{
            if(err){
                console.log(err)
                req.flash("error","Some Error Occurred")
                res.redirect("loggedIn")
            }else{
                User.findById(req.params.userId,(err,foundUser)=>{
                    if(err){
                        console.log(err)
                        req.flash("error","Some Error Occurred")
                        res.redirect("loggedIn")
                    }else{
                        foundUser.starredHecks.forEach(function(h){
                            if(h == req.params.heckId){
                                index = count
                            }else{
                            }
                            count += 1
                        })
                        delete foundUser.starredHecks[index]
                        foundHeck.starredBy -= 1
                        foundUser.numberOfStarredHecks -= 1
                        foundUser.save(function(err,savedUser){
                            if(err){
                                console.log(err)
                                req.flash("error","Some Error Occurred")
                                res.redirect("loggedIn")
                            }else{
                                User.findByIdAndUpdate(req.params.userId,savedUser,function(err,updated){
                                    if(err){
                                        console.log(err)
                                        req.flash("error","Some Error Occurred")
                                    }else{
                                        req.flash("success","Heckothan Unstarred Successfully")
                                    }
                                    res.redirect("/")
                                })
                            }
                        })
                    }
                })
            }
        })
       
    }
}
module.exports = unstarHeck