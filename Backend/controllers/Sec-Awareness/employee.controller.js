const config = require("../../config/auth.config");
const Employee = require("../../models/Sec-Awareness/employee.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

//Signup (Employee)
exports.signup = (req, res) => {
  const user = new Employee({
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

    res.send({ message: "Employee was registered successfully!" });

  });
};
//Signin (Employee)
exports.signin = (req, res) => {
  Employee.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(200).send({ message: "Employee Not found." });
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
//delete Employee (Manager)
exports.deleteEmployee = (req, res) => {
  Employee.deleteOne({
    email: req.body.email
  }).exec((err) => {
    if (err) {
      res.status(400).send("error");
    }
    res.status(200).send("Employee deleted");
  }

  );
}
//Update profile (Employee)
exports.updateEmployee = (req, res) => {
  Employee.findOne({
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