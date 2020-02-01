var mongoose = require("mongoose")
var categorySchema = require("../Schemas/categorySchema")
var heckSchema = require("../Schemas/heckSchema")
var Heck = mongoose.model("Heck",heckSchema)
var Category = mongoose.model("Category",categorySchema)
var userSchema = require("../Schemas/userSchema")
var User = mongoose.model("User",userSchema)

home = (req,res)=>{
    User.find({ userType : "society" },(err,societyData)=>{
        if(err){
            res.send(err)
        }else{
            Heck.find({},(err,allHecks)=>{
                if(err){
                    res.send(err)
                }else{       
                    Category.find({},(err,found)=>{
            if(err){
                console.log(err)
            }else{
                if(found == undefined || found.length == 0){
                    Category.create({
                        culturalNumber : 0, techanicalNumber : 0, sportsNumber : 0, openMicNumber : 0, otherCategories : 0,
                        techanicalEvents : [], culturalEvents : [], sportsEvents : [], openMicEvents : [], otherEvents : []
                            },(err,created)=>{
                                if(err){
                                    res.send(err)
                                }else{
                                    res.render("home",{ allHecks : allHecks, category : created,showMessage : false,showError : false,user : undefined,societyData : societyData })
                                }
                            })
                        }else{
                            res.render("home",{ allHecks : allHecks, category : found[0],showMessage : false,showError : false,user : undefined,societyData : societyData })
                        }
                        }
                    }) 
                }
            })
        }
    })
}
module.exports = home