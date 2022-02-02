const config = require("../../config/auth.config");
const Candidate = require("../../models/Candidacy/candidate.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

//Signup (Candidate)
exports.signup = (req, res) => {
  const user = new Candidate({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Candidate was registered successfully!" });

  });
};
//Signin (Candidate)
exports.signin = (req, res) => {
  Candidate.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(200).send({ message: "Candidate Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(200).send({ message: "invalid password." });

      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({

        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        token: token

        // user: user ,

      });
    });
};

//Delete Candidate (Candidate,Manager)
exports.deleteCandidate = (req, res) => {
  Candidate.deleteOne({
    email: req.body.email
  }).exec((err) => {
    if (err) {
      res.status(400).send("error");
    }
    res.status(200).send("candidate deleted");
  }

  );
};

//Update Profile (Candidate)
exports.updateCandidate = (req, res) => {
  Candidate.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: "error" });
        return;
      }
      user.email = req.body.email,
        user.firstname = req.body.firstname,
        user.lastname = req.body.lastname,
        user.password = bcrypt.hashSync(req.body.password, 8)
      user.save(err => {
        if (err) {
          res.status(500).send({ message: "error" });
          return;
        }

        res.status(200).send({


          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,

        });
      });

    });

};


