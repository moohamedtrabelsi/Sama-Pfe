const mongoose = require("mongoose");

const trainingSession = mongoose.model(
  "TrainingSession",
  new mongoose.Schema({
    
    name:String,
    expireDate:Date,
    participants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ],

      lessons: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lesson"
        }
      ],

  },
  { timestamps: true }
  )
);

module.exports = trainingSession;