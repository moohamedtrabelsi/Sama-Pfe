const mongoose = require("mongoose");

const Lesson = mongoose.model(
  "Lesson",
  new mongoose.Schema({
    
    Title:String,
    filename:String,

  }
  )
);

module.exports = Lesson;