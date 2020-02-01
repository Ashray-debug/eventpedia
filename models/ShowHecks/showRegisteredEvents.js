const mongoose = require("mongoose")
var userSchema = require("../Schemas/userSchema")
const User = mongoose.model("User",userSchema)
var heckSchema = require("../Schemas/heckSchema")
const Heck = mongoose.model("Heck",heckSchema)

showRegisteredEvents = (req,res) => {
    if(req.params.userId == req.user.id){
        User.findById(req.params.userId).populate("registeredHecks").exec((err,data)=>{
            if(err){
                req.flash("error","Some Problem Occured!!! Please Try Again")
                res.redirect("/")
            }else{
                res.render("allHecksPage",{ title : "Registered Events", hecks : data.registeredHecks })
                // res.redirect("/allHecks")
            }
        })
    }else{
        res.redirect("/")
    }
}
module.exports = showRegisteredEvents