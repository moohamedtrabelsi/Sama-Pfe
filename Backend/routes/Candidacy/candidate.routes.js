const controller = require("../../controllers/Candidacy/candidate.controller");
const { checkDuplicateEmailCand } = require("../../middlewares/verifySignup");

module.exports = function( app ){

    app.post("/candidate/auth/signup",checkDuplicateEmailCand, controller.signup);
    app.post("/candidate/auth/signin", controller.signin);
    app.post("/candidate/delete", controller.deleteCandidate);
    app.post("/candidate/update", controller.updateCandidate);

}