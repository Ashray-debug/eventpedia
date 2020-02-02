var mongoose = require("mongoose")
var heckSchema = require("../Schemas/heckSchema")
var Heck = mongoose.model("Heck",heckSchema)
const userSchema = require('../Schemas/userSchema')
var User = mongoose.model("User",userSchema)
var categorySchema = require("../Schemas/categorySchema")
var Category = mongoose.model("Category",categorySchema)


var sports = false, cultural = false, openMic = false, arduino = false,other = false , techanical = false
createEvent = (req,res)=>{
    Category.find({},(err,found)=>{
        if(err){
            console.log(err)
            req.flash("error","Some Problem Occured!!! Please Try Again Later")
            res.redirect("/")
        }else{
            var newHeck = {
                username : req.user,
                eventName : req.body.heckName,
                place : req.body.place,
                onDate : req.body.date,
                createdOn : Date.now(),
                startingTime : req.body.startingTime,
                phone : req.body.areaCode + " " + req.body.phone, 
                categories : [],
                cashPrize : req.body.cashPrize,
                entryFees : req.body.entryFees,
                ownerName : req.user.username,
                starredBy : 0,
                currentRegistered : 0,
                participants : []
            }
            if(req.body.techanical != undefined){
                newHeck.categories.push("Techanical")
                found[0].techanicalNumber += 1
                techanical = true
            }if(req.body.cultural != undefined){
                newHeck.categories.push("Cultural")
                found[0].culturalNumber += 1
                cultural = true
            }if(req.body.sports != undefined){
                newHeck.categories.push("Sports")
                found[0].sportsNumber += 1
                sports = true
            }if(req.body.openMic != undefined){
                newHeck.categories.push("Open Mic")
                found[0].openMicNumber += 1
                openMic = true
            }if(req.body.other != undefined){
                newHeck.categories.push(req.body.other)
                found[0].otherCategories += 1
                other = true
            }
            Heck.create(newHeck,(err,createdHeck)=>{
                if(err){
                    console.log(err)
                    res.redirect('loggedIn')
                }else{
                    User.findById(req.user.id,(err,foundUser)=>{
                        if(err){
                            console.log(err)
                            req.flash("error","Some Problem Occured!!! Please Try Again Later")
                            res.redirect("/")
                        }else{
                            foundUser.hecks.push(createdHeck)
                            foundUser.numberOfHecks += 1
                            if(sports){
                                found[0].sportsEvents.push(createdHeck)
                            }
                            if(cultural){
                                found[0].culturalEvents.push(createdHeck)
                            }
                            if(openMic){
                                found[0].openMicEvents.push(createdHeck)
                            }
                            if(techanical){
                                found[0].techanicalEvents.push(createdHeck)
                            }
                            if(other){
                                found[0].otherEvents.push(createdHeck)
                            }
                            foundUser.save((err,savedUser)=>{
                                if(err){
                                    console.log(err)
                                    req.flash("error","Some Problem Occured!!! Please Try Again Later")
                                    res.redirect("/")
                                }else{
                                    found[0].save((err,savedC)=>{
                                        if(err){
                                            console.log(err)
                                            req.flash("error","Some Problem Occured!!! Please Try Again Later")
                                            res.redirect("/")
                                        }else{
                                            req.flash("success","Event Created Successfully")
                                            res.redirect("loggedIn")
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
    
}
module.exports = createEvent