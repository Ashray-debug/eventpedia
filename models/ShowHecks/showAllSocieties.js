const mongoose = require("mongoose")
var userSchema = require("../Schemas/userSchema")
const User = mongoose.model("User",userSchema)
showAll = (req,res)=>{
    User.find({userType : "society"},(err,all)=>{
        if(err){
            console.log(err)
            res.flash("error","Some Error Occured!! Try Again Later")
            res.redirect("/")
        }else{
            res.render("allSocieties",{ title : "All Societies", Users : all })
        }
    })
}
module.exports = showAll