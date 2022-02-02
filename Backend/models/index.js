const req = require('express/lib/request');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

//db.user = require("./user.model");
db.manager = require("./manager.model");
//Qiuz Models
db.category = require("./Quiz/category.model");
db.question = require("./Quiz/question.model");
//db.answer = require("./Quiz/answer.model");
db.quiz = require("./Quiz/quiz.model");


//Candidacy Models
db.candidate = require("./Candidacy/candidate.model")
db.offer = require("./Candidacy/offer.model");
db.Test = require("./Candidacy/test.model");

// Sec Awareness Models
db.employee = require("./Sec-Awareness/employee.model")
db.Lesson = require("./Sec-Awareness/lesson.model");
db.trainingSession = require("./Sec-Awareness/training-Session.model");

module.exports = db;