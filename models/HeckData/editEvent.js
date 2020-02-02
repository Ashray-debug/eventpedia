var mongoose = require("mongoose")
var heckSchema = require("../Schemas/heckSchema")
var Heck = mongoose.model("Heck",heckSchema)

editEvent = (req,res)=>{
    Heck.findById(req.params.heckId,(err,heckData)=>{
        if(err){
            console.log(err)
            req.flash("error","Some Problem Occured!!!")
            res.redirect("/loggedIn")
        }else{
            heckData.eventName = req.body.heckName,
            heckData.place = req.body.place,
            heckData.onDate = req.body.date,
            heckData.startingTime = req.body.startingTime,
            heckData.phone = req.body.areaCode + " " + req.body.phone, 
            heckData.cashPrize = req.body.cashPrize,
            heckData.entryFees = req.body.entryFees, 
            heckData.save((err,savedUser)=>{
                if(err){
                    console.log(err)
                    req.flash("error","Some Problem Occured!!! Please Try Again Later")
                    res.redirect("/loggedIn")
                }else{
                    req.flash("success","Event Successfully Edited")
                    res.redirect("/loggedIn")
                }
            })
            }
        })
}
module.exports = editEvent