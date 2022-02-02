const controller = require("../../controllers/Sec-Awareness/employee.controller");
const { checkDuplicateEmailEmp } = require("../../middlewares/verifySignup");

module.exports = function( app ){

    app.post("/employee/auth/signup",checkDuplicateEmailEmp, controller.signup);
    app.post("/employee/auth/signin", controller.signin);
    app.post("/employee/delete", controller.deleteEmployee);
    app.post("/employee/update", controller.updateEmployee);



}