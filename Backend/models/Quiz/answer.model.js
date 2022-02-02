const mongoose = require("mongoose");

const Answer = mongoose.model(
  "Answer",
  new mongoose.Schema({
    txt: String,
    status:Boolean,

  }

  )
);

module.exports = Answer;