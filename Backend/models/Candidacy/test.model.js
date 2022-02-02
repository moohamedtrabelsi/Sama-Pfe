const mongoose = require("mongoose");

const Test = mongoose.model(
  "Test",
  new mongoose.Schema({
    description: String,
 
  })
);

module.exports = Test;