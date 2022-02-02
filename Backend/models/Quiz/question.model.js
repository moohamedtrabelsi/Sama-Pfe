const mongoose = require("mongoose");

const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    txt: String,

    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer"
      }
    ],
  }

  )
);

module.exports = Question;