const mongoose = require("mongoose")
var heckSchema = require("../Schemas/heckSchema")
const Heck = mongoose.model("Heck",heckSchema)
showAll = (req,res)=>{
    Heck.find({},(err,all)=>{
        if(err){
            console.log(err)
            req.flash("error","Some Error Occured!! Try Again Later")
            res.redirect("/")
        }else{
            res.render("allHecksPage",{ title : "All Events", hecks : all })
        }
    })
}
module.exports = showAll