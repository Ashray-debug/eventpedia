  
const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://admin-ashray:test123@ashray-8z4xs.mongodb.net/test?retryWrites=true',{useUnifiedTopology: true,useNewUrlParser:true});

module.exports = {mongoose}