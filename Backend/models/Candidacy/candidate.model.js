const extendSchema = require('mongoose-extend-schema');
const { UserSchema } = require('../user.model');
const mongoose = require("mongoose");


const CandidateSchema = extendSchema(UserSchema, {
    offers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer"
      }
    ],
    //phone: {type: String, required: true}
  });

const Candidate = mongoose.model('candidates', CandidateSchema);
module.exports = Candidate;