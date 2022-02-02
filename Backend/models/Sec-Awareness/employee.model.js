const extendSchema = require('mongoose-extend-schema');
const { UserSchema } = require('../user.model');
const mongoose = require("mongoose");


const EmployeeSchema = extendSchema(UserSchema, {
    //University:String,
    //phone: {type: String, required: true}
    tSessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TrainingSession"
      }
    ],
  });

const Employee = mongoose.model('Employees', EmployeeSchema);
module.exports = Employee;