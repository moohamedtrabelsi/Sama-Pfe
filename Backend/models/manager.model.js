const extendSchema = require('mongoose-extend-schema');
const { UserSchema } = require('./user.model');
const mongoose = require("mongoose");


const ManagerSchema = extendSchema(UserSchema, {
   // University:String,
    //phone: {type: String, required: true}
  });

const Manager = mongoose.model('managers', ManagerSchema);
module.exports = Manager;