var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    
  },
  subject: {
    type: String,
  },
  phone: {
    type: Number,
  },
  message: {
    type: String
  }
});
module.exports = contactSchema;
