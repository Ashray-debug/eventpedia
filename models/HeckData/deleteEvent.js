var mongoose = require("mongoose")
var heckSchema = require("../Schemas/heckSchema")
var Heck = mongoose.model("Heck",heckSchema)

deleteEvent = (req,res)=>{
    User.findById(req.user.id,(err,foundUser)=>{
        if(err){
            res.send(err)
        }else{
            foundUser.numberOfHecks -= 1
            foundUser.save((err,savedUser)=>{
                if(err){
                    res.send(err)
                }else{
                    Heck.findByIdAndRemove(req.params.heckId,(err,foundHeck)=>{
                    if(err){
                        res.send(err)
                    }{
                        req.flash("success","Event Deleted Successfully")
                        res.redirect("/loggedIn")
                    }
                })
                }
            })
        }
    })
}
module.exports = deleteEvent