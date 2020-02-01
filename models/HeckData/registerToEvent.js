var mongoose = require("mongoose")
var heckSchema = require("../Schemas/heckSchema")
var Heck = mongoose.model("Heck",heckSchema)
var userSchema = require("../Schemas/userSchema")
var User = mongoose.model("User",userSchema)
register = (req,res) => {
    if(req.params.userId == req.user.id){   
        User.findById(req.params.userId,(err,userData)=>{
            if(err){
                req.flash("error","Some Problem Occured!!! Please Try Again Later")
                res.redirect("/loggedIn")
            }else{
                Heck.findById(req.params.eventId,(err,eventData)=>{
                    if(err){
                        req.flash("error","Some Problem Occured!!! Please Try Again Later")
                        res.redirect("/loggedIn") 
                    }else{
                        if(eventData.participants.includes(userData.id)){
                            req.flash("error","You Have Already Registered For " + eventData.eventName )
                            res.redirect("/loggedIn")
                        }else{
                            userData.registeredHecks.push(eventData)
                            eventData.participants.push(userData)
                            eventData.currentRegistered += 1
                            userData.numberOfRegisteredHecks += 1
                            userData.save((err,savedData)=>{
                                if(err){
                                    req.flash("error","Some Problem Occured!!! Please Try Again Later")
                                    res.redirect("/loggedIn")
                                }else{
                                    eventData.save((err,savedEvent)=>{
                                        if(err){
                                            req.flash("error","Some Problem Occured!!! Please Try Again Later")
                                            res.redirect("/loggedIn")
                                        }else{
                                            req.flash("success","Registered In " + eventData.eventName + " Successfully!!!" )
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
    }else{
        req.flash("error","Some Problem OCcured")
        res.redirect("/")
    }
}
module.exports = register