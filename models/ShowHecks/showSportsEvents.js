const mongoose = require("mongoose")
var categorySchema = require("../Schemas/categorySchema")
const Category = mongoose.model("Category",categorySchema)

showML = (req,res)=>{
    Category.find({}).populate("sportsEvents").exec((err,data)=>{
        if(err){
            console.log(err)
            res.flash("error","Some Error Occured!! Try Again Later")
            res.redirect("/")
        }else{
            res.render("allHecksPage",{ title : "Sports Events", hecks : data[0].sportsEvents })
        }
    })
}
module.exports = showML