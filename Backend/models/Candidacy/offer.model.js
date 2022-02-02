const mongoose = require("mongoose");

const Offer = mongoose.model(
  "Offer",
  new mongoose.Schema({
    name: String,
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "candidates"
      }
    ],

  },
    { timestamps: true }

  )
);

module.exports = Offer;
