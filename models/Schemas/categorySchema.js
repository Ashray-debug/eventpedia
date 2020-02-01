const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    techanicalNumber : Number,
    culturalNumber : Number,
    sportsNumber : Number,
    openMicNumber : Number,
    otherCategories : Number,
    techanicalEvents : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Heck"
        } 
    ],
    culturalEvents : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Heck"
        } 
    ],
    sportsEvents : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Heck"
        } 
    ],
    openMicEvents : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Heck"
        } 
    ],
    otherEvents : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Heck"
        } 
    ],
})

module.exports = categorySchema