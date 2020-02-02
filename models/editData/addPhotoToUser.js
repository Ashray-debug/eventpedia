const mongoose = require("mongoose")
const userSchema = require('../Schemas/userSchema')
const User = mongoose.model("User",userSchema)
const multer = require('multer')
const path = require('path')
storage = multer.diskStorage({
    destination : "./public/uploads",
    filename : function(req,file,cb){
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})


const upload = multer({
    storage : storage,
    limits : {filesSize : 1 },
}).single('photo');

addPhoto = (req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.send(err)
        }else{
            User.findById(req.params.id,(err,foundUser)=>{
                if(err){
                    res.send(err)
                }else{
                    foundUser.photo = req.file.path
                    foundUser.save((err,savedUser)=>{
                        if(err){
                            res.send(err)
                        }else{
                            req.flash("success","Photo Successfully Added")
                            res.redirect("/loggedIn")
                        }
                    })
                }
            })
        }
    })
}
module.exports = addPhoto
