const controller = require("../../controllers/Sec-Awareness/Training_Session.controller");

module.exports = function( app ){

    app.post("/ts/create", controller.createTrainingSession);
    app.post("/ts/update", controller.updateSession);
    app.post("/ts/delete", controller.removeTrainingSession);
    app.post("/ts/participate", controller.participateTs);
    app.post("/ts/remparticipate", controller.removeEmpTs);
    app.get("/ts/myts", controller.getMyTrainingSessions);
    app.get("/ts/allts", controller.getAllTrainingSession);



    



}