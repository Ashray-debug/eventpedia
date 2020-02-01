const mongoose = require("mongoose")
var categorySchema = require("../Schemas/categorySchema")
const Category = mongoose.model("Category",categorySchema)

showOther = (req,res)=>{
    Category.find({}).populate("otherEvents").exec((err,data)=>{
        if(err){
            console.log(err)
            res.flash("error","Some Error Occured!! Try Again Later")
            res.redirect("/")
        }else{
            res.render("allHecksPage",{ title : "Other Events", hecks : data[0].otherEvents })
        }
    })
}
module.exports = showOther