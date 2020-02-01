const mongoose = require("mongoose")
var categorySchema = require("../Schemas/categorySchema")
const Category = mongoose.model("Category",categorySchema)

showWeb = (req,res)=>{
    Category.find({}).populate("techanicalEvents").exec((err,data)=>{
        if(err){
            console.log(err)
            res.flash("error","Some Error Occured!! Try Again Later")
            res.redirect("/")
        }else{
            res.render("allHecksPage",{ title : "Techanical Events", hecks : data[0].techanicalEvents })
        }
    })
}
module.exports = showWeb