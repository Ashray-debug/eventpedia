const mongoose = require("mongoose")
var userSchema = require("../Schemas/userSchema")
const User = mongoose.model("User",userSchema)
var heckSchema = require("../Schemas/heckSchema")
const Heck = mongoose.model("Heck",heckSchema)

showRegisteredEvents = (req,res) => {
    if(req.params.userId == req.user.id){
        User.findById(req.params.userId).populate("hecks").exec((err,data)=>{
            if(err){
                req.flash("error","Some Problem Occured!!! Please Try Again")
                res.redirect("/")
            }else{
                res.render("allHecksPage",{ title : "Posted Events", hecks : data.hecks })
            }
        })
    }else{
        res.redirect("/")
    }
}
module.exports = showRegisteredEvents