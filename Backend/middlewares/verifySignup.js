const Candidate = require("../models/Candidacy/candidate.model");
const Employee = require("../models/Sec-Awareness/employee.model");


//check duplicated Email while Signup (Employee)
checkDuplicateEmailEmp = (req, res, next) => {

    // Email
    Employee.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });

};

//check duplicated Email while Signup (Candidate)
checkDuplicateEmailCand = (req, res, next) => {

    // Email
    Candidate.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });

};

const verifySignUp = {
    checkDuplicateEmailCand,
     checkDuplicateEmailEmp
  };
  
  module.exports = verifySignUp;