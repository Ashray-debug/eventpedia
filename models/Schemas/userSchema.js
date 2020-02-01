var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")
var userSchema = mongoose.Schema({
    username : String,
    password : String,
    email : String,
    mobile : Number,
    joinedOn : Date,
    hecks : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Heck"
        } 
    ],
    photo : String,
    numberOfHecks : Number,
    numberOfStarredHecks : Number,
    starredHecks : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Heck"
        }
    ],
    userType : String,
    collegeName : String,
    registeredHecks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Heck"
    }],
    numberOfRegisteredHecks : Number
})

userSchema.plugin(passportLocalMongoose)
module.exports = userSchema