const mongoose = require("mongoose")
var categorySchema = require("../Schemas/categorySchema")
const Category = mongoose.model("Category",categorySchema)

showArduino = (req,res)=>{
    Category.find({}).populate("openMicEvents").exec((err,data)=>{
        if(err){
            console.log(err)
            res.flash("error","Some Error Occured!! Try Again Later")
            res.redirect("/")
        }else{
            res.render("allHecksPage",{ title : "Open Mic Events", hecks : data[0].openMicEvents })
        }
    })
}
module.exports = showArduino