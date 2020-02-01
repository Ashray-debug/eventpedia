const mongoose = require("mongoose")
var userSchema = require("../Schemas/userSchema")
const User = mongoose.model("User",userSchema)
var heckSchema = require("../Schemas/heckSchema")
const Heck = mongoose.model("Heck",heckSchema)

showStarredEvents = (req,res) => {
    if(req.params.userId == req.user.id){
        User.findById(req.params.userId).populate("starredHecks").exec((err,data)=>{
            if(err){
                req.flash("error","Some Problem Occured!!! Please Try Again")
                res.redirect("/")
            }else{
                res.render("allHecksPage",{ title : "Starred Events", hecks : data.starredHecks })
            }
        })
    }else{
        res.redirect("/")
    }
}
module.exports = showStarredEvents