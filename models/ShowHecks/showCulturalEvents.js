const mongoose = require("mongoose")
var categorySchema = require("../Schemas/categorySchema")
const Category = mongoose.model("Category",categorySchema)

showIOT = (req,res)=>{
    Category.find({}).populate("culturalEvents").exec((err,data)=>{
        if(err){
            console.log(err)
            res.flash("error","Some Error Occured!! Try Again Later")
            res.redirect("/")
        }else{
            res.render("allHecksPage",{ title : "Cultural Events", hecks : data[0].culturalEvents })
        }
    })
}
module.exports = showIOT