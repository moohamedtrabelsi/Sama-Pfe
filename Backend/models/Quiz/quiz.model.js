const mongoose = require("mongoose");

const Quiz = mongoose.model(
  "Quiz",
  new mongoose.Schema({
    txt: String,

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
      }
    ],
    category: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category"
        }
      ,
  }

  )
);

module.exports = Quiz;