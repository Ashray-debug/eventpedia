var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")
var heckSchema = mongoose.Schema({
    eventName : String,
    place : String,
    onDate : Date,
    createdOn : Date,
    startingTime : String,
    categories : [],
    phone : String,
    username : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    cashPrize : String,
    entryFees : String,
    heckPoster : String,
    ownerName : String,
    starredBy : Number,
    currentRegistered : Number,
    participants : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ]
})

heckSchema.plugin(passportLocalMongoose)
module.exports = heckSchema